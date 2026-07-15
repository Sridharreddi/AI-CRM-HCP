import { useEffect, useState } from "react";
import api from "../api/api";

function Timeline({ onEdit }) {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    loadInteractions();
  }, []);

  const loadInteractions = async () => {
    try {
      const res = await api.get("/interactions/");
      setInteractions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const editInteraction = (item) => {
    onEdit(item);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteInteraction = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interaction?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/interactions/${id}`);
      alert("✅ Interaction Deleted");
      loadInteractions();
    } catch (err) {
      console.error(err);
      alert("❌ Delete Failed");
    }
  };

  return (
    <div className="panel">
      <h2>📋 Interaction Timeline</h2>

      {interactions.length === 0 ? (
        <p>No interactions found.</p>
      ) : (
        interactions.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#f8fafc",
              marginTop: "15px",
              padding: "18px",
              borderRadius: "12px",
              borderLeft: "5px solid #2563eb",
            }}
          >
            <h3>{item.hcp_name}</h3>

            <p>
              <b>Hospital:</b> {item.hospital}
            </p>

            <p>
              <b>Specialty:</b> {item.specialty}
            </p>

            <p>
              <b>Notes:</b> {item.notes}
            </p>

            <p>
              <b>Outcome:</b> {item.outcome}
            </p>

            <p>
              <b>Follow-up:</b> {item.follow_up}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() => editInteraction(item)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ✏ Edit
              </button>

              <button
                onClick={() => deleteInteraction(item.id)}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Timeline;
