import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className=" bg-neutral-800 w-screen shadow-md p-5 flex justify-between items-center">
      {/* Logo / Brand */}
      <Link to="/" className="">
        <div className="text-3xl font-bold text-white">Cricmate</div>
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-white ${isActive ? "text-white" : "text-gray-300"}`
          }
        >
          <div className="text-xl font-bold text-white">Home</div>
        </NavLink>

        <NavLink
          to="/matches"
          className={({ isActive }) =>
            `hover:text-white ${isActive ? "text-white" : "text-gray-300"}`
          }
        >
          <div className="text-xl font-bold text-white">Matches</div>
        </NavLink>

        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `hover:text-white ${isActive ? "text-white" : "text-gray-300"}`
          }
        >
          <div className="text-xl font-bold text-white">Teams</div>
        </NavLink>

        <NavLink
          to="/players"
          className={({ isActive }) =>
            `hover:text-white ${isActive ? "text-white" : "text-gray-300"}`
          }
        >
          <div className="text-xl font-bold text-white">Players</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
