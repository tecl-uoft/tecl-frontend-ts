import React, { useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [hidden, setHidden] = useState(false);
  let location = useLocation();

  // disable header for all games
  useLayoutEffect(() => {
    if (location.pathname.endsWith("/game")) {
      setHidden(true);
    } else if (hidden !== false) {
      setHidden(false);
    }
  }, [location.pathname, hidden]);

  return (
    <nav className={`bg-gray-800 ${hidden ? "hidden" : ""}`}>
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link className="font-bold text-2xl lg:text-4xl" to="/">
          <img
            className="h-8 lg:h-16"
            src={process.env.PUBLIC_URL + "assets/tecl-logo-full.png"}
            alt="tecl logo"
          />
        </Link>
        <MobileNavPanel />
        <NavPanel />
      </div>
    </nav>
  );
}

function MobileNavPanel() {
  return (
    <div className="block lg:hidden">
      <button className="flex items-center px-3 py-2 border rounded text-gray-500 
      border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
  );
}

function NavPanel() {
  return (
    <div className="hidden lg:block">
      <ul className="text-white inline-flex">
        <li>
          <Link className="px-4 font-bold text-orange-500" to="/">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
