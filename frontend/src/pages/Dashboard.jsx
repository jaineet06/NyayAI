
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Dashboard = () => {
  const [caseId, setCaseId] = useState(null);
  const [chatKey, setChatKey] = useState(0);

  const handleNewChat = () => {
    setCaseId(null);
    setChatKey((prev) => prev + 1); 
  };

  return (
    <Sidebar onSelectCase={setCaseId} onNewChat={handleNewChat}>
      <Chat key={chatKey} caseId={caseId} setCaseId={setCaseId} />
    </Sidebar>
  );
};

export default Dashboard;