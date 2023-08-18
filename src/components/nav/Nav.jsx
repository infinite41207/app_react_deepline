/* eslint-disable jsx-a11y/anchor-is-valid */
import "./nav.css";
import { Link } from "react-router-dom";

/* Icons */
import { FaChevronRight } from "react-icons/fa";
import { RiEarthFill } from "react-icons/ri";

const Nav = ({ transparent }) => {
  /* Navbar Custom BG Color ===== Start ===== */
  var nav_bg_color = "#F5F7FA"; /* Default */

  if (transparent) {
    /* For Transparent */
    nav_bg_color = "#ffffff00";
  }

  const navbgColor = {
    background: `${nav_bg_color}`,
  };
  /* Navbar Custom BG Color ===== End ===== */

  /* Secondary Nav Bar Text Color  ========= Start ========= */
  var secondary_nav_text_color = "#00000A"; /* Default */

  if (transparent) {
    /* For Transparent */
    secondary_nav_text_color = "#ffffff";
  }

  const navtextColor = {
    color: `${secondary_nav_text_color}`,
  };
  /* Secondary Nav Bar Text Color  ========= End ========= */

  /* Primary Nav Bar Text Color ======= Start ====== */
  var primary_nav_text_color = "#000000e6"; /* Default */

  if (transparent) {
    /* For Transparent */
    primary_nav_text_color = "#ffffff";
  }

  const primaryNavtextColor = {
    color: `${primary_nav_text_color}`,
  };
  /* Primary Nav Bar Text Color ======= End ====== */

  return (
    <nav className="navbar navbar-expand-xl navbar-light" style={navbgColor}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={primaryNavtextColor}>
          deepline<span className="text-warning-1">.</span>ai
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ms-xl-5 ms-0 me-auto mb-2 mb-xl-0 secondary_nav">
            <li className="nav-item me-2">
              <Link
                className="nav-link active1"
                style={navtextColor}
                aria-current="page"
                to={process.env.REACT_APP_FRONTEND_BASE_URL}
              >
                Product
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link
                className="nav-link"
                style={navtextColor}
                to={process.env.REACT_APP_FRONTEND_BASE_URL}
              >
                Pricing
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link
                className="nav-link"
                style={navtextColor}
                to={process.env.REACT_APP_FRONTEND_BASE_URL}
              >
                Solutions
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link
                className="nav-link"
                style={navtextColor}
                to={process.env.REACT_APP_FRONTEND_BASE_URL}
              >
                Customers
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link
                className="nav-link"
                style={navtextColor}
                to={process.env.REACT_APP_FRONTEND_BASE_URL}
              >
                Resources
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link
                className="nav-link"
                style={navtextColor}
                to={process.env.REACT_APP_FRONTEND_BASE_URL}
              >
                Partners
              </Link>
            </li>
          </ul>
          <div className="navbar-text">
            <ul className="navbar-nav primary_nav">
              <li className="nav-item me-2">
                <a
                  className="nav-link d-flex align-items-center text-hover-warning-1"
                  href="#"
                >
                  <RiEarthFill
                    className="me-1 text-warning-1"
                    style={{ fontSize: "18px" }}
                  />
                  <div style={primaryNavtextColor}>English</div>
                </a>
              </li>
              <li className="nav-item me-2">
                <Link
                  className="nav-link d-flex align-items-center text-hover-warning-1"
                  style={primaryNavtextColor}
                  to="/login"
                >
                  <div>Log in</div>
                  <FaChevronRight className="ms-1" />
                </Link>
              </li>
              <li className="nav-item me-2">
                <Link
                  className="nav-link btn btn-warning-1 bg-hover-warning-1 d-flex justify-content-center align-items-center px-3 my-xl-0 my-4"
                  target="_blank"
                  to="https://calendly.com/deepline/demo?month=2023-02"
                >
                  <div>Get a Demo</div>
                  <FaChevronRight className="ms-2" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

/* Default Navbar Props Set */
Nav.defaultProps = {
  transparent: false,
};

export default Nav;
