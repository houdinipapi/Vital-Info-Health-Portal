import "../../styles/dashboard/TopBar.css"

function TopBar() {
  return (
    <section>
        <nav className="top-nav-main">
          <div>
            <h3>Dashboard</h3>
          </div>
          <div className="top-left-content">
            <div className="settings-area">
                <div className="settings-icon">⚙️</div>
            </div>
            <div className="notifications-area">
                <div className="notifications-icon">🔔</div>
            </div>
            <div>
              <h4>Ema</h4>
            </div>
          </div>
        </nav>
    </section>

  )
}

export default TopBar;
