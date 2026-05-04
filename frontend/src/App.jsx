import { useState, useEffect } from "react";
import axios from "axios";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [age, setAge] = useState("");

  // ✅ API URL (CHANGE HERE IF NEEDED)
  const API = import.meta.env.VITE_API_URL || "https://ai-skincare-assistant-1-v6n1.onrender.com";

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  const analyze = async () => {
    if (!input) return;

    try {
      console.log("Sending request to:", API);

      // 🔥 STEP 1: Analyze
      const res = await axios.post(`${API}/analyze`, {
        text: input,
      });

      console.log("ANALYZE RESPONSE:", res.data);

      const structured = res.data;

      // 🔥 STEP 2: Recommend
      const rec = await axios.post(`${API}/recommend`, structured);

      console.log("RECOMMEND RESPONSE:", rec.data);

      // 🔥 STEP 3: Display result
      setMessages((prev) => [
        ...prev,
        { role: "user", text: input },
        {
          role: "bot",
          data: rec.data,
        },
      ]);

      setInput("");

    } catch (error) {
      console.error("ERROR:", error);

      setMessages((prev) => [
        ...prev,
        { role: "user", text: input },
        {
          role: "bot",
          data: {
            sunscreen: "Error fetching recommendation",
            spf: "Check backend connection",
            ingredients: ["API issue"],
            routine: ["Fix API URL / CORS"],
          },
        },
      ]);
    }
  };

  // 🔥 SPLASH SCREEN
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center bg-black">
        <div className="text-6xl font-bold text-purple-400 animate-pulse">
          CASPIAN
        </div>
        <p className="mt-4 text-gray-300 tracking-wide">
          AI Skincare Intelligence
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-black text-white">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-purple-700 opacity-30 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-6 z-10">
        Caspian AI
      </h1>

      {/* AGE INPUT */}
      <input
        type="number"
        placeholder="Enter your age"
        className="mb-4 p-3 rounded bg-black/60 border border-purple-500 w-full max-w-md z-10"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      {/* CHAT BOX */}
      <div className="w-full max-w-md h-[320px] overflow-y-auto bg-black/40 backdrop-blur-md p-4 rounded-xl border border-purple-500/40 mb-4 z-10 shadow-lg">

        {messages.map((msg, i) => (
          <div key={i} className="mb-4">

            {/* USER */}
            {msg.role === "user" && (
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg text-right shadow">
                {msg.text}
              </div>
            )}

            {/* BOT */}
            {msg.role === "bot" && (
              <div className="bg-[#1a1a2e] text-gray-200 p-4 rounded-xl shadow border border-purple-500/20">

                <div className="text-sm text-purple-400 mb-2 font-semibold">
                  Recommendation
                </div>

                <p>
                  <span className="font-bold text-white">Sunscreen:</span>{" "}
                  {msg.data.sunscreen}
                </p>

                <p>
                  <span className="font-bold text-white">SPF:</span>{" "}
                  {msg.data.spf}
                </p>

                <p>
                  <span className="font-bold text-white">Ingredients:</span>{" "}
                  {msg.data.ingredients.join(", ")}
                </p>

                <p>
                  <span className="font-bold text-white">Routine:</span>{" "}
                  {msg.data.routine.join(" → ")}
                </p>

              </div>
            )}

          </div>
        ))}

      </div>

      {/* INPUT */}
      <div className="flex w-full max-w-md z-10">
        <input
          type="text"
          placeholder="Describe your skin (oily, acne, sun exposure...)"
          className="flex-1 p-3 rounded-l bg-black/70 border border-purple-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={analyze}
          className="px-5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-r hover:scale-105 transition-transform"
        >
          ➤
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-4 z-10">
        This is not medical advice.
      </p>
    </div>
  );
}