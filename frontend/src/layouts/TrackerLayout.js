import { NavLink, Outlet } from "react-router-dom"

export default function TrackerLayout() {
  return (
    <div className="tracker">

      <h2>Track That Shit</h2>
      <p>What muscle split are you MAXING-OUT today?</p>

      <nav>
        <NavLink to="backBiceps">Back and Biceps</NavLink>
        <NavLink to="chestTriceps">Chest and Triceps</NavLink>
        <NavLink to="legs">Legs</NavLink>
        <NavLink to="shoulders">Shoulders</NavLink>
      </nav>

      <Outlet />

    </div>
  )
}