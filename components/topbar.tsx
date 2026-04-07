export function Topbar() {
  return (
    <header className="topbar topbar-compact">
      <div className="topbar-actions topbar-actions-wide">
        <div className="topbar-search">
          <input
            type="search"
            placeholder="Search for reports, items, or orders..."
            aria-label="Search"
          />
        </div>

        <button className="topbar-icon-button" type="button" aria-label="Notifications">
          12
        </button>

        <div className="profile-chip" role="button" tabIndex={0}>
          <div className="profile-avatar">AM</div>
          <div>
            <strong>Akshay</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
