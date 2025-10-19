import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zinc-900  shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo / Brand */}
      <Link
        to="/"
        className="text-2xl font-bold text-white"
      >
        CricMate
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-white ${
              isActive ? "text-white" : "text-gray-300"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/matches"
          className={({ isActive }) =>
            `hover:text-white ${
              isActive ? "text-white" : "text-gray-300"
            }`
          }
        >
          Matches
        </NavLink>

        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `hover:text-white ${
              isActive ? "text-white" : "text-gray-300"
            }`
          }
        >
          Teams
        </NavLink>

        <NavLink
          to="/players"
          className={({ isActive }) =>
            `hover:text-white ${
              isActive ? "text-white" : "text-gray-300"
            }`
          }
        >
          Players
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
