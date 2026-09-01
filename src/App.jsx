import { useMixer } from "./useMixer.js";
import Scene from "./Scene.jsx";
import SoundRow from "./SoundRow.jsx";

export default function App() {
  const m = useMixer();

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-left">
          <span className="dot" />
          <span className="brand">Chicken Noise</span>
          <span className="mono muted">{m.activeCount} of 13 on</span>
        </div>
        <div className="topbar-right">
          <span className="mono muted eyebrow">Sleep timer</span>
          {m.timers.map((t) => (
            <button
              key={t.label}
              className={`chip-btn${t.active ? " active" : ""}`}
              onClick={() => m.toggleTimer(t.minutes)}
            >
              {t.label}
            </button>
          ))}
          <button className="share-btn" onClick={m.shareMix}>
            {m.shareCopied ? "Copied!" : "Share mix"}
          </button>
        </div>
      </header>

      <div className="panes">
        <div className="scene-pane">
          <Scene
            sceneLabel={m.sceneLabel}
            chips={m.chips}
            timerNote={m.timerNote}
            showOverlays
          />
        </div>

        <div className="mixer-pane">
          <div className="mixer-pane-header">
            <span className="mono muted eyebrow">Presets</span>
            <button className="stop-all-btn" onClick={m.stopAll}>
              Stop all
            </button>
          </div>
          <div className="presets-row">
            {m.presets.map((p) => (
              <button
                key={p.name}
                className={`preset-chip${p.active ? " active" : ""}`}
                onClick={() => m.applyPreset(p)}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="sounds-list">
            {m.items.map((item) => (
              <SoundRow key={item.key} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-card">
        <header className="mobile-topbar">
          <span className="brand">Chicken Noise</span>
          <span className="mono muted">{m.timerNote}</span>
        </header>
        <div className="mobile-scene">
          <Scene sceneLabel={m.sceneLabel} chips={m.chips} timerNote={m.timerNote} showOverlays={false} />
        </div>
        <div className="mobile-presets-row">
          {m.timers.map((t) => (
            <button
              key={t.label}
              className={`chip-btn${t.active ? " active" : ""}`}
              onClick={() => m.toggleTimer(t.minutes)}
            >
              {t.label}
            </button>
          ))}
          <button className="stop-all-btn" onClick={m.stopAll}>
            Stop all
          </button>
          {m.presets.map((p) => (
            <button
              key={p.name}
              className={`preset-chip${p.active ? " active" : ""}`}
              onClick={() => m.applyPreset(p)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="mobile-sheet-header">
          <span className="mono muted">{m.activeCount}/13</span>
        </div>
        <div className="sounds-list mobile-list">
          {m.items.map((item) => (
            <SoundRow key={item.key} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
