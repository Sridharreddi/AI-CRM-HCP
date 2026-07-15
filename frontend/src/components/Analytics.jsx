function Analytics() {
  return (
    <div className="panel">
      <h2>📊 Analytics Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div className="chart-card">
          <h3>Weekly Visits</h3>

          <div className="fake-chart blue">
            <div style={{ height: "40%" }}></div>
            <div style={{ height: "70%" }}></div>
            <div style={{ height: "55%" }}></div>
            <div style={{ height: "85%" }}></div>
            <div style={{ height: "65%" }}></div>
            <div style={{ height: "95%" }}></div>
            <div style={{ height: "75%" }}></div>
          </div>
        </div>

        <div className="chart-card">
          <h3>AI Accuracy</h3>

          <div className="circle-chart">
            <div className="circle">
              <h1>98%</h1>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Interactions</h3>

          <div className="fake-chart green">
            <div style={{ height: "30%" }}></div>
            <div style={{ height: "55%" }}></div>
            <div style={{ height: "65%" }}></div>
            <div style={{ height: "80%" }}></div>
            <div style={{ height: "60%" }}></div>
            <div style={{ height: "95%" }}></div>
            <div style={{ height: "90%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
