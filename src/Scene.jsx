import { useMemo } from "react";

const RAINDROP_COUNT = 36;

/**
 * Static composition image, with a lightweight animated rain overlay
 * when the rain sound is on. See git history for the previous fully
 * layered/reactive version (tree/cloud repeats, thunder, campfire,
 * owl eyes, etc.) to restore more of that later.
 */
export default function Scene({ sceneLabel, chips, timerNote, showOverlays, rain = 0 }) {
  const raindrops = useMemo(
    () =>
      Array.from({ length: RAINDROP_COUNT }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.4,
        duration: 0.55 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className="scene">
      <img className="scene-static-img" src="/scene/composition.png" alt="" aria-hidden="true" />

      {rain > 0 && (
        <div className="scene-rain" style={{ opacity: 0.35 + rain * 0.65 }} aria-hidden="true">
          {raindrops.map((d, i) => (
            <span
              key={i}
              className="raindrop"
              style={{
                left: `${d.left}%`,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      <span className="scene-label">{sceneLabel}</span>

      {showOverlays && chips.length > 0 && (
        <div className="scene-chips">
          {chips.map((c) => (
            <span key={c.name} className="scene-chip">
              {c.name} · {c.pct}%
            </span>
          ))}
        </div>
      )}

      {showOverlays && <span className="scene-timer-note">{timerNote}</span>}
    </div>
  );
}
