export default function SoundRow({ item }) {
  return (
    <div
      className={`sound-row${item.on ? " on" : ""}`}
      onPointerDown={item.grab}
    >
      <span className="sound-row-fill" style={{ width: `${item.pct}%` }} />
      <span className="sound-row-border" />
      <span className="sound-row-num">{item.num}</span>
      <span className="sound-row-name">{item.name}</span>
      {item.on && <span className="sound-row-pct">{item.pct}</span>}
    </div>
  );
}
