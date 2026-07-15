import React, { useState } from "react";
import api from "../api/api";

function RecommendationPanel() {
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);

    try {
      const prompt = `
You are an AI CRM Assistant.

Provide follow-up recommendations for a Healthcare Professional after a sales interaction.

Return only:

Recommended Actions:
Priority:
Next Follow-up:
Materials to Share:
`;

      const res = await api.post("/ai/recommendation", {
        prompt,
      });

      setRecommendation(res.data.response);
    } catch (err) {
      console.error(err);
      setRecommendation("❌ Unable to generate recommendations.");
    }

    setLoading(false);
  };

  return (
    <div className="panel">
      <h2>🤖 AI Recommendations</h2>

      <button
        onClick={getRecommendation}
        disabled={loading}
        style={{
          width: "100%",
          background: "#2563eb",
          marginBottom: "15px",
        }}
      >
        {loading ? "Generating..." : "✨ Generate Recommendations"}
      </button>

      <div
        style={{
          background: "#f8fafc",
          padding: "15px",
          borderRadius: "10px",
          borderLeft: "5px solid #2563eb",
          whiteSpace: "pre-wrap",
          minHeight: "180px",
        }}
      >
        {recommendation ||
          "Click 'Generate Recommendations' to get AI suggestions."}
      </div>
    </div>
  );
}

export default RecommendationPanel;
