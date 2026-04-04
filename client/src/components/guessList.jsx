function GuessList({ guesses }) {
  return (
    <div className="mt-4 w-full max-w-md">
      {guesses.map((g, i) => (
        <div
          key={i}
          className="flex justify-between p-2 border-b"
        >
          <span>{g.name}</span>
          <span>{g.distance} km</span>
        </div>
      ))}
    </div>
  );
}

export default GuessList;