import { useEffect, useState } from "react";
import { useTheme } from "../context/themeContext.jsx";

function StatsModal({ stats, onReplay, onExit }) {
  const [visible, setVisible] = useState(false);
  const { dark } = useTheme();
  const won = stats?.won;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes modal-backdrop { from { opacity: 0; } to { opacity: 1; } }
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(60px) rotate(720deg); opacity: 0; }
        }
        .modal-backdrop-anim { animation: modal-backdrop 0.25s ease both; }
        .confetti-piece { animation: confetti-fall 1.2s ease forwards; }
      `}</style>

      <div
        className="modal-backdrop-anim fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      >
        <div
          className="w-full max-w-sm relative overflow-hidden"
          style={{
            transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
            transform: visible ? "scale(1) translateY(0)" : "scale(0.82) translateY(28px)",
            opacity: visible ? 1 : 0,
            background: dark
              ? "linear-gradient(135deg, rgba(10,25,50,0.97) 0%, rgba(6,15,30,0.98) 100%)"
              : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            border: dark ? "1px solid rgba(56,189,248,0.25)" : "1px solid rgba(14,116,144,0.2)",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: dark
              ? "0 0 60px rgba(56,189,248,0.15), 0 24px 48px rgba(0,0,0,0.6)"
              : "0 24px 48px rgba(14,116,144,0.15)",
          }}
        >
          {/* Confetti bits for win */}
          {won && visible && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {["#38bdf8","#fbbf24","#34d399","#f472b6","#a78bfa"].map((c, i) => (
                <div key={i} className="confetti-piece absolute w-2 h-2 rounded-sm"
                  style={{
                    background: c,
                    left: `${15 + i * 18}%`,
                    top: "10%",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Glow line top */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: won ? "linear-gradient(90deg,transparent,#38bdf8,transparent)" : "linear-gradient(90deg,transparent,rgba(239,68,68,0.6),transparent)" }} />

          {/* Emoji */}
          <div className="text-center text-5xl mb-3">{won ? "🏆" : "😔"}</div>

          {/* Title */}
          <h2 className="font-cinzel text-center font-bold tracking-wide mb-1"
            style={{
              fontSize: "1.3rem",
              color: won
                ? (dark ? "#fbbf24" : "#b45309")
                : (dark ? "#f1f5f9" : "#0c4a6e"),
            }}>
            {won ? "MISSION COMPLETE!" : "BETTER LUCK NEXT TIME"}
          </h2>

          {/* Revealed note */}
          {stats?.revealed && (
            <p className="font-cinzel text-center text-xs tracking-widest mt-1 mb-2"
              style={{ color: "rgba(239,68,68,0.7)" }}>
              ⚠ ANSWER REVEALED
            </p>
          )}

          {/* Answer */}
          {stats?.answer && (
            <div className="text-center mt-3 mb-4 py-3 rounded-lg"
              style={{
                background: dark ? "rgba(56,189,248,0.07)" : "rgba(14,116,144,0.08)",
                border: dark ? "1px solid rgba(56,189,248,0.2)" : "1px solid rgba(14,116,144,0.15)",
              }}>
              <p className="font-cinzel text-xs tracking-widest mb-1"
                style={{ color: dark ? "rgba(56,189,248,0.5)" : "rgba(14,116,144,0.5)" }}>
                THE COUNTRY WAS
              </p>
              <p className="font-cinzel text-xl font-bold tracking-widest"
                style={{ color: dark ? "#7dd3fc" : "#0369a1" }}>
                {stats.answer.toUpperCase()}
              </p>
            </div>
          )}

          {/* Stats row */}
          <div className="flex justify-center gap-3 mb-5">
            {stats?.timeTaken != null && (
              <div className="flex-1 rounded-lg py-3 text-center"
                style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,116,144,0.06)" }}>
                <p className="font-cinzel font-bold text-xl" style={{ color: dark ? "#e2e8f0" : "#0c4a6e" }}>
                  {stats.timeTaken}s
                </p>
                <p className="font-cinzel text-xs tracking-widest mt-0.5"
                  style={{ color: dark ? "rgba(148,163,184,0.6)" : "rgba(14,116,144,0.5)" }}>TIME</p>
              </div>
            )}
            {stats?.totalGuesses != null && (
              <div className="flex-1 rounded-lg py-3 text-center"
                style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,116,144,0.06)" }}>
                <p className="font-cinzel font-bold text-xl" style={{ color: dark ? "#e2e8f0" : "#0c4a6e" }}>
                  {stats.totalGuesses}
                </p>
                <p className="font-cinzel text-xs tracking-widest mt-0.5"
                  style={{ color: dark ? "rgba(148,163,184,0.6)" : "rgba(14,116,144,0.5)" }}>GUESSES</p>
              </div>
            )}
            {stats?.streak != null && (
              <div className="flex-1 rounded-lg py-3 text-center"
                style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,116,144,0.06)" }}>
                <p className="font-cinzel font-bold text-xl" style={{ color: dark ? "#e2e8f0" : "#0c4a6e" }}>
                  {stats.streak}
                </p>
                <p className="font-cinzel text-xs tracking-widest mt-0.5"
                  style={{ color: dark ? "rgba(148,163,184,0.6)" : "rgba(14,116,144,0.5)" }}>STREAK</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button onClick={onReplay}
              className="flex-1 font-cinzel text-xs py-3 rounded-lg text-white transition-all active:scale-95 hover:-translate-y-0.5"
              style={{
                letterSpacing: "0.15em",
                background: "linear-gradient(135deg,#0ea5e9,#0369a1)",
                boxShadow: "0 0 20px rgba(14,165,233,0.3)",
              }}>
              PLAY AGAIN
            </button>
            <button onClick={onExit}
              className="flex-1 font-cinzel text-xs py-3 rounded-lg transition-all active:scale-95 hover:-translate-y-0.5"
              style={{
                letterSpacing: "0.15em",
                background: dark ? "rgba(255,255,255,0.07)" : "rgba(14,116,144,0.08)",
                border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(14,116,144,0.2)",
                color: dark ? "rgba(148,163,184,0.8)" : "#0369a1",
              }}>
              EXIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsModal;