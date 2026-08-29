const ICONS = {
  rain: '<svg viewBox="0 0 24 24"><path d="M17 13a5 5 0 0 0-9.9-1A4.5 4.5 0 0 0 8 21h9a4 4 0 0 0 0-8h-.1"/><path d="M8 19v2"/><path d="M12 19v2"/><path d="M16 19v2"/></svg>',
  thunder: '<svg viewBox="0 0 24 24"><path d="M17 13a5 5 0 0 0-9.9-1A4.5 4.5 0 0 0 8 21h9a4 4 0 0 0 0-8h-.1"/><path d="M13 14l-3 5h3l-2 4"/></svg>',
  waves: '<svg viewBox="0 0 24 24"><path d="M2 8c1.5 1.5 3.5 1.5 5 0s3.5-1.5 5 0 3.5 1.5 5 0 3.5-1.5 5 0"/><path d="M2 14c1.5 1.5 3.5 1.5 5 0s3.5-1.5 5 0 3.5 1.5 5 0 3.5-1.5 5 0"/><path d="M2 20c1.5 1.5 3.5 1.5 5 0s3.5-1.5 5 0 3.5 1.5 5 0 3.5-1.5 5 0"/></svg>',
  wind: '<svg viewBox="0 0 24 24"><path d="M2 9h11a3 3 0 1 0-3-3"/><path d="M2 15h15a3 3 0 1 1-3 3"/><path d="M2 12h7"/></svg>',
  birds: '<svg viewBox="0 0 24 24"><path d="M4 12c1.5-2 3-2 4.5 0M13 12c1.5-2 3-2 4.5 0"/><path d="M18 8a3 3 0 0 1 3 3c0 1.5-1 2.5-2.5 2.8L17 16l-1-2.2c-1 .2-2 .2-3 0"/></svg>',
  whiteNoise: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="11" stroke-dasharray="2 3"/></svg>',
  ocean: '<svg viewBox="0 0 24 24"><path d="M12 2v6"/><path d="M9 5h6"/><circle cx="12" cy="8" r="1.5"/><path d="M12 9.5V19"/><path d="M6 13h12"/><path d="M4 19c1.2 1.3 2.8 1.3 4 0s2.8-1.3 4 0 2.8 1.3 4 0 2.8-1.3 4 0"/></svg>',
  umbrella: '<svg viewBox="0 0 24 24"><path d="M12 12V20a2 2 0 0 1-4 0"/><path d="M2 12a10 10 0 0 1 20 0Z"/></svg>',
  owl: null,
  campfire: '<svg viewBox="0 0 24 24"><path d="M12 22c4-1 6-3.5 6-7 0-2-1-3.5-2-5 .3 2-.7 3-1.5 2.2C15 10.7 14 8 12 6c.5 2.5-.5 3.5-1.5 4.5C9 12 8 13.5 8 15c-3.5 0-4.5-3-4-5C2 12 2 15 2 15c0 4 3.5 7 6 7"/></svg>',
  cavern: '<svg viewBox="0 0 24 24"><path d="M3 20l6-13 4 8 3-6 5 11z"/></svg>',
  forest: '<svg viewBox="0 0 24 24"><path d="M12 2l5 8h-3l4 6h-3l3 6H6l3-6H6l4-6H7z"/><path d="M12 22v-4"/></svg>',
  river: '<svg viewBox="0 0 24 24"><path d="M7 16a4 4 0 0 1 4-4 4 4 0 0 0 4-4 4 4 0 0 1 4-4"/><path d="M12 21c-3 0-5-2-5-5"/></svg>',
};

const SOUNDS = [
  { id: "rain", label: "Rain", file: "rain.mp3", icon: ICONS.rain },
  { id: "thunder", label: "Thunder", file: "thunder.mp3", icon: ICONS.thunder },
  { id: "waves", label: "Waves", file: "waves.mp3", icon: ICONS.waves },
  { id: "wind", label: "Wind", file: "wind.mp3", icon: ICONS.wind },
  { id: "birds", label: "Birds", file: "birds.mp3", icon: ICONS.birds },
  { id: "white-noise", label: "White Noise", file: "white-noise.mp3", icon: ICONS.whiteNoise },
  { id: "ocean", label: "Ocean", file: "ocean.mp3", icon: ICONS.ocean },
  { id: "umbrella", label: "Umbrella", file: "umbrella.mp3", icon: ICONS.umbrella },
  { id: "owl", label: "Owl", file: "owl.mp3", emoji: "🦉" },
  { id: "campfire", label: "Campfire", file: "campfire.mp3", icon: ICONS.campfire },
  { id: "cavern", label: "Cavern", file: "cavern.mp3", icon: ICONS.cavern },
  { id: "forest", label: "Forest", file: "forest.mp3", icon: ICONS.forest },
  { id: "river", label: "River", file: "river.mp3", icon: ICONS.river },
];

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
  iconWrap.className = sound.emoji ? "card-icon emoji" : "card-icon";
  iconWrap.innerHTML = sound.emoji || sound.icon;

  const label = document.createElement("div");
  label.className = "card-label";
  label.textContent = sound.label;

  const top = document.createElement("div");
  top.className = "card-top";
  top.append(iconWrap, label);

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

  players[sound.id] = { audio, slider, card };

  if (initialVolume > 0) {
    card.classList.add("active");
  }

  const applyVolume = (value) => {
    const volume = Number(value);
    slider.style.setProperty("--fill", `${volume}%`);
    audio.volume = volume / 100;

    if (volume > 0) {
      card.classList.add("active");
      audio.play().catch(() => {});
    } else {
      card.classList.remove("active");
      audio.pause();
    }

    const volumes = loadVolumes();
    volumes[sound.id] = volume;
    saveVolumes(volumes);
    updateMasterButton();
  };

  slider.addEventListener("input", (e) => applyVolume(e.target.value));

  card.addEventListener("click", (e) => {
    if (e.target === slider) return;
    const isActive = Number(slider.value) > 0;
    slider.value = isActive ? "0" : "50";
    applyVolume(slider.value);
  });
});

const masterBtn = document.getElementById("master-toggle");
const masterIcon = document.getElementById("master-icon");
const masterLabel = document.getElementById("master-label");

function anyPlaying() {
  return Object.values(players).some((p) => !p.audio.paused);
}

function updateMasterButton() {
  if (anyPlaying()) {
    masterIcon.textContent = "■";
    masterLabel.textContent = "Stop All";
  } else {
    masterIcon.textContent = "▶";
    masterLabel.textContent = "Play All";
  }
}

masterBtn.addEventListener("click", () => {
  if (anyPlaying()) {
    Object.values(players).forEach((p) => p.audio.pause());
  } else {
    Object.values(players).forEach((p) => {
      if (Number(p.slider.value) > 0) p.audio.play().catch(() => {});
    });
  }
  updateMasterButton();
});

updateMasterButton();

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
