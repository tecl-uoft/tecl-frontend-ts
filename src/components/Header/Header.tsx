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

  const [selected, setSelected] = useState("Home" as NavOptions);

  useLayoutEffect(() => {
    if (location.pathname.endsWith("/")) {
      setSelected("Home");
    } else if (location.pathname.endsWith("/login")) {
      setSelected("Login");
    } else if (location.pathname.endsWith("/scheduling")) {
      setSelected("Schedule");
    } else {
      setSelected("");
    }
  }, [location.pathname, hidden]);

  return (
    <header className={`bg-gray-800 ${hidden ? "hidden" : ""}`}>
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link className="font-bold text-2xl lg:text-4xl" to="/">
          <img
            className="h-8 lg:h-16"
            src={process.env.PUBLIC_URL + "/assets/tecl-logo-full.png"}
            alt="tecl logo"
          />
        </Link>
        <MobileNavPanel />
        <NavPanel selected={selected} />
      </div>
    </header>
  );
}

function MobileNavPanel() {
  return (
    <nav className="block lg:hidden">
      <button
        className="flex items-center px-3 py-2 border rounded text-gray-500 
      border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
      >
        <svg
          className="fill-current h-3 w-3"
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

type NavOptions = "Home" | "Login" | "Schedule" | "";

interface INavPanel {
  selected: NavOptions;
}

interface IPanelOptions {
  link: string;
  text: NavOptions;
}

function NavPanel(props: INavPanel) {
  const { selected } = props;

  const panelOptions: IPanelOptions[] = [
    {
      link: "/",
      text: "Home",
    },
    {
      link: "/login",
      text: "Login",
    },
    {
      link: "/scheduling",
      text: "Schedule",
    },
  ];
  return (
    <nav className="hidden lg:block">
      <ol className="text-white inline-flex">
        {panelOptions.map((option, idx) => (
          <Link
            className={`px-4 font-bold ${
              option.text === selected ? " text-orange-500" : ""
            } `}
            key={idx}
            to={option.link}
          >
            <li >{option.text}</li>
          </Link>
        ))}
      </ol>
    </nav>
  );
}

export default Header;
