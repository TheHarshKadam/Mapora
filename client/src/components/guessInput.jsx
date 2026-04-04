import { useState } from "react";

function GuessInput({ onGuess }) {
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country) return;
    onGuess(country);
    setCountry("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country..."
        className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Guess
      </button>
    </form>
  );
}

export default GuessInput;