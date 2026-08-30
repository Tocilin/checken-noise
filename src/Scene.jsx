/**
 * Layered scene. Each layer below is a placeholder shape standing in for a
 * future hand-drawn asset. To swap a layer for real art:
 *   1. Generate a transparent-background PNG at the same canvas proportions
 *      as the others (see public/scene/README.md for the exact spec).
 *   2. Drop it in public/scene/<name>.png
 *   3. Replace that layer's placeholder markup below with
 *      <img className="layer-xxx" src="/scene/<name>.png" alt="" />
 * The positioning/animation classes in index.css don't need to change —
 * they already target the right layer names.
 */
export default function Scene({ layers, sceneLabel, chips, timerNote, showOverlays }) {
  return (
    <div className="scene">
      <Ground />
      <Clouds />
      <Forest />
      <Cave hasOwl={layers.owl} />
      {layers.campfire && <Campfire />}
      <Logs />

      <div
        className="scene-stage"
        style={{ transform: `rotate(${layers.tilt}deg)` }}
      >
        <Chicken umbrella={layers.umbrella} />
      </div>

      {layers.wind && <Wind />}
      {layers.birds && <Birds />}
      {layers.rain > 0 && <Rain intensity={layers.rain} />}
      {layers.thunder > 0 && (
        <div className="scene-thunder" style={{ "--flash-peak": layers.thunder }} />
      )}

      <div className="scene-tint" style={{ opacity: layers.dark }} />
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

function Ground() {
  return <img className="layer-ground" src="/scene/ground-2.png" alt="" aria-hidden="true" />;
}

function Clouds() {
  return <img className="layer-clouds" src="/scene/clouds.png" alt="" aria-hidden="true" />;
}

function Forest() {
  return <img className="layer-forest" src="/scene/forest.png" alt="" aria-hidden="true" />;
}

function Cave({ hasOwl }) {
  return (
    <div className="layer-cave">
      <img src="/scene/cave.png" alt="" aria-hidden="true" />
      {hasOwl && (
        <div className="owl-eyes" aria-hidden="true">
          <span className="owl-eye" />
          <span className="owl-eye" />
        </div>
      )}
    </div>
  );
}

function Logs() {
  return <img className="layer-logs" src="/scene/logs.png" alt="" aria-hidden="true" />;
}

function Campfire() {
  return (
    <div className="layer-campfire" aria-hidden="true">
      <span className="flame flame-1" />
      <span className="flame flame-2" />
      <span className="flame flame-3" />
    </div>
  );
}

function Wind() {
  return (
    <div className="layer-wind" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`wind-leaf wind-leaf-${i}`} />
      ))}
    </div>
  );
}

function Birds() {
  return (
    <svg className="layer-birds" viewBox="0 0 300 60" aria-hidden="true">
      {[
        [30, 15],
        [70, 30],
        [110, 10],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q6 -8 12 0 q6 -8 12 0`} className="bird-shape" />
      ))}
    </svg>
  );
}

function Rain({ intensity }) {
  const count = Math.max(14, Math.round(intensity * 42));
  const drops = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="layer-rain" aria-hidden="true">
      {drops.map((i) => {
        const left = (i * 137) % 100;
        const delay = ((i * 71) % 100) / 100;
        const duration = 0.55 + ((i * 53) % 40) / 100;
        return (
          <span
            key={i}
            className="raindrop"
            style={{
              left: `${left}%`,
              animationDelay: `-${delay * duration}s`,
              animationDuration: `${duration}s`,
              opacity: 0.35 + intensity * 0.4,
            }}
          />
        );
      })}
    </div>
  );
}

function Chicken({ umbrella }) {
  return (
    <div className="chicken-wrap">
      {umbrella && (
        <svg viewBox="0 0 160 110" className="umbrella-art" aria-hidden="true">
          <path d="M20 70 Q80 0 140 70 Z" className="umbrella-canopy" />
          <path d="M20 70 Q80 84 140 70" className="umbrella-rim" />
          <line x1="80" y1="70" x2="80" y2="108" className="umbrella-pole" />
          <path d="M80 100 q10 8 16 0" className="umbrella-handle" />
        </svg>
      )}
      <img className="chicken-art" src="/scene/chicken.png" alt="A sleepy chicken" />
    </div>
  );
}
