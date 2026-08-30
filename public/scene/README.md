# Scene art — layer spec (v2, simplified)

Getting several separately-generated images to align pixel-perfectly is
fragile. This structure minimizes how many things need to line up.

## The 3 pieces of real art to generate

All as **transparent-background PNG**, at least 1600px on the long edge
(scene renders large on desktop).

| File | What it is |
|---|---|
| `backdrop.png` | **Everything static, combined into one illustration**: sky, clouds, forest, the cave, the ground, and the unlit log pile. Basically your reference sheet's "MAIN SCENE" panel, minus the chicken and minus any weather. Generate this first — it's the anchor everything else sits on top of. |
| `chicken-idle.png` | The chicken alone, isolated, transparent background, in the pose/position it should sit at relative to the backdrop. |
| `chicken-umbrella.png` | Same chicken, same size and position, holding an open umbrella. Swapped in for `chicken-idle.png` whenever Rain or Umbrella is on — same canvas dimensions so the swap doesn't jump around. |

Optional, once the above look right:

| File | What it is |
|---|---|
| `campfire-flame.png` | 1–2 flame shapes, sized to sit above the log pile in `backdrop.png`. (Or skip — the coded CSS flicker looks fine on its own.) |
| `owl-eyes.png` | Two small glowing eyes, sized to sit inside the cave mouth in `backdrop.png`. (Or skip — same reasoning.) |

## Style prompt (reuse verbatim for every image)

> Flat 2D vector illustration, thin consistent black outline, minimal warm
> color palette (cream #F7F4EA, mustard yellow #F5C842, soft brown/olive
> accents), no gradients or shading, transparent background, children's
> book / app-icon style.

Generate `backdrop.png` first. Then feed it back into the same tool as a
reference image ("match this exact art style") when generating the
chicken and any extras — that's what keeps everything looking like one
piece of art instead of a collage.

## What stays code-drawn (not images)

Rain, thunder flashes, wind leaves, and birds are **animated patterns**,
not static pictures — a single PNG of "rain" can't loop convincingly the
way many small CSS-animated streaks can. These stay as coded CSS/SVG
effects layered on top of your art, regardless of how good the art gets.
This is normal — most illustrated "cozy weather" scenes on the web work
this way: one polished static backdrop, with lightweight animated weather
on top.

## Once you have the files

Drop them in this folder and say so — swapping a placeholder shape in
`src/Scene.jsx` for `<img src="/scene/backdrop.png">` etc. is a small,
mechanical change per file. No changes needed to positioning, animation,
or how sounds trigger each layer.
