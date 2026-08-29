const SOUNDS = [
  { id: "rain", label: "Rain", file: "rain.mp3", emoji: "🌧️" },
  { id: "thunder", label: "Thunder", file: "thunder.mp3", emoji: "⛈️" },
  { id: "waves", label: "Waves", file: "waves.mp3", emoji: "🌊" },
  { id: "wind", label: "Wind", file: "wind.mp3", emoji: "💨" },
  { id: "birds", label: "Birds", file: "birds.mp3", emoji: "🐦" },
  { id: "white-noise", label: "White Noise", file: "white-noise.mp3", emoji: "📺" },
  { id: "ocean", label: "Ocean", file: "ocean.mp3", emoji: "⚓" },
  { id: "umbrella", label: "Umbrella", file: "umbrella.mp3", emoji: "☂️" },
  { id: "owl", label: "Owl", file: "owl.mp3", emoji: "🦉" },
  { id: "campfire", label: "Campfire", file: "campfire.mp3", emoji: "🔥" },
  { id: "cavern", label: "Cavern", file: "cavern.mp3", emoji: "🦇" },
  { id: "forest", label: "Forest", file: "forest.mp3", emoji: "🌲" },
  { id: "river", label: "River", file: "river.mp3", emoji: "🏞️" },
];

const RANDOMIZE_VOLUME = 20;
const STORAGE_KEY = "chicken-noise-volumes";
const THEME_KEY = "chicken-noise-theme";

const grid = document.getElementById("sound-grid");
const players = {};

function loadVolumes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveVolumes(volumes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(volumes));
  } catch {
    /* ignore storage errors (private mode, quota, etc.) */
  }
}

const savedVolumes = loadVolumes();

SOUNDS.forEach((sound) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = sound.id;

  const iconWrap = document.createElement("div");
  iconWrap.className = "card-icon emoji";
  iconWrap.textContent = sound.emoji;

  const percent = document.createElement("div");
  percent.className = "card-percent";

  const header = document.createElement("div");
  header.className = "card-header";
  header.append(iconWrap, percent);

  const label = document.createElement("div");
  label.className = "card-label";
  label.textContent = sound.label;

  const top = document.createElement("div");
  top.className = "card-top";
  top.append(header, label);

  const slider = document.createElement("input");
  slider.type = "range";
  slider.className = "slider";
  slider.min = "0";
  slider.max = "100";
  const initialVolume = savedVolumes[sound.id] ?? 0;
  slider.value = String(initialVolume);
  slider.style.setProperty("--fill", `${initialVolume}%`);

  card.append(top, slider);
  grid.appendChild(card);

  const audio = new Audio(`audio/${sound.file}`);
  audio.loop = true;
  audio.volume = initialVolume / 100;
  audio.addEventListener("error", () => {
    console.warn(`Missing audio file: audio/${sound.file}. Add your mp3 to the audio/ folder.`);
  });

  if (initialVolume > 0) {
    card.classList.add("active");
    percent.textContent = `${initialVolume}%`;
  }

  const applyVolume = (value) => {
    const volume = Number(value);
    slider.value = String(volume);
    slider.style.setProperty("--fill", `${volume}%`);
    audio.volume = volume / 100;

    if (volume > 0) {
      card.classList.add("active");
      percent.textContent = `${volume}%`;
      audio.play().catch(() => {});
    } else {
      card.classList.remove("active");
      percent.textContent = "";
      audio.pause();
    }

    const volumes = loadVolumes();
    volumes[sound.id] = volume;
    saveVolumes(volumes);
  };

  players[sound.id] = { applyVolume };

  slider.addEventListener("input", (e) => applyVolume(e.target.value));

  card.addEventListener("click", (e) => {
    if (e.target === slider) return;
    const isActive = Number(slider.value) > 0;
    applyVolume(isActive ? 0 : RANDOMIZE_VOLUME);
  });
});

const randomizeBtn = document.getElementById("randomize-btn");

randomizeBtn.addEventListener("click", () => {
  const picks = SOUNDS.map(() => Math.random() < 0.5);
  if (!picks.some(Boolean)) {
    picks[Math.floor(Math.random() * picks.length)] = true;
  }

  SOUNDS.forEach((sound, i) => {
    players[sound.id].applyVolume(picks[i] ? RANDOMIZE_VOLUME : 0);
  });
});

const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

function initTheme() {
  let theme;
  try {
    theme = localStorage.getItem(THEME_KEY);
  } catch {
    theme = null;
  }
  if (!theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  applyTheme(theme);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

initTheme();
