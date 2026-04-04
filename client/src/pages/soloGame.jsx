import { useEffect, useState } from "react";
import { startGameAPI, makeGuessAPI } from "../services/api";
import GuessInput from "../components/GuessInput.jsx";
import StatsModal from "../components/StatsModal.jsx";
import { useNavigate } from "react-router-dom";
import { revealAnswerAPI } from "../services/api";
import GlobeComponent from "../components/globe.jsx";
import { useTheme } from "../context/themeContext.jsx";
import ThemeToggle from "../components/themeToggle.jsx";
import Starfield from "../components/starfield.jsx";

function SoloGame() {
  const [guesses, setGuesses] = useState([]);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const { dark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { startGameAPI(); }, []);

  useEffect(() => {
    if (result) {
      setResultVisible(false);
      const t = setTimeout(() => setResultVisible(true), 10);
      return () => clearTimeout(t);
    }
  }, [result]);

  const handleGuess = async (country) => {
    try {
      const res = await makeGuessAPI(country);
      setResult(res.data);
      setGuesses(res.data.guesses);
      if (res.data.gameOver) setStats(res.data.stats);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleReveal = async () => {
    try {
      const res = await revealAnswerAPI();
      setGuesses(res.data.guesses);
      setStats(res.data.stats);
      setResult({ correct: true, isRevealed: true, answer: res.data.answer });
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleReplay = async () => {
    setGuesses([]);
    setStats(null);
    setResult(null);
    await startGameAPI();
  };

  // Sort guesses by distance ascending (closest first)
  const sortedGuesses = [...guesses].sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

  const bg = dark
    ? "radial-gradient(ellipse at 60% 0%, #0d2137 0%, #060c18 50%, #020508 100%)"
    : "radial-gradient(ellipse at 60% 0%, #e0f2fe 0%, #bae6fd 40%, #f8fafc 100%)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Crimson+Pro:ital,wght@0,300;1,300&display=swap');
        .font-cinzel  { font-family: 'Cinzel', serif; }
        .font-crimson { font-family: 'Crimson Pro', serif; }

        .s-grid-dark {
          background-image: linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .s-grid-light {
          background-image: linear-gradient(rgba(14,116,144,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(14,116,144,0.06) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        @keyframes s-scanline {
          0%   { top: -4px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes s-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes s-slideRight {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes s-result-pop {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes s-glow-border {
          0%, 100% { border-color: rgba(56,189,248,0.18); }
          50%       { border-color: rgba(56,189,248,0.55); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }

        .s-scanline {
          animation: s-scanline 8s linear infinite;
          position: absolute; left: 0; right: 0; height: 2px; pointer-events: none;
        }
        .s-header-anim { animation: s-fadeUp 0.6s 0.0s ease both; }
        .s-globe-anim  { animation: s-fadeUp 0.7s 0.1s ease both; }
        .s-input-anim  { animation: s-fadeUp 0.6s 0.2s ease both; }
        .s-result-pop  { animation: s-result-pop 0.38s cubic-bezier(0.34,1.4,0.64,1) both; }
        .s-glow-border { animation: s-glow-border 3s ease-in-out infinite; }
        .s-guess-card  { animation: s-slideRight 0.3s ease both; }

        /* Horizontal guesses scroll */
        .guesses-scroll {
          display: flex;
          flex-direction: row;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 8px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .guesses-scroll::-webkit-scrollbar { height: 4px; }
        .guesses-scroll::-webkit-scrollbar-track { background: transparent; }
        .guesses-scroll::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 4px; }

        .guess-card {
          scroll-snap-align: start;
          flex-shrink: 0;
          min-width: 140px;
          max-width: 160px;
        }

        .reveal-btn {
          position: relative; overflow: hidden; transition: all 0.2s;
        }
        .reveal-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          transform: translateX(-100%); transition: transform 0.4s;
        }
        .reveal-btn:hover::after  { transform: translateX(100%); }
        .reveal-btn:hover         { box-shadow: 0 0 20px rgba(239,68,68,0.35); }
        .reveal-btn:active        { transform: scale(0.97); }

        .solo-scroll::-webkit-scrollbar       { width: 4px; }
        .solo-scroll::-webkit-scrollbar-track { background: transparent; }
        .solo-scroll::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.18); border-radius: 4px; }
      `}</style>

      <div
        className="solo-scroll relative min-h-screen w-full flex flex-col items-center text-white overflow-y-auto overflow-x-hidden transition-colors duration-500"
        style={{ background: bg, color: dark ? "white" : "#0c4a6e" }}
      >
        <Starfield />

        {/* Grid */}
        <div className={`absolute inset-0 pointer-events-none ${dark ? "s-grid-dark" : "s-grid-light"}`} style={{ zIndex: 0 }} />

        {/* Scanline */}
        {dark && (
          <div className="s-scanline" style={{ zIndex: 1, background: "linear-gradient(90deg,transparent,rgba(56,189,248,0.1),transparent)" }} />
        )}

        {/* Corner coords */}
        <span className="font-cinzel absolute top-4 left-5 text-xs tracking-widest pointer-events-none"
          style={{ zIndex: 2, color: dark ? "rgba(56,189,248,0.22)" : "rgba(14,116,144,0.25)" }}>LAT 0°00′N</span>
        <span className="font-cinzel absolute top-4 right-36 text-xs tracking-widest pointer-events-none"
          style={{ zIndex: 2, color: dark ? "rgba(56,189,248,0.22)" : "rgba(14,116,144,0.25)" }}>LON 0°00′E</span>

        {/* ── Sticky Header ── */}
        <header
          className="s-header-anim sticky top-0 w-full flex items-center justify-between px-5 py-3 border-b"
          style={{
            backgroundColor: dark ? "rgba(6,12,24,0.9)" : "rgba(240,249,255,0.9)",
            backdropFilter: "blur(14px)",
            borderColor: dark ? "rgba(56,189,248,0.12)" : "rgba(14,116,144,0.15)",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => navigate("/")}
            className="font-cinzel text-xs tracking-widest transition-colors"
            style={{ color: dark ? "rgba(56,189,248,0.5)" : "rgba(14,116,144,0.6)", letterSpacing: "0.15em" }}
            onMouseEnter={e => e.currentTarget.style.color = dark ? "rgba(56,189,248,0.9)" : "#0369a1"}
            onMouseLeave={e => e.currentTarget.style.color = dark ? "rgba(56,189,248,0.5)" : "rgba(14,116,144,0.6)"}
          >
            ← HOME
          </button>

          <div className="flex items-center gap-2">
            <span style={{ fontSize: "1.1rem" }}>🌍</span>
            <h1 className="font-cinzel font-bold tracking-[0.22em]"
              style={{ fontSize: "1rem", color: dark ? "#f0f9ff" : "#0c4a6e" }}>
              MAPORA
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span className="font-cinzel text-xs tracking-widest"
                style={{ color: dark ? "rgba(125,211,252,0.65)" : "rgba(14,116,144,0.7)" }}>
                {guesses.length} {guesses.length === 1 ? "GUESS" : "GUESSES"}
              </span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* ── Main ── */}
        <div className="relative w-full flex flex-col items-center" style={{ zIndex: 2 }}>

          {/* Globe */}
          <div className="s-globe-anim w-full flex justify-center mt-1">
            <GlobeComponent guesses={guesses} />
          </div>

          {/* Divider */}
          <div className="w-40 h-px mt-7 my-4"
            style={{ background: dark ? "linear-gradient(90deg,transparent,rgba(56,189,248,0.38),transparent)" : "linear-gradient(90deg,transparent,rgba(14,116,144,0.3),transparent)" }} />

          {/* ── Input row ── */}
          <div className="s-input-anim w-full max-w-lg px-5 flex justify-center">
            <GuessInput onGuess={handleGuess} dark={dark} />
          </div>

          {/* ── Result card ── */}
          {result && (
            <div
              key={JSON.stringify(result)}
              className="s-result-pop s-glow-border mt-5 w-full max-w-sm mx-4 rounded-xl border p-5 text-center"
              style={{
                background: dark ? "rgba(10,25,47,0.8)" : "rgba(224,242,254,0.85)",
                backdropFilter: "blur(14px)",
                borderColor: dark ? "rgba(56,189,248,0.2)" : "rgba(14,116,144,0.25)",
              }}
            >
              {result.distance != null && !result.isRevealed && (
                <div className="mb-2">
                  <p className="font-cinzel text-xs tracking-widest mb-1"
                    style={{ color: dark ? "rgba(56,189,248,0.5)" : "rgba(14,116,144,0.55)" }}>DISTANCE</p>
                  <p className="text-3xl font-bold" style={{ color: dark ? "#e0f2fe" : "#0c4a6e" }}>
                    {result.distance.toLocaleString()}
                    <span className="text-sm font-normal ml-1" style={{ color: dark ? "rgba(125,211,252,0.55)" : "rgba(14,116,144,0.5)" }}>km</span>
                  </p>
                </div>
              )}
              {result.warmth && !result.isRevealed && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mt-2"
                  style={{
                    background: result.warmth === "warmer" ? "rgba(251,146,60,0.12)" : "rgba(147,197,253,0.1)",
                    border: `1px solid ${result.warmth === "warmer" ? "rgba(251,146,60,0.32)" : "rgba(147,197,253,0.22)"}`,
                  }}>
                  <span>{result.warmth === "warmer" ? "🔥" : "❄️"}</span>
                  <span className="font-cinzel text-xs tracking-widest"
                    style={{ color: result.warmth === "warmer" ? "#fb923c" : "#93c5fd" }}>
                    {result.warmth === "warmer" ? "WARMER" : "COLDER"}
                  </span>
                </div>
              )}
              {result.isAdjacent && !result.isRevealed && (
                <p className="font-cinzel text-xs tracking-widest text-orange-400 mt-3">🔥 ADJACENT COUNTRY</p>
              )}
              {result.isRevealed && (
                <div>
                  <p className="font-cinzel text-xs tracking-widest mb-2"
                    style={{ color: dark ? "rgba(56,189,248,0.5)" : "rgba(14,116,144,0.55)" }}>THE ANSWER WAS</p>
                  <p className="font-cinzel text-2xl font-bold tracking-wide text-red-400">{result.answer}</p>
                </div>
              )}
            </div>
          )}

          {/* ── Horizontal Guesses (sorted closest first) ── */}
          {sortedGuesses.length > 0 && (
            <div className="mt-6 w-full max-w-2xl px-5 pb-28">
              <p className="font-cinzel text-xs tracking-widest mb-3 text-center"
                style={{ color: dark ? "rgba(56,189,248,0.35)" : "rgba(14,116,144,0.45)" }}>
                GUESSES — SORTED BY CLOSEST
              </p>
              <div className="guesses-scroll">
                {sortedGuesses.map((g, i) => (
                  <div
                    key={i}
                    className="guess-card s-guess-card flex flex-col items-center justify-center p-3 rounded-xl"
                    style={{
                      animationDelay: `${i * 0.04}s`,
                      backgroundColor: g.color,
                      color: "#111",
                      boxShadow: `0 4px 16px ${g.color}55`,
                    }}
                  >
                    {/* Rank badge */}
                    <span className="font-cinzel text-xs font-bold mb-1 opacity-60">#{i + 1}</span>
                    <span className="font-cinzel text-xs font-bold tracking-wide text-center leading-tight">{g.name}</span>
                    <span className="text-sm font-bold mt-1 opacity-80">{g.distance?.toLocaleString()} km</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Reveal Answer — fixed bottom-left ── */}
        <button
          onClick={handleReveal}
          className="reveal-btn font-cinzel fixed text-xs m-5 px-5 py-3 rounded-lg"
          style={{
            zIndex: 20,
            letterSpacing: "0.15em",
            color: "rgba(252,165,165,0.9)",
            border: "1px solid rgba(239,68,68,0.35)",
            background: dark ? "rgba(10,5,5,0.85)" : "rgba(254,242,242,0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(239,68,68,0.15)",
          }}
        >
          ⚠ REVEAL ANSWER
        </button>

        {/* Stats modal */}
        {stats && (
          <StatsModal stats={stats} onReplay={handleReplay} onExit={() => navigate("/")} />
        )}
      </div>
    </>
  );
}

export default SoloGame;