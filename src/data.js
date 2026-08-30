export const SOUNDS = [
  { key: "rain", name: "Rain" },
  { key: "thunder", name: "Thunder" },
  { key: "waves", name: "Waves" },
  { key: "wind", name: "Wind" },
  { key: "birds", name: "Birds" },
  { key: "white-noise", name: "White Noise" },
  { key: "ocean", name: "Ocean" },
  { key: "umbrella", name: "Umbrella" },
  { key: "owl", name: "Owl" },
  { key: "campfire", name: "Campfire" },
  { key: "cavern", name: "Cavern" },
  { key: "forest", name: "Forest" },
  { key: "river", name: "River" },
];

export const PRESETS = [
  { name: "Rainy nap", mix: { rain: 0.7, umbrella: 0.8, forest: 0.4 } },
  { name: "Storm", mix: { rain: 0.9, thunder: 0.8, wind: 0.6, cavern: 0.5 } },
  { name: "Campfire night", mix: { campfire: 0.85, forest: 0.5, owl: 0.6 } },
  { name: "Ocean drift", mix: { ocean: 0.8, waves: 0.6, birds: 0.3 } },
  { name: "Deep cavern", mix: { cavern: 0.9, river: 0.4, "white-noise": 0.25 } },
  { name: "Morning forest", mix: { forest: 0.7, birds: 0.6, wind: 0.3 } },
  { name: "Riverside", mix: { river: 0.75, forest: 0.45, waves: 0.3 } },
  { name: "White room", mix: { "white-noise": 0.6 } },
];

export const TIMERS = [15, 30, 60];
