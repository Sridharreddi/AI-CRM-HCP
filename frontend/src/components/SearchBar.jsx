import { useState } from "react";
import api from "../api/api";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) {
      alert("Enter search text");
      return;
    }

    setLoading(true);

    try {
      const res = await api.get(`/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.log(err);
      alert("Search Failed");
    }

    setLoading(false);
  };

  return (
    <div className="panel">
      <h2>🔍 AI Smart Search</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <input
          style={{ flex: 1 }}
          placeholder="Doctor, Hospital or Specialty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={search}>{loading ? "Searching..." : "Search"}</button>
      </div>

      {results.length === 0 ? (
        <p>No Results</p>
      ) : (
        results.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#f8fafc",
              padding: "15px",
              marginBottom: "15px",
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
              <b>Outcome:</b> {item.outcome}
            </p>

            <p>{item.notes}</p>

            <button
              style={{
                marginTop: "10px",
                background: "#16a34a",
              }}
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchBar;
