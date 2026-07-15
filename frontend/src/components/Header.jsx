import { useState, useEffect } from "react";

function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#2563eb 0%,#1d4ed8 45%,#172554 100%)",
        color: "white",
        borderRadius: "22px",
        padding: "32px",
        marginBottom: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 15px 40px rgba(37,99,235,.35)",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "48px",
            fontWeight: "800",
          }}
        >
          🏥 AI CRM HCP Module
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "20px",
            opacity: ".95",
          }}
        >
          AI-Powered Healthcare Professional Relationship Management
        </p>

        <p
          style={{
            marginTop: "18px",
            opacity: ".8",
            fontSize: "16px",
          }}
        >
          {time}
        </p>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,.12)",
          padding: "25px",
          borderRadius: "20px",
          textAlign: "center",
          minWidth: "270px",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>🤖 AI Assistant</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#4ade80",
              }}
            >
              98%
            </h1>

            <small>Accuracy</small>
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                color: "#facc15",
              }}
            >
              24/7
            </h1>

            <small>Available</small>
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                color: "#38bdf8",
              }}
            >
              AI
            </h1>

            <small>Powered</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
