import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useTheme } from "../context/themeContext.jsx";
import ThemeToggle from "../components/themeToggle.jsx";
import Starfield from "../components/starfield.jsx";

function GlobeSVG() {
  return (
    <div style={{ filter: "drop-shadow(0 0 36px rgba(56,189,248,0.3))" }}>
      <svg viewBox="0 0 280 280" width="250" height="250" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hg1" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="60%" stopColor="#0c1e35" />
            <stop offset="100%" stopColor="#060d1b" />
          </radialGradient>
          <radialGradient id="hg2" cx="33%" cy="28%" r="50%">
            <stop offset="0%" stopColor="rgba(147,210,255,0.22)" />
            <stop offset="100%" stopColor="rgba(147,210,255,0)" />
          </radialGradient>
          <clipPath id="hgc"><circle cx="140" cy="140" r="108" /></clipPath>
        </defs>
        <circle cx="140" cy="140" r="128" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1" className="h-pulse-ring" />
        <circle cx="140" cy="140" r="118" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1" className="h-pulse-ring2" />
        <circle cx="140" cy="140" r="108" fill="url(#hg1)" />
        <g clipPath="url(#hgc)" fill="none" stroke="rgba(56,189,248,0.28)" strokeWidth="0.7">
          {[-60,-30,0,30,60].map((lat, i) => {
            const y = 140 + (lat / 90) * 108;
            const rx = Math.sqrt(Math.max(0, 108*108 - (y-140)*(y-140)));
            return <ellipse key={i} cx="140" cy={y} rx={rx} ry={rx * 0.3} />;
          })}
          {[0,45,90,135].map((_, i) => (
            <ellipse key={i} cx="140" cy="140" rx={108 * Math.abs(Math.cos(i * 45 * Math.PI / 180))} ry="108" />
          ))}
        </g>
        <g clipPath="url(#hgc)" fill="rgba(56,189,248,0.2)" stroke="rgba(56,189,248,0.4)" strokeWidth="0.6">
          <ellipse cx="108" cy="115" rx="26" ry="19" transform="rotate(-12,108,115)" />
          <ellipse cx="156" cy="128" rx="19" ry="13" transform="rotate(8,156,128)" />
          <ellipse cx="178" cy="106" rx="13" ry="17" transform="rotate(-4,178,106)" />
          <ellipse cx="90"  cy="152" rx="11" ry="15" transform="rotate(18,90,152)" />
          <ellipse cx="170" cy="158" rx="17" ry="9"  transform="rotate(-8,170,158)" />
          <ellipse cx="132" cy="93"  rx="20" ry="9"  transform="rotate(4,132,93)" />
        </g>
        <circle cx="140" cy="140" r="108" fill="url(#hg2)" />
        <circle cx="140" cy="140" r="108" fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />
        <circle cx="140" cy="140" r="5" fill="#38bdf8" className="h-orbit-dot1" style={{ filter: "drop-shadow(0 0 5px #38bdf8)" }} />
        <circle cx="140" cy="140" r="3" fill="#7dd3fc" className="h-orbit-dot2" style={{ filter: "drop-shadow(0 0 4px #7dd3fc)" }} />
      </svg>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { dark } = useTheme();

  const bg = dark
    ? "radial-gradient(ellipse at 60% 20%, #0d2137 0%, #060c18 55%, #020508 100%)"
    : "radial-gradient(ellipse at 60% 20%, #e0f2fe 0%, #bae6fd 40%, #f0f9ff 100%)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Crimson+Pro:ital,wght@0,300;1,300&display=swap');
        .font-cinzel  { font-family: 'Cinzel', serif; }
        .font-crimson { font-family: 'Crimson Pro', serif; }

        .home-grid-dark {
          background-image: linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .home-grid-light {
          background-image: linear-gradient(rgba(14,116,144,0.07) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(14,116,144,0.07) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        @keyframes h-scanline {
          0%   { top: -4px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes h-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes h-pulse-ring {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.9; }
        }
        @keyframes h-orbit1 {
          from { transform: rotate(0deg) translateX(118px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(118px) rotate(-360deg); }
        }
        @keyframes h-orbit2 {
          from { transform: rotate(180deg) translateX(100px) rotate(-180deg); }
          to   { transform: rotate(540deg) translateX(100px) rotate(-540deg); }
        }
        @keyframes h-shimmer {
          0%   { left: -100%; }
          100% { left: 200%; }
        }

        .h-anim-0 { animation: h-fadeUp 0.7s 0.00s ease both; }
        .h-anim-1 { animation: h-fadeUp 0.7s 0.15s ease both; }
        .h-anim-2 { animation: h-fadeUp 0.7s 0.30s ease both; }
        .h-anim-3 { animation: h-fadeUp 0.7s 0.45s ease both; }
        .h-anim-4 { animation: h-fadeUp 0.7s 0.60s ease both; }
        .h-anim-5 { animation: h-fadeUp 0.7s 0.75s ease both; }

        .h-pulse-ring  { animation: h-pulse-ring 3s ease-in-out infinite; }
        .h-pulse-ring2 { animation: h-pulse-ring 3s 1s ease-in-out infinite; }
        .h-orbit-dot1  { animation: h-orbit1 6s linear infinite; transform-origin: 140px 140px; }
        .h-orbit-dot2  { animation: h-orbit2 10s linear infinite; transform-origin: 140px 140px; }
        .h-scanline    { animation: h-scanline 8s linear infinite; position: absolute; left: 0; right: 0; height: 2px; pointer-events: none; }

        .h-btn-play { position: relative; overflow: hidden; }
        .h-btn-play::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }
        .h-btn-play:hover::after { animation: h-shimmer 0.5s ease forwards; }
      `}</style>

      <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
        style={{ background: bg }}>

        <Starfield />

        {/* Grid */}
        <div className={`absolute inset-0 pointer-events-none ${dark ? "home-grid-dark" : "home-grid-light"}`} style={{ zIndex: 0 }} />

        {/* Scanline (dark only) */}
        {dark && (
          <div className="h-scanline" style={{ zIndex: 1, background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.1), transparent)" }} />
        )}

        {/* Theme toggle — top right */}
        <div className="absolute top-5 right-6" style={{ zIndex: 10 }}>
          <ThemeToggle />
        </div>

        {/* Corner coords */}
        <span className="font-cinzel absolute top-5 left-6 text-xs tracking-widest pointer-events-none"
          style={{ zIndex: 2, color: dark ? "rgba(56,189,248,0.25)" : "rgba(14,116,144,0.5)" }}>LAT 19°04′N</span>
        <span className="font-cinzel absolute bottom-5 left-6 text-xs tracking-widest pointer-events-none"
          style={{ zIndex: 2, color: dark ? "rgba(56,189,248,0.75)" : "rgba(14,116,144,0.75)" }}>© MADE WITH ❤️ BY THK</span>
        <span className="font-cinzel absolute bottom-5 right-6 text-xs tracking-widest pointer-events-none"
          style={{ zIndex: 2, color: dark ? "rgba(56,189,248,0.5)" : "rgba(14,116,144,0.75)" }}>v1.0.0</span>

        {/* Content */}
        <div className="relative flex flex-col items-center text-center px-6" style={{ zIndex: 4 }}>

          {/* Badge */}
          <div className="h-anim-0 flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: dark ? "rgba(56,189,248,0.25)" : "rgba(14,116,144,0.3)",
              background: dark ? "rgba(56,189,248,0.08)" : "rgba(186,230,253,0.5)",
            }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#38bdf8", boxShadow: "0 0 6px #38bdf8", animation: "h-pulse-ring 2s ease-in-out infinite" }} />
            <span className="font-cinzel text-xs tracking-widest" style={{ color: dark ? "rgba(125,211,252,0.96)" : "#0369a1" }}>GEOGRAPHIC CHALLENGE</span>
          </div>

          {/* Globe */}
          <div className="h-anim-1"><GlobeSVG /></div>

          {/* Title */}
          <h1 className="h-anim-2 font-cinzel font-black tracking-[0.18em] leading-none mt-2"
            style={{
              fontSize: "clamp(3rem,9vw,5.5rem)",
              color: dark ? "#f0f9ff" : "#0c4a6e",
              textShadow: dark ? "0 0 60px rgba(56,189,248,0.28), 0 2px 8px rgba(0,0,0,0.9)" : "0 2px 12px rgba(14,116,144,0.15)",
            }}>
            MAPORA
          </h1>

          {/* Subtitle */}
          <p className="h-anim-3 font-crimson italic tracking-wide mt-3"
            style={{ fontSize: "clamp(1rem,2.5vw,1.2rem)", color: dark ? "rgba(147,197,253,0.6)" : "#0369a1" }}>
            Can you find the hidden country?
          </p>

          {/* Divider */}
          <div className="h-anim-3 my-7 h-px w-28"
            style={{ background: dark ? "linear-gradient(90deg,transparent,rgba(56,189,248,0.5),transparent)" : "linear-gradient(90deg,transparent,rgba(14,116,144,0.4),transparent)" }} />

          {/* Buttons */}
          <div className="h-anim-4 flex flex-col items-center gap-3 w-full">
            <button
              onClick={() => navigate("/solo")}
              className="h-btn-play font-cinzel text-sm text-white px-14 py-4 rounded-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "linear-gradient(135deg,#0ea5e9,#0369a1)",
                boxShadow: "0 0 28px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                letterSpacing: "0.18em",
              }}
            >
              ▶ &nbsp; PLAY SOLO
            </button>
            <button disabled className="font-cinzel text-xs px-14 py-3.5 rounded-sm border cursor-not-allowed"
              style={{
                letterSpacing: "0.15em",
                borderColor: dark ? "rgba(100,116,139,0.3)" : "rgba(14,116,144,0.2)",
                color: dark ? "rgba(100,116,139,0.6)" : "rgba(14,116,144,0.80)",
              }}>
              MULTIPLAYER — SOON
            </button>
          </div>

          <p className="h-anim-5 font-cinzel text-xs tracking-[0.2em] uppercase mt-10"
            style={{ color: dark ? "rgba(71,85,105,0.7)" : "rgba(14,116,144,0.75)" }}>
            Guess · Explore · Conquer
          </p>
        </div>
      </div>
    </>
  );
}