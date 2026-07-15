import { useState } from "react";
import api from "../api/api";

function FollowUp() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const generateFollowUp = async () => {
    setLoading(true);

    try {
      const prompt = `
You are an AI Healthcare CRM Assistant.

Generate professional follow-up recommendations.

Return exactly in this format.

Priority:
Next Follow-up Date:
Recommended Action:
Documents to Share:
Communication Channel:
Reason:
`;

      const res = await api.post("/ai/followup", {
        prompt,
      });

      setResponse(res.data.response);
    } catch (err) {
      console.log(err);
      setResponse("Unable to generate follow-up.");
    }

    setLoading(false);
  };

  return (
    <div className="panel">
      <h2>📅 AI Follow-up Planner</h2>

      <button
        onClick={generateFollowUp}
        style={{
          width: "100%",
          background: "#7c3aed",
          color: "white",
          padding: "12px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "✨ Generate Follow-up"}
      </button>

      <div
        style={{
          marginTop: "15px",
          padding: "15px",
          background: "#f8fafc",
          borderRadius: "12px",
          borderLeft: "5px solid #7c3aed",
          whiteSpace: "pre-wrap",
          minHeight: "180px",
        }}
      >
        {response || "AI follow-up suggestions will appear here."}
      </div>
    </div>
  );
}

export default FollowUp;
