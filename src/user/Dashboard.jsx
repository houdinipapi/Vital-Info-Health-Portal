import InfoCards from "../components/animation/InfoCards";
import MotionWrapper from "../components/animation/Motion";
import InfoGraphs from "../components/dashboard/InfoGraphs";
import StatsBar from "../components/dashboard/StatsBar";
import UserText from "../components/dashboard/UserText";

import "../styles/dashboard/Dashboard.css"

function Dashboard() {

  return (
    <MotionWrapper>
      <main>
          <UserText/>
          <InfoCards/>
          <InfoGraphs/>
          <div className="stats-bar">
            <StatsBar/>
          </div>

      </main>

    </MotionWrapper>
  )
}

export default Dashboard;
