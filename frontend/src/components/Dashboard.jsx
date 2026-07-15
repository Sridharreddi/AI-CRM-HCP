import { useState } from "react";

import Header from "./Header";
import StatsCards from "./StatsCards";
import SearchBar from "./SearchBar";
import InteractionForm from "./InteractionForm";
import ChatAssistant from "./ChatAssistant";
import Timeline from "./Timeline";
import Analytics from "./Analytics";
import FollowUp from "./FollowUp";
import RecommendationPanel from "./RecommendationPanel";
import "./styles.css";

function Dashboard() {
  const [selectedInteraction, setSelectedInteraction] = useState(null);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <h2>🏥 AI CRM</h2>
          <p className="logo-subtitle">Healthcare Intelligence</p>
        </div>

        <ul className="menu">
          <li className="active">🏠 Dashboard</li>
          <li>👨‍⚕️ HCP Directory</li>
          <li>📝 Log Interaction</li>
          <li>📋 Interaction History</li>
          <li>📅 Follow-ups</li>
          <li>🤖 AI Assistant</li>
          <li>📊 Analytics</li>
          <li>📈 Reports</li>
          <li>⚙️ Settings</li>
        </ul>

        <div className="sidebar-footer">
          <small>AI CRM HCP v1.0</small>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <Header />

        <StatsCards />

        <SearchBar />

        <div className="content">
          <div className="left-panel">
            <InteractionForm
              selectedInteraction={selectedInteraction}
              clearSelection={() => setSelectedInteraction(null)}
            />

            <Timeline onEdit={setSelectedInteraction} />

            <Analytics />
          </div>

          <div className="right-panel">
            <ChatAssistant />

            <FollowUp />

            <RecommendationPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
