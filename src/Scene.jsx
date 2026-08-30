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
  return <div className="layer-ground" aria-hidden="true" />;
}

function Clouds() {
  return (
    <svg className="layer-clouds" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
      <g className="cloud-shape">
        <ellipse cx="60" cy="30" rx="30" ry="14" />
        <ellipse cx="88" cy="24" rx="20" ry="11" />
      </g>
      <g className="cloud-shape">
        <ellipse cx="290" cy="18" rx="24" ry="10" />
        <ellipse cx="312" cy="24" rx="16" ry="9" />
      </g>
    </svg>
  );
}

function Forest() {
  return (
    <svg className="layer-forest" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
      {[20, 55, 90, 300, 335, 370].map((x, i) => (
        <path
          key={i}
          d={`M${x} 120 L${x - 16} 60 L${x - 6} 60 L${x - 20} 20 L${x} 34 L${x + 20} 20 L${x + 6} 60 L${x + 16} 60 Z`}
          className="tree-shape"
        />
      ))}
    </svg>
  );
}

function Cave({ hasOwl }) {
  return (
    <div className="layer-cave">
      <svg viewBox="0 0 200 160" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <path
          d="M20 160 L20 90 Q20 20 100 20 Q180 20 180 90 L180 160 Z"
          className="cave-rock"
        />
        <path d="M55 160 L55 95 Q55 45 100 45 Q145 45 145 95 L145 160 Z" className="cave-mouth" />
      </svg>
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
  return (
    <svg className="layer-logs" viewBox="0 0 120 50" aria-hidden="true">
      <g className="log-shape">
        <rect x="4" y="26" width="90" height="16" rx="8" />
        <rect x="18" y="10" width="90" height="16" rx="8" transform="rotate(-4 18 10)" />
      </g>
    </svg>
  );
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
      <svg viewBox="0 0 200 200" className="chicken-art" aria-label="A sleepy chicken">
        <ellipse cx="100" cy="185" rx="46" ry="8" className="chicken-shadow" />
        <path
          d="M60 150 Q50 90 100 75 Q150 90 140 150 Q140 178 100 180 Q60 178 60 150 Z"
          className="chicken-body"
        />
        <path d="M62 120 Q40 128 46 155 Q58 158 66 140 Z" className="chicken-wing" />
        <path d="M84 78 Q100 58 116 78 Q112 92 100 92 Q88 92 84 78 Z" className="chicken-comb" />
        <path d="M96 96 Q100 108 108 100 Z" className="chicken-beak" />
        <path d="M84 96 q6 6 12 0" className="chicken-eye" />
        <path d="M104 96 q6 6 12 0" className="chicken-eye" />
        <path d="M84 172 l-6 10 l10 -2 Z" className="chicken-foot" />
        <path d="M116 172 l6 10 l-10 -2 Z" className="chicken-foot" />
      </svg>
    </div>
  );
}
