//import { useReducer } from "react";
import { NavLink, Outlet } from "react-router-dom"
import backbi from './images/backbi.png';
import chesttri from './images/chesttri.png';
import legs from './images/legs.png';
import shoulders from './images/shoulders.png';



export default function TrackerLayout() {

  

  return (
    <div className="tracker">

      <h2>Track That Shit</h2>
     
      <p>What muscle split are you MAXING-OUT today?</p>

      <nav>
        <NavLink to="backBiceps">
          <img src={backbi} alt="Back and Biceps" />
        </NavLink>
        <NavLink to="chestTriceps">
        <img src={chesttri} alt="Chest and Triceps" />
        </NavLink>
        <NavLink to="legs">
        <img src={legs} alt="Legs" />
        </NavLink>
        <NavLink to="shoulders">
        <img src={shoulders} alt="Shoulders"  />
        </NavLink>
      </nav>

      <Outlet />

    </div>
  )
}
