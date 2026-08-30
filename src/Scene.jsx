/**
 * Static placeholder while the animated/reactive scene is redesigned.
 * See git history for the previous layered version (tree/cloud repeats,
 * rain, thunder, campfire, owl eyes, etc.) to restore it later.
 */
export default function Scene({ sceneLabel, chips, timerNote, showOverlays }) {
  return (
    <div className="scene">
      <img className="scene-static-img" src="/scene/composition.png" alt="" aria-hidden="true" />

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
