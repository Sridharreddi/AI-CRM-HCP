import React, { useState, useEffect } from "react";
import api from "../api/api";

function InteractionForm({ selectedInteraction, clearSelection }) {
  const [form, setForm] = useState({
    hcpName: "",
    hospital: "",
    specialty: "",
    visitType: "",
    priority: "Medium",
    outcome: "",
    followUp: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (selectedInteraction) {
      setForm({
        hcpName: selectedInteraction.hcp_name,
        hospital: selectedInteraction.hospital,
        specialty: selectedInteraction.specialty,
        visitType: "",
        priority: "Medium",
        outcome: selectedInteraction.outcome,
        followUp: selectedInteraction.follow_up,
        notes: selectedInteraction.notes,
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedInteraction]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      hcpName: "",
      hospital: "",
      specialty: "",
      visitType: "",
      priority: "Medium",
      outcome: "",
      followUp: "",
      notes: "",
    });
  };

  const handleSubmit = async () => {
    if (
      !form.hcpName ||
      !form.hospital ||
      !form.specialty ||
      !form.notes ||
      !form.outcome ||
      !form.followUp
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        hcp_name: form.hcpName,
        hospital: form.hospital,
        specialty: form.specialty,
        notes: form.notes,
        outcome: form.outcome,
        follow_up: form.followUp,
      };

      if (selectedInteraction) {
        await api.put(`/interactions/edit/${selectedInteraction.id}`, payload);

        alert("✅ Interaction Updated Successfully");

        clearSelection();
      } else {
        await api.post("/interactions/", payload);

        alert("✅ Interaction Saved Successfully");
      }

      resetForm();

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("❌ Error saving interaction");
    }

    setLoading(false);
  };

  const handleAISummary = async () => {
    if (!form.notes.trim()) {
      alert("Please enter interaction notes first.");
      return;
    }

    setAiLoading(true);

    try {
      const prompt = `
You are an AI CRM Assistant.

Summarize the following HCP interaction.

Return only:

Summary:
Outcome:
Recommended Follow-up:

Interaction Notes:
${form.notes}
`;

      const res = await api.post("/ai/summary", {
        prompt,
      });

      alert(res.data.response);
    } catch (err) {
      console.error(err);
      alert("AI Summary Failed");
    }

    setAiLoading(false);
  };

  return (
    <div className="panel">
      <h2>📝 Log HCP Interaction</h2>

      <input
        name="hcpName"
        placeholder="Healthcare Professional Name"
        value={form.hcpName}
        onChange={handleChange}
      />

      <input
        name="hospital"
        placeholder="Hospital / Clinic"
        value={form.hospital}
        onChange={handleChange}
      />

      <input
        name="specialty"
        placeholder="Specialty (Cardiology, Oncology...)"
        value={form.specialty}
        onChange={handleChange}
      />

      <select name="visitType" value={form.visitType} onChange={handleChange}>
        <option value="">Visit Type</option>
        <option>In Person</option>
        <option>Video Call</option>
        <option>Phone Call</option>
        <option>Email</option>
      </select>

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>

      <textarea
        rows="6"
        name="notes"
        placeholder="Interaction Notes"
        value={form.notes}
        onChange={handleChange}
      />

      <select name="outcome" value={form.outcome} onChange={handleChange}>
        <option value="">Outcome</option>
        <option>Positive</option>
        <option>Neutral</option>
        <option>Negative</option>
      </select>

      <label style={{ fontWeight: "bold" }}>Follow-up Date</label>

      <input
        type="date"
        name="followUp"
        value={form.followUp}
        onChange={handleChange}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleAISummary}
          disabled={aiLoading}
          style={{
            background: "#2563eb",
            flex: 1,
            opacity: aiLoading ? 0.7 : 1,
          }}
        >
          {aiLoading ? "Summarizing..." : "🤖 AI Summarize"}
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: "#16a34a",
            flex: 1,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Saving..."
            : selectedInteraction
              ? "💾 Update Interaction"
              : "💾 Save Interaction"}
        </button>
      </div>
    </div>
  );
}

export default InteractionForm;
