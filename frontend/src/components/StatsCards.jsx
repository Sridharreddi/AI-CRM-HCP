import { useEffect, useState } from "react";

function StatsCards() {
  const [stats, setStats] = useState({
    interactions: 0,
    hcps: 146,
    ai: 98,
    followups: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/interactions/");
        const data = await res.json();

        setStats({
          interactions: data.length,
          hcps: data.length,
          ai: 98,
          followups: Math.floor(data.length / 2),
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: "Interactions",
      value: stats.interactions,
      color: "#2563eb",
      icon: "📝",
    },
    {
      title: "HCPs",
      value: stats.hcps,
      color: "#16a34a",
      icon: "👨‍⚕️",
    },
    {
      title: "AI Accuracy",
      value: stats.ai + "%",
      color: "#9333ea",
      icon: "🤖",
    },
    {
      title: "Follow-ups",
      value: stats.followups,
      color: "#ea580c",
      icon: "📅",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "25px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            transition: ".3s",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  color: "#666",
                  marginBottom: "12px",
                  fontWeight: "600",
                }}
              >
                {card.title}
              </p>

              <h1
                style={{
                  color: card.color,
                  margin: 0,
                  fontSize: "42px",
                }}
              >
                {card.value}
              </h1>
            </div>

            <div
              style={{
                fontSize: "48px",
              }}
            >
              {card.icon}
            </div>
          </div>

          <div
            style={{
              marginTop: "18px",
              height: "8px",
              background: "#e5e7eb",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                width: "80%",
                height: "100%",
                background: card.color,
                borderRadius: "20px",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
