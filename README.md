# Chicken Noise

An ambient sound mixer: click a sound row where you want the volume, drag to fine-tune, mix as many of the 13 layers as you like. Built with React + Vite.

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/` you can deploy anywhere.

## Sound files

The 13 mp3s live in `public/audio/` and are already included:

rain, thunder, waves, wind, birds, white-noise, ocean, umbrella, owl, campfire, cavern, forest, river.

## Features

- **Click-to-set volume** — click anywhere on a sound row and its volume jumps to that point; drag to adjust, release near zero to turn it off.
- **Presets** — Rainy nap, Storm, Campfire night, Ocean drift, Deep cavern, Morning forest, Riverside, White room (edit `src/data.js` to add more).
- **Sleep timer** — 15/30/60 minute countdown that stops all sounds when it hits zero.
- **Share mix** — encodes the current mix into the URL and copies it to your clipboard; opening that link restores the exact mix.
- **Stop all** — silences every sound in one click.
- **Scene** — a chicken illustration with a reactive backdrop (darkens with rain/thunder/cavern/owl, tilts with wind). The chicken itself is currently static — interactivity is planned for later.
- Responsive: a two-pane desktop layout and a stacked single-column mobile layout.
