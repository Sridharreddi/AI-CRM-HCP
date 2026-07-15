import { useState } from "react";
import api from "../api/api";

function ChatAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(
    "👋 Hello! Ask me about HCP interactions, follow-ups, summaries, or recommendations.",
  );
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) {
      alert("Enter your question");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/ai/chat", {
        prompt: prompt,
      });

      setResponse(res.data.response);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.message);

      alert(err.response?.data?.detail || err.message || "Unknown Error");

      setResponse("❌ AI Server Error");
    }
    setLoading(false);
  };

  return (
    <div className="panel">
      <h2>🤖 AI CRM Assistant</h2>

      <textarea
        rows={7}
        placeholder="Ask AI anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={askAI}
        style={{
          marginTop: "15px",
          width: "100%",
          background: "#16a34a",
        }}
      >
        {loading ? "Thinking..." : "🚀 Send to AI"}
      </button>

      <div
        style={{
          marginTop: "20px",
          background: "#f1f5f9",
          padding: "15px",
          borderRadius: "12px",
          minHeight: "120px",
          whiteSpace: "pre-wrap",
        }}
      >
        {response}
      </div>
    </div>
  );
}

export default ChatAssistant;
