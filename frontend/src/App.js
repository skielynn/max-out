import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

// components
import Login from './Components/Login'
//import Main from './Components/Main'
import BackBiceps from './Components/Tracker/BackBiceps'
import ChestTriceps from './Components/Tracker/ChestTriceps'
import Legs from './Components/Tracker/Legs'
import Shoulders from './Components/Tracker/Shoulders'

// layouts
import RootLayout from './layouts/RootLayout'
import TrackerLayout from './layouts/TrackerLayout'



const router = createBrowserRouter(
  createRoutesFromElements(
 
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Login />} />
      <Route path="tracker" element={<TrackerLayout />}>
        <Route path="backBiceps" element={<BackBiceps />} />
        <Route path="chestTriceps" element={<ChestTriceps />} />
        <Route path="legs" element={<Legs />} />
        <Route path="shoulders" element={<Shoulders />} />
      </Route>
    </Route>
  )
)

function App() {
  return (
 
    <RouterProvider router={router} />
  );
}

export default App