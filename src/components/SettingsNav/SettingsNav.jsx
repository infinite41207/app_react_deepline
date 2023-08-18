import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight, FaArrowLeft } from "react-icons/fa";
import "./SettingsNav.scss";

import MenuIcon from "../../icons/MenuIcon";
import ChatIcon from "../../icons/ChatIcon";
import CloseMenuIcon from "../../icons/CloseMenuIcon";
import TemplateSmIcon from "../../icons/TemplateSmIcon";

export default function SettingsNav() {
  const location = useLocation();
  const navbarRef = useRef();
  const logoRef1 = useRef();
  const toggleBtnRef = useRef();
  const [isMenuIconShow, setIsMenuIconShow] = useState(true);
  const handleToggleMenu = (e) => {
    navbarRef.current.classList.toggle("collapsed");
    logoRef1.current.classList.toggle("opacity-0");
    e.currentTarget.classList.toggle("toggle");
    setIsMenuIconShow(!isMenuIconShow);
  };

  return (
    <div className="settings-nav">
      <div className="nav-menu" ref={navbarRef}>
        <a className="navbar-brand" href="/" style={{ fontSize: "19px" }}>
          deepline<span className="text-warning-1">.</span>ai
        </a>
        <div className="nav-items mt-3">
          <div className="nav-item">
            <div className="d-flex item-title d-flex align-items-center gap-2">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.99999 13.8527C10.4793 13.8527 13.3 11.0321 13.3 7.55272C13.3 4.07338 10.4793 1.25273 6.99999 1.25273C3.52064 1.25273 0.699999 4.07338 0.699999 7.55272C0.699999 11.0321 3.52064 13.8527 6.99999 13.8527ZM6.99999 14.5527C10.8661 14.5527 14 11.4188 14 7.55272C14 3.68663 10.8661 0.552734 6.99999 0.552734C3.13389 0.552734 0 3.68663 0 7.55272C0 11.4188 3.13389 14.5527 6.99999 14.5527Z"
                  fill="#500AD2"
                />
                <path
                  d="M2.7998 11.6235C2.7998 11.262 3.07 10.9564 3.4298 10.9165C6.13005 10.6176 7.88179 10.6446 10.5761 10.9232C10.7106 10.9373 10.8382 10.9903 10.9431 11.0757C11.048 11.1611 11.1258 11.2753 11.1669 11.4041C11.208 11.533 11.2107 11.6711 11.1747 11.8015C11.1386 11.9319 11.0654 12.0489 10.9639 12.1384C7.78415 14.91 5.96695 14.8719 3.0238 12.1412C2.8803 12.0082 2.7998 11.8188 2.7998 11.6235Z"
                  fill="#500AD2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5404 11.2707C7.86749 10.9942 6.14094 10.9683 3.46835 11.264C3.38037 11.2743 3.29927 11.3166 3.24057 11.3829C3.18186 11.4493 3.14969 11.5349 3.1502 11.6235C3.1502 11.7236 3.19185 11.8184 3.2622 11.8842C4.72099 13.2373 5.82629 13.8488 6.90674 13.8526C7.99104 13.8565 9.15583 13.2499 10.7343 11.8744C10.7845 11.8298 10.8206 11.7716 10.8382 11.7068C10.8559 11.642 10.8544 11.5735 10.8338 11.5096C10.8133 11.4457 10.7746 11.3891 10.7226 11.3468C10.6705 11.3044 10.6072 11.2777 10.5404 11.2707ZM3.3917 10.5682C6.12029 10.2662 7.89759 10.2935 10.6129 10.5745C10.8153 10.5957 11.0071 10.6753 11.165 10.8038C11.3228 10.9323 11.4397 11.104 11.5014 11.2979C11.5632 11.4919 11.567 11.6996 11.5125 11.8956C11.458 12.0917 11.3475 12.2676 11.1946 12.4019C9.59333 13.7977 8.25984 14.5579 6.90464 14.5526C5.54559 14.5477 4.27089 13.7746 2.78655 12.3973C2.68027 12.2983 2.59555 12.1785 2.53768 12.0453C2.4798 11.9121 2.45002 11.7684 2.4502 11.6231C2.44969 11.3622 2.54547 11.1102 2.71919 10.9155C2.89292 10.7208 3.13238 10.5974 3.3917 10.5682Z"
                  fill="#500AD2"
                />
                <path
                  d="M9.80018 6.15253C9.80018 6.89514 9.50519 7.60733 8.98009 8.13243C8.45498 8.65753 7.74279 8.95253 7.00019 8.95253C6.25759 8.95253 5.5454 8.65753 5.02029 8.13243C4.49519 7.60733 4.2002 6.89514 4.2002 6.15253C4.2002 5.40993 4.49519 4.69774 5.02029 4.17264C5.5454 3.64754 6.25759 3.35254 7.00019 3.35254C7.74279 3.35254 8.45498 3.64754 8.98009 4.17264C9.50519 4.69774 9.80018 5.40993 9.80018 6.15253Z"
                  fill="#500AD2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.00019 8.25253C7.55714 8.25253 8.09129 8.03128 8.48511 7.63746C8.87894 7.24363 9.10019 6.70949 9.10019 6.15253C9.10019 5.59558 8.87894 5.06144 8.48511 4.66761C8.09129 4.27379 7.55714 4.05254 7.00019 4.05254C6.44324 4.05254 5.90909 4.27379 5.51527 4.66761C5.12144 5.06144 4.90019 5.59558 4.90019 6.15253C4.90019 6.70949 5.12144 7.24363 5.51527 7.63746C5.90909 8.03128 6.44324 8.25253 7.00019 8.25253ZM7.00019 8.95253C7.74279 8.95253 8.45498 8.65753 8.98009 8.13243C9.50519 7.60733 9.80018 6.89514 9.80018 6.15253C9.80018 5.40993 9.50519 4.69774 8.98009 4.17264C8.45498 3.64754 7.74279 3.35254 7.00019 3.35254C6.25759 3.35254 5.5454 3.64754 5.02029 4.17264C4.49519 4.69774 4.2002 5.40993 4.2002 6.15253C4.2002 6.89514 4.49519 7.60733 5.02029 8.13243C5.5454 8.65753 6.25759 8.95253 7.00019 8.95253Z"
                  fill="#500AD2"
                />
              </svg>
              Personal settings
            </div>
            <ul className="mt-2">
              <li>
                <Link
                  to="/settings/personal/profile"
                  className={
                    location.pathname === "/settings/personal/profile"
                      ? "active"
                      : ""
                  }
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings/personal/delete-account"
                  className={
                    location.pathname === "/settings/personal/delete-account"
                      ? "active"
                      : ""
                  }
                >
                  delete account
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-item">
            <div className="d-flex item-title d-flex align-items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 7.875H5.875V9H2.5V7.875ZM2.5 10.125H8.125V11.25H2.5V10.125Z"
                  fill="#500AD2"
                />
                <path
                  d="M12.625 0H1.375C1.07672 0.000297831 0.790748 0.11892 0.579834 0.329834C0.36892 0.540748 0.250298 0.826723 0.25 1.125V12.375C0.250298 12.6733 0.36892 12.9593 0.579834 13.1702C0.790748 13.3811 1.07672 13.4997 1.375 13.5H12.625C12.9233 13.4997 13.2093 13.3811 13.4202 13.1702C13.6311 12.9593 13.7497 12.6733 13.75 12.375V1.125C13.7497 0.826723 13.6311 0.540748 13.4202 0.329834C13.2093 0.11892 12.9233 0.000297831 12.625 0ZM8.125 1.125V3.375H5.875V1.125H8.125ZM1.375 12.375V1.125H4.75V4.5H9.25V1.125H12.625L12.6256 12.375H1.375Z"
                  fill="#500AD2"
                />
              </svg>
              Product settings
            </div>
            <ul className="mt-2">
              <li>
                <Link
                  to="/settings/product/integrations"
                  className={
                    location.pathname === "/settings/product/integrations"
                      ? "active"
                      : ""
                  }
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/settings/product/interface">Interface</Link>
              </li>
            </ul>
          </div>
          <div className="nav-item">
            <div className="d-flex item-title d-flex align-items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 7.875H5.875V9H2.5V7.875ZM2.5 10.125H8.125V11.25H2.5V10.125Z"
                  fill="#500AD2"
                />
                <path
                  d="M12.625 0H1.375C1.07672 0.000297831 0.790748 0.11892 0.579834 0.329834C0.36892 0.540748 0.250298 0.826723 0.25 1.125V12.375C0.250298 12.6733 0.36892 12.9593 0.579834 13.1702C0.790748 13.3811 1.07672 13.4997 1.375 13.5H12.625C12.9233 13.4997 13.2093 13.3811 13.4202 13.1702C13.6311 12.9593 13.7497 12.6733 13.75 12.375V1.125C13.7497 0.826723 13.6311 0.540748 13.4202 0.329834C13.2093 0.11892 12.9233 0.000297831 12.625 0ZM8.125 1.125V3.375H5.875V1.125H8.125ZM1.375 12.375V1.125H4.75V4.5H9.25V1.125H12.625L12.6256 12.375H1.375Z"
                  fill="#500AD2"
                />
              </svg>
              Workspace settings
            </div>
            <ul className="mt-2">
              <li>
                <Link to="/settings/workspace/general">General settings</Link>
              </li>
              <li>
                <Link to="/settings/workspace/billing">Billing</Link>
              </li>
              <li>
                <Link to="/settings/workspace/team">Team</Link>
              </li>
              <li>
                <Link
                  to="/settings/workspace/usage"
                  className={
                    location.pathname === "/settings/workspace/usage"
                      ? "active"
                      : ""
                  }
                >
                  Usage
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/templates" className="go-back-btn">
          <span className="me-2">
            <FaArrowLeft />
          </span>
          Go back to Dashboard
        </Link>
      </div>

      <div className="settings-header d-flex d-lg-none">
        <a
          className="navbar-brand"
          ref={logoRef1}
          href="/"
          style={{ fontSize: "19px" }}
        >
          deepline<span className="text-warning-1">.</span>ai
        </a>
        <button
          ref={toggleBtnRef}
          onClick={handleToggleMenu}
          id="toggle-btn"
          className="p-0"
        >
          <FaAngleRight />
        </button>
      </div>
      <div className="nav-footer d-flex d-lg-none">
        <button onClick={handleToggleMenu}>
          {isMenuIconShow ? <MenuIcon /> : <CloseMenuIcon />}
        </button>
        <Link to="/chat-ai">
          <ChatIcon />
        </Link>
        <Link to="/templates">
          <TemplateSmIcon />
        </Link>
      </div>
    </div>
  );
}
