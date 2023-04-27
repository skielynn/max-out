import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>MAX-OUT</h1>
          <NavLink to="/">Login</NavLink>
          <NavLink to="main">Main</NavLink>
          <NavLink to="tracker">Tracker</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}