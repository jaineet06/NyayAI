
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Dashboard = () => {
  const [caseId, setCaseId] = useState(null);

  return (
    <Sidebar>
      <Chat caseId={caseId} setCaseId={setCaseId} />
    </Sidebar>
  );
};

export default Dashboard;