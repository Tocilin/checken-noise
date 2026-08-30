# Scene art — layer spec

The scene is a stack of layers, drawn in this order (back to front). Right now
every layer is a coded placeholder shape in `src/Scene.jsx` / `src/index.css`.
To replace a layer with real art:

1. Generate a **transparent-background PNG**, at least 800px on the long
   edge, using the same style prompt for every layer (see below) so they
   look like one consistent illustration when stacked.
2. Save it here as `public/scene/<name>.png` using the filenames below.
3. Tell me it's ready — swapping the placeholder for `<img src="/scene/<name>.png">`
   in `Scene.jsx` is a small, mechanical change per layer.

Layers whose position/animation is driven by CSS (rain falling, thunder
flashing, flames flickering, owl eyes blinking, leaves drifting, birds
gliding) stay exactly that — code-driven motion — even after you swap in
real art. The image itself can be a single static drawing; the movement is
added on top by CSS.

## Suggested style prompt (reuse verbatim for every layer)

> Flat 2D vector illustration, thin consistent black outline, minimal warm
> color palette (cream #F7F4EA, mustard yellow #F5C842, soft brown/olive
> accents), no gradients or shading, transparent background, children's
> book / app-icon style, centered composition, generous padding around the
> subject.

Feed the **base scene** image back in as a reference (image-to-image) when
generating every other layer, so proportions, line weight, and lighting
stay consistent.

## Layer list

| # | Filename | What it is | Always visible? |
|---|----------|-----------|------------------|
| 1 | `chicken.png` | The chicken, idle pose, sitting | always |
| 1b | `chicken-umbrella.png` | Same chicken, alternate pose holding an open umbrella (full replacement sprite, same size/position as `chicken.png`) | swapped in when **Rain** or **Umbrella** is on |
| 2 | `cave.png` | Rock cave with a dark mouth, positioned right side of scene | always |
| 3 | `forest.png` | Background tree silhouettes, spans the width | always |
| 4 | `ground.png` | Ground/floor texture strip along the bottom | always |
| 5 | `logs.png` | Unlit log pile, left-of-center, in front of the chicken | always |
| 6 | `clouds.png` | Sky clouds, subtle, top of frame | always |
| 7 | `rain.png` | A repeatable tile of diagonal rain streaks (or leave as the coded CSS lines — works fine without art) | shown + animated falling when **Rain** is on |
| 8 | `thunder-bolt.png` | A single lightning bolt shape | flashed briefly, at random intervals, when **Thunder** is on |
| 9 | `wind-leaf.png` | One small leaf | several copies drift left-to-right when **Wind** is on |
| 10 | `bird.png` | One small bird silhouette (wings mid-flap) | a few drift across the top when **Birds** is on |
| 11 | `umbrella-closed.png` | Closed umbrella leaning against the logs (small decorative prop) | optional, shown when Rain/Umbrella is off |
| 13 | `campfire-flame.png` | 2–3 flame shapes (or leave coded — flicker animation is CSS) | shown above the logs, animated, when **Campfire** is on |
| 14 | `owl-eyes.png` | Two glowing dots/eyes, sized to sit inside the cave mouth | shown + blinking when **Owl** is on |
| 15 | `ocean.png` | Optional background variant (waves) | not wired up yet — ask if you want Ocean/Waves to change the backdrop |

Sounds not yet mapped to a distinct visual: **Waves, White Noise, Ocean,
Cavern** (Cavern currently only deepens the overall darkness tint). Let me
know if you want dedicated layers for any of those too.
