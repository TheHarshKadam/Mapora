import { useTheme } from "../context/themeContext.jsx";

export default function ThemeToggle({ className = "" }) {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 ${className}`}
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        borderColor: dark ? "rgba(56,189,248,0.25)" : "rgba(14,116,144,0.3)",
        background: dark ? "rgba(56,189,248,0.07)" : "rgba(186,230,253,0.35)",
        color: dark ? "rgba(125,211,252,0.8)" : "#0369a1",
      }}
      title="Toggle theme"
    >
      <span style={{ fontSize: "0.85rem" }}>{dark ? "☀️" : "🌙"}</span>
      <span>{dark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}