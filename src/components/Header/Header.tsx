import React, { useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const [hidden, setHidden] = useState(false);
  const auth = useAuth();
  let location = useLocation();

  // disable header for all games
  useLayoutEffect(() => {
    if (location.pathname.endsWith("/game")) {
      setHidden(true);
    } else if (hidden !== false) {
      setHidden(false);
    }
  }, [location.pathname, hidden]);

  const [selected, setSelected] = useState("Home" as NavOptions);

  useLayoutEffect(() => {
    if (location.pathname.endsWith("/")) {
      setSelected("Home");
    } else if (location.pathname.endsWith("/login")) {
      setSelected("Login");
    } else if (location.pathname.endsWith("/scheduling")) {
      setSelected("Schedule");
    } else if (location.pathname.endsWith("/dashboard")) {
      setSelected("Dashboard");
    }  else {
      setSelected("");
    }
  }, [location.pathname, hidden]);

  return (
    <header className={`bg-gray-800 ${hidden ? "hidden" : ""}`}>
      <div className="container flex items-center justify-between px-6 py-2 mx-auto">
        <Link className="text-2xl font-bold lg:text-4xl" to="/">
          <img
            className="h-8 lg:h-16"
            src={process.env.PUBLIC_URL + "/assets/tecl-logo-full.png"}
            alt="tecl logo"
          />
        </Link>
        <MobileNavPanel />
        <NavPanel
          selected={selected}
          isLoggedIn={auth?.authState.isAuthenticated}
          logout={auth?.logout}
        />
      </div>
    </header>
  );
}

function MobileNavPanel() {
  return (
    <nav className="block lg:hidden">
      <button
        className="flex items-center px-3 py-2 text-gray-500 border border-gray-600 rounded appearance-none hover:text-gray-800 hover:border-teal-500 focus:outline-none"
      >
        <svg
          className="w-3 h-3 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </nav>
  );
}

type NavOptions = "Home" | "Login" | "Schedule" | "Dashboard" | "";

interface INavPanel {
  selected: NavOptions;
  isLoggedIn: boolean | undefined;
  logout: undefined | (() => void)
}

interface IPanelOptions {
  link: string;
  text: NavOptions;
}

function NavPanel(props: INavPanel) {
  const { selected, isLoggedIn, logout } = props;
  const auth = useAuth();

  const panelOptions: IPanelOptions[] = [
    {
      link: "/",
      text: "Home",
    },
    {
      link: "/scheduling",
      text: "Schedule",
    },
    {
      link: "/login",
      text: "Login",
    },
  ];
  
  if (auth?.authState.isAuthenticated) {
    panelOptions.push({
      link: "/dashboard",
      text: "Dashboard"
    })
  }

  return (
    <nav className="hidden lg:block">
      <ol className="inline-flex text-white">
        {panelOptions.map((option, idx) =>
          isLoggedIn && option.text === "Login" ? (
            <button
              className={`px-4 font-bold ${
                option.text === selected ? " text-orange-500" : ""
              }`}
              key={idx}
              onClick={ () => logout ? logout() : null }
            >
              <li>Logout</li>
            </button>
          ) : (
            <Link
              className={`px-4 font-bold ${
                option.text === selected ? " text-orange-500" : ""
              } `}
              key={idx}
              to={option.link}
            >
              <li>{option.text}</li>
            </Link>
          )
        )}
      </ol>
    </nav>
  );
}

export default Header;
