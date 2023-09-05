import { Outlet } from "react-router-dom";
import Navbar from "./_components/Header";


export default function HomeTemplate() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
