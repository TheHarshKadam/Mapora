import { useEffect, useState } from "react";
import { startGameAPI, makeGuessAPI } from "../services/api";
import GuessInput from "../components/GuessInput.jsx";
import StatsModal from "../components/StatsModal.jsx";
import { useNavigate } from "react-router-dom";
import { revealAnswerAPI } from "../services/api";

function SoloGame() {
  const [guesses, setGuesses] = useState([]);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    startGameAPI();
  }, []);

  const handleGuess = async (country) => {
    try {
      const res = await makeGuessAPI(country);

      setResult(res.data);

      // ✅ USE BACKEND GUESSES (NOT LOCAL)
      setGuesses(res.data.guesses);

      if (res.data.gameOver) {
        setStats(res.data.stats);
      }
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleReveal = async () => {
    try {
      const res = await revealAnswerAPI();

      setGuesses(res.data.guesses);
      setStats(res.data.stats);

      // Show result like a correct guess
      setResult({
        correct: true,
        isRevealed: true,
        answer: res.data.answer,
      });

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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-200 to-green-200 p-6">

      <h1 className="text-3xl font-bold mb-4">🌍 Mapora</h1>

      <GuessInput onGuess={handleGuess} />

      <button
        onClick={handleReveal}
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Reveal Answer
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-4 bg-white p-4 rounded-xl shadow text-center w-80">
          <p className="font-semibold">Distance: {result.distance} km</p>

          <p className="text-lg">
            {result.warmth === "warmer" ? "🔥 Warmer" : "❄️ Colder"}
          </p>

          {result.isAdjacent && (
            <p className="text-red-500 font-bold">
              🔥 Adjacent Country!
            </p>
          )}
          {result?.isRevealed && (
            <p className="text-red-600 font-bold mt-2">
              Answer: {result.answer}
            </p>
          )}
        </div>

      )}

      {/* GUESSES */}
      <div className="mt-6 w-full max-w-md">
        {guesses.map((g, i) => (
          <div
            key={i}
            className="flex justify-between p-3 mb-2 rounded-lg shadow text-black"
            style={{ backgroundColor: g.color }} // ✅ backend color
          >
            <span>{g.name}</span>
            <span>{g.distance} km</span>
          </div>
        ))}
      </div>

      {/* STATS */}
      {stats && (
        <StatsModal
          stats={stats}
          onReplay={handleReplay}
          onExit={() => navigate("/")}
        />
      )}
    </div>
  );
}

export default SoloGame;