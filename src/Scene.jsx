export default function Scene({ layers, sceneLabel, chips, timerNote, showOverlays }) {
  return (
    <div className="scene">
      <div className="scene-tint" style={{ opacity: layers.dark }} />
      {layers.thunder > 0 && (
        <div className="scene-thunder" style={{ "--flash-peak": layers.thunder }} />
      )}
      <span className="scene-label">{sceneLabel}</span>

      <div className="scene-stage" style={{ transform: `rotate(${layers.tilt}deg)` }}>
        {layers.umbrella && <div className="scene-umbrella" aria-hidden="true" />}
        <ChickenArt />
      </div>

      {layers.forest && <div className="scene-forest" aria-hidden="true" />}

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

function ChickenArt() {
  return (
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
  );
}
