import { useState } from "react";

function GuessInput({ onGuess, dark = true }) {
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country.trim()) return;
    onGuess(country.trim());
    setCountry("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country..."
        className="px-4 py-2.5 rounded-lg border w-64 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors"
        style={{
          backgroundColor: dark ? "rgba(255,255,255,0.95)" : "#ffffff",
          borderColor: dark ? "rgba(56,189,248,0.3)" : "rgba(14,116,144,0.25)",
          color: "#111111",
          caretColor: "#111111",
          fontFamily: "'Cinzel', serif",
          fontSize: "0.8rem",
          letterSpacing: "0.05em",
        }}
      />
      <button
        type="submit"
        className="px-5 py-2.5 text-white font-bold rounded-lg transition-all active:scale-95 hover:-translate-y-0.5"
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
          boxShadow: "0 0 18px rgba(14,165,233,0.35)",
        }}
      >
        GUESS
      </button>
    </form>
  );
}

export default GuessInput;