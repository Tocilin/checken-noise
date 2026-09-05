import { useMemo } from "react";

const RAINDROP_COUNT = 36;
const LEAF_COUNT = 14;

/**
 * The scene is built from separate transparent layer images (ground,
 * trees, cave, logs, chicken) stacked on a fixed-aspect canvas, so each
 * one can be animated independently. Overlay effects (rain, campfire
 * flame, thunder darkening/flash, wind leaves + tree sway) are drawn on
 * top with CSS, positioned relative to that same canvas.
 */
export default function Scene({
  sceneLabel,
  chips,
  timerNote,
  showOverlays,
  rain = 0,
  campfire = false,
  thunder = 0,
  wind = false,
}) {
  const raindrops = useMemo(
    () =>
      Array.from({ length: RAINDROP_COUNT }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.4,
        duration: 0.55 + Math.random() * 0.5,
      })),
    []
  );

  const leaves = useMemo(
    () =>
      Array.from({ length: LEAF_COUNT }, () => ({
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3.5 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="scene">
      <div className="scene-canvas">
        <img className="scene-layer scene-layer-clouds" src="/scene/clouds.png" alt="" aria-hidden="true" />
        <img className="scene-layer" src="/scene/ground.png" alt="" aria-hidden="true" />
        <img
          className={`scene-layer scene-layer-trees${wind ? " wind-sway" : ""}`}
          src="/scene/trees.png"
          alt=""
          aria-hidden="true"
        />
        <img className="scene-layer" src="/scene/cave.png" alt="" aria-hidden="true" />
        <img className="scene-layer" src="/scene/logs.png" alt="" aria-hidden="true" />
        <img className="scene-layer" src="/scene/chicken.png" alt="" aria-hidden="true" />

        {campfire && (
          <div className="scene-campfire" aria-hidden="true">
            <span className="flame flame-main" />
            <span className="flame flame-side flame-left" />
            <span className="flame flame-side flame-right" />
          </div>
        )}

        {wind && (
          <div className="scene-wind" aria-hidden="true">
            {leaves.map((l, i) => (
              <span
                key={i}
                className="leaf"
                style={{
                  top: `${l.top}%`,
                  animationDelay: `${l.delay}s`,
                  animationDuration: `${l.duration}s`,
                }}
              />
            ))}
          </div>
        )}

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

        {thunder > 0 && (
          <>
            <div className="scene-dark" style={{ opacity: thunder * 0.28 }} aria-hidden="true" />
            <div className="scene-flash" aria-hidden="true" />
          </>
        )}
      </div>

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
