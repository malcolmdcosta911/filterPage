import { ListCollapse } from "lucide-react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// import { useState } from "react";

const NavBar = () => {
  // const [navColor, setNavColor] = useState<"blue" | "pink">("blue");
  const [show, setShow] = useState(false);

  return (
    <nav className="navbar navbar-fixed">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Website
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          // data-bs-toggle="collapse"
          // data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow((show) => !show)}
        >
          <ListCollapse />
        </button>
        <div
          className={show ? "collapse  navbar-collapse" : "collapse"}
         // style={{ display: show ? "block" : "none" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <NavLink
                to="/"
                className="nav-link dropdown-toggle"
                aria-expanded="false"
              >
                Men
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item">T-shirts</li>
                <li className="dropdown-item">Footwear</li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                to="/"
                className="nav-link dropdown-toggle"
                aria-expanded="false"
              >
                Women
              </NavLink>

              <ul className="dropdown-menu">
                <li className="dropdown-item">Kurtas</li>
                <li className="dropdown-item">Watches</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
