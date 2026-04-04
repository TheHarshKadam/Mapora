function StatsModal({ stats, onReplay, onExit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 You Won!</h2>

        <p>Time: {stats.timeTaken}s</p>
        <p>Guesses: {stats.totalGuesses}</p>

        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={onReplay}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Play Again
          </button>

          <button
            onClick={onExit}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Exit
          </button>
          {stats?.revealed && (
            <p className="text-red-500">You revealed the answer</p>
          )}
          <button disabled={stats}></button>
        </div>
      </div>
    </div>
  );
}

export default StatsModal;