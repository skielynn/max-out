import { Outlet, NavLink } from "react-router-dom";
import logo from './logo.png';


export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>
          <img src={logo} alt="Logo" />
          </h1>
          <NavLink to="/">LOG-IN</NavLink>
          <NavLink to="tracker">TRACKER</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}