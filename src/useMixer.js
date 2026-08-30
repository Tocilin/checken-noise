import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SOUNDS, PRESETS, TIMERS } from "./data.js";

const RELEASE_OFF_THRESHOLD = 0.04;

function blankMix() {
  const m = {};
  SOUNDS.forEach((s) => {
    m[s.key] = { on: false, vol: 0.2 };
  });
  return m;
}

function mixFromSearch() {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("mix");
    if (!raw) return null;
    const m = blankMix();
    raw.split(",").forEach((pair) => {
      const [key, pctStr] = pair.split(":");
      const pct = Number(pctStr);
      if (m[key] && Number.isFinite(pct) && pct > 0) {
        m[key] = { on: true, vol: Math.min(1, Math.max(0, pct / 100)) };
      }
    });
    return m;
  } catch {
    return null;
  }
}

export function useMixer() {
  const [mix, setMix] = useState(() => mixFromSearch() ?? blankMix());
  const [activePreset, setActivePreset] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(null);
  const [timerEndAt, setTimerEndAt] = useState(null);
  const [timerRemaining, setTimerRemaining] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);

  const audioRefs = useRef(new Map());
  const dragRef = useRef(null);

  useEffect(() => {
    SOUNDS.forEach((s) => {
      const audio = new Audio(`/audio/${s.key}.mp3`);
      audio.loop = true;
      audio.volume = mix[s.key]?.vol ?? 0.2;
      audioRefs.current.set(s.key, audio);
    });
    return () => {
      audioRefs.current.forEach((audio) => audio.pause());
      audioRefs.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.entries(mix).forEach(([key, s]) => {
      const audio = audioRefs.current.get(key);
      if (!audio) return;
      audio.volume = s.vol;
      if (s.on && s.vol > 0) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    });
  }, [mix]);

  useEffect(() => {
    if (timerEndAt === null) {
      setTimerRemaining(null);
      return;
    }
    const tick = () => {
      const remaining = Math.max(0, Math.round((timerEndAt - Date.now()) / 1000));
      setTimerRemaining(remaining);
      if (remaining <= 0) {
        setMix(blankMix());
        setActivePreset(null);
        setTimerMinutes(null);
        setTimerEndAt(null);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timerEndAt]);

  const setVolAt = useCallback((key, clientX, rect) => {
    const vol = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setMix((prev) => ({ ...prev, [key]: { on: true, vol } }));
    setActivePreset(null);
  }, []);

  const grab = useCallback(
    (key) => (e) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      dragRef.current = { key, rect };
      setVolAt(key, e.clientX, rect);
    },
    [setVolAt]
  );

  useEffect(() => {
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d) return;
      setVolAt(d.key, e.clientX, d.rect);
    };
    const onUp = () => {
      const d = dragRef.current;
      dragRef.current = null;
      if (!d) return;
      setMix((prev) => {
        const cur = prev[d.key];
        if (cur.vol <= RELEASE_OFF_THRESHOLD) {
          return { ...prev, [d.key]: { on: false, vol: cur.vol } };
        }
        return prev;
      });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setVolAt]);

  const applyPreset = useCallback((preset) => {
    const m = blankMix();
    Object.entries(preset.mix).forEach(([key, vol]) => {
      m[key] = { on: true, vol };
    });
    setMix(m);
    setActivePreset(preset.name);
  }, []);

  const stopAll = useCallback(() => {
    setMix(blankMix());
    setActivePreset(null);
  }, []);

  const toggleTimer = useCallback((minutes) => {
    setTimerMinutes((prevMinutes) => {
      if (prevMinutes === minutes) {
        setTimerEndAt(null);
        return null;
      }
      setTimerEndAt(Date.now() + minutes * 60 * 1000);
      return minutes;
    });
  }, []);

  const shareMix = useCallback(() => {
    const active = SOUNDS.filter((s) => mix[s.key]?.on && mix[s.key].vol > 0);
    const query = active.map((s) => `${s.key}:${Math.round(mix[s.key].vol * 100)}`).join(",");
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set("mix", query);
    } else {
      url.searchParams.delete("mix");
    }
    window.history.replaceState(null, "", url);
    navigator.clipboard?.writeText(url.toString()).catch(() => {});
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 1800);
  }, [mix]);

  const items = useMemo(
    () =>
      SOUNDS.map((s, i) => {
        const m = mix[s.key];
        return {
          key: s.key,
          name: s.name,
          num: String(i + 1).padStart(2, "0"),
          on: m.on,
          pct: m.on ? Math.round(m.vol * 100) : 0,
          grab: grab(s.key),
        };
      }),
    [mix, grab]
  );

  const active = useMemo(() => items.filter((i) => i.on), [items]);

  const layers = useMemo(() => {
    const get = (key) => (mix[key]?.on ? mix[key].vol : 0);
    return {
      dark: Math.min(0.5, get("rain") * 0.22 + get("thunder") * 0.28 + get("cavern") * 0.3 + get("owl") * 0.18),
      tilt: mix.wind?.on ? -(3 + 3 * mix.wind.vol) : 0,
      rain: get("rain"),
      thunder: mix.thunder?.on ? 0.5 + 0.5 * mix.thunder.vol : 0,
      wind: mix.wind?.on ?? false,
      birds: mix.birds?.on ?? false,
      campfire: mix.campfire?.on ?? false,
      owl: mix.owl?.on ?? false,
      umbrella: mix.umbrella?.on ?? false,
      forest: mix.forest?.on ?? false,
      cavern: mix.cavern?.on ?? false,
    };
  }, [mix]);

  const timerNote = timerRemaining === null ? "no sleep timer" : timerRemaining >= 60 ? `sleep in ${Math.ceil(timerRemaining / 60)} min` : `sleep in ${timerRemaining}s`;

  return {
    items,
    activeCount: active.length,
    chips: active.slice(0, 5).map((i) => ({ name: i.name, pct: i.pct })),
    sceneLabel: active.length ? `${active.length} layers` : "silent",
    layers,
    presets: PRESETS.map((p) => ({ ...p, active: activePreset === p.name })),
    applyPreset,
    stopAll,
    timers: TIMERS.map((n) => ({ label: `${n}m`, minutes: n, active: timerMinutes === n })),
    toggleTimer,
    timerNote,
    shareMix,
    shareCopied,
  };
}
