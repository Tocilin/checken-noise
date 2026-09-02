import { useMemo } from "react";

const RAINDROP_COUNT = 36;

/**
 * Static composition image, with lightweight animated overlays reacting
 * to a few key sounds (rain, campfire, thunder). See git history for the
 * previous fully layered/reactive version (tree/cloud repeats, owl eyes,
 * etc.) to restore more of that later.
 */
export default function Scene({
  sceneLabel,
  chips,
  timerNote,
  showOverlays,
  rain = 0,
  campfire = false,
  thunder = 0,
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

  return (
    <div className="scene">
      <img className="scene-static-img" src="/scene/composition.png" alt="" aria-hidden="true" />

      {campfire && (
        <div className="scene-campfire" aria-hidden="true">
          <span className="flame flame-main" />
          <span className="flame flame-side flame-left" />
          <span className="flame flame-side flame-right" />
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
          <div className="scene-dark" style={{ opacity: thunder * 0.55 }} aria-hidden="true" />
          <div className="scene-flash" aria-hidden="true" />
        </>
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
