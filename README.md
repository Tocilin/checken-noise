# Chicken Noise

A minimalist ambient sound mixer. Play and blend rain, thunder, waves, wind, birds, white noise, ocean, umbrella, owl, campfire, cavern, forest, and river sounds, each with its own volume slider. No login, no build step.

## Running locally

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

(Opening `index.html` directly as a `file://` URL also works in most browsers, though some enforce autoplay/CORS restrictions more strictly for local files.)

## Adding your sound files

Drop your mp3 files into the `audio/` folder using these exact filenames:

| Sound        | Filename           |
|--------------|---------------------|
| Rain         | `audio/rain.mp3`         |
| Thunder      | `audio/thunder.mp3`      |
| Waves        | `audio/waves.mp3`        |
| Wind         | `audio/wind.mp3`         |
| Birds        | `audio/birds.mp3`        |
| White Noise  | `audio/white-noise.mp3`  |
| Ocean        | `audio/ocean.mp3`        |
| Umbrella     | `audio/umbrella.mp3`     |
| Owl          | `audio/owl.mp3`          |
| Campfire     | `audio/campfire.mp3`     |
| Cavern       | `audio/cavern.mp3`       |
| Forest       | `audio/forest.mp3`       |
| River        | `audio/river.mp3`        |

Until a file is present, its card still works in the UI but will silently fail to play (check the browser console for a warning).

## Features

- Play any single sound, or mix several at once — each has its own volume slider.
- Click a card to quick toggle it on/off.
- "Play All" / "Stop All" button controls every active sound at once.
- Volume levels and dark mode preference persist in `localStorage`.
- Responsive grid layout, works on desktop and mobile.
