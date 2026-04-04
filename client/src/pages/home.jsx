import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-green-300">
      <h1 className="text-6xl font-bold mb-10">🌍 Mapora</h1>

      <button
        onClick={() => navigate("/solo")}
        className="px-8 py-4 bg-blue-600 text-white rounded-xl text-xl shadow-lg hover:scale-105 transition"
      >
        Play Solo
      </button>

      <button className="mt-4 px-8 py-4 bg-gray-500 text-white rounded-xl text-xl opacity-70">
        Multiplayer (Coming Soon)
      </button>
    </div>
  );
}

export default Home;