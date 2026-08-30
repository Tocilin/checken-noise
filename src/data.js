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
  { name: "Soft Rain", mix: { rain: 0.7, thunder: 0.1 } },
  { name: "Thunderstorm", mix: { rain: 1.0, thunder: 0.9, wind: 0.6 } },
  { name: "Beach Rain", mix: { rain: 0.6, waves: 0.8, wind: 0.2 } },
  {
    name: "Deep Forest Night",
    mix: { rain: 0.2, wind: 0.2, "white-noise": 0.1, owl: 0.7, campfire: 0.3, forest: 0.8, river: 0.4 },
  },
  {
    name: "Cozy Campfire",
    mix: { rain: 0.1, wind: 0.1, campfire: 0.8, cavern: 0.2, owl: 0.5, river: 0.3 },
  },
  {
    name: "Ocean Cavern",
    mix: { ocean: 0.2, cavern: 0.4, wind: 0.2, "white-noise": 0.1, river: 0.9 },
  },
];

export const TIMERS = [15, 30, 60];
