/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import InviteModal from "../Invite/Invite";

import "./sidenav.scss"; /* Include CSS File */

/* Components  */
import Progressbar from "./Progressbar"; /* Include Progresline */

/* Icons */
import { FiPlusCircle } from "react-icons/fi";
import RightBullet from "../../assets/images/dashboard/sidenav-bullet.svg";
import Settings from "../../assets/images/dashboard/settings.svg";
import Help from "../../assets/images/dashboard/help.svg";
import History from "../../assets/images/dashboard/history.svg";
import Billing from "../../assets/images/dashboard/billing.svg";
import Usage from "../../assets/images/dashboard/usage.svg";
import Invite from "../../assets/images/dashboard/invite.svg";
import Useravatar from "../../assets/images/dashboard/user-avatar.svg";
import CreaditIcon from "../../assets/images/dashboard/credit-icons.svg";
import TemplateIcon from "../../assets/images/dashboard/template-window.svg";
import Logouticon from "../../assets/images/dashboard/logout.svg";
import ChatAI from "../../assets/images/dashboard/black-title-pics/chat.svg";
import Userdropdown from "../../assets/images/dashboard/user-dropdown.svg";

import { getUsageDetails } from "../../API/payment";
import { TemplateContext } from "../../contexts/TemplateContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import MenuIcon from "../../icons/MenuIcon";
import CloseMenuIcon from "../../icons/CloseMenuIcon";
import ChatIcon from "../../icons/ChatIcon";
import TemplateSmIcon from "../../icons/TemplateSmIcon";

const Sidenav = (props) => {
  const { allTemplates, updateTemplates } = useContext(TemplateContext);
  const [userPopupShow, setUserPopupShow] = useState(false);
  const { me, logOut } = useContext(AuthContext);
  const [isMenuIconShow, setIsMenuIconShow] = useState(true);
  const [isShowInvite, setIsShowInvite] = useState(false);
  const [usageDetails, setUsageDetails] = useState({});
  const userRef = useRef();
  const navbarRef = useRef();

  const handleToggleMenu = (e) => {
    navbarRef.current.classList.toggle("collapsed");
    e.currentTarget.classList.toggle("toggle");
    setIsMenuIconShow(!isMenuIconShow);
  };

  const handleClick = () => {
    navbarRef.current.classList.toggle("collapsed");
    setIsMenuIconShow(!isMenuIconShow);
  }

  const getDetails = async () => {
    try {
      const res = await getUsageDetails();
      setUsageDetails(res.data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!allTemplates) updateTemplates();
    getDetails();
  }, [allTemplates, updateTemplates]);

  return (
    <>
      {isShowInvite && <InviteModal onClose={() => setIsShowInvite(false)} />}
      <div className="sidebar">
        <div className="col side-nav" ref={navbarRef}>
          <div className="mx-5 py-2 d-flex justify-content-between align-items-center">
            <a
              className="navbar-brand"
              href={process.env.REACT_APP_FRONTEND_BASE_URL}
            >
              deepline<span className="text-warning-1">.</span>ai
            </a>
            <button
              className="bg-transparent p-0 d-block d-lg-none"
              onClick={handleToggleMenu}
            >
              <FaAngleLeft />
            </button>
          </div>

          {/* New Button Section */}
          <div className="px-3">
            <Link to="/templates" className="btn plus-btn w-100 py-2" onClick={() => handleClick()}>
              <div className="d-flex justify-content-start">
                <FiPlusCircle className="mx-3 my-auto fs-5" />
                <div>New Project</div>
              </div>
            </Link>
          </div>

          {/* Templates Section */}
          <div className="my-2 px-3">
            <div
              className="accordion border border-0 shadow-none"
              id="templates"
            >
              <div className="accordion-item border border-0 shadow-none">
                <div className="accordion-header">
                  <button
                    className="accordion-button shadow-none ps-2 py-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    id="headingOne"
                  >
                    <img
                      src={TemplateIcon}
                      alt=""
                      className="ms-2"
                      width="14"
                      height="14"
                    />
                    <div className="sidenav-heading-1 ms-2">Templates</div>
                  </button>
                </div>
                <div
                  id="collapseOne"
                  className="accordion-collapse sidenav-collapse collapse show theme-scrollbar"
                  aria-labelledby="headingOne"
                  data-bs-parent="#templates"
                >
                  <div className="accordion-body px-0 py-0">
                    {allTemplates &&
                      allTemplates?.map(
                        (temp) =>
                          temp.totals !== 0 && (
                            <Link
                              key={temp.title}
                              to={`${temp.link}?pageId=history`}
                              className="btn d-flex border border-0 pt-0"
                              onClick={() => handleClick()}
                            >
                              <div>
                                <img src={RightBullet} alt="" height="12" />
                              </div>
                              <div className="d-none">
                                <img
                                  src={require(`../../assets/images/dashboard/black-title-pics/${temp.icon}.svg`)}
                                  alt=""
                                />
                              </div>
                              <div className="sidenav-subheading-1 mt-1 ms-3 text-nowrap">
                                {`${temp.title} (${temp.totals})`}
                              </div>
                            </Link>
                          )
                      )}
                    <Link
                      to="/chat-ai"
                      className="btn d-flex border border-0 pt-0"
                    >
                      <div>
                        <img src={RightBullet} alt="" height="12" />
                      </div>
                      <div className="d-none">
                        <img src={ChatAI} alt="" />
                      </div>
                      <div className="sidenav-subheading-1 mt-1 ms-3 text-nowrap">
                        Chat AI
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="credit-section my-2 mx-3 p-3 bg-white">
            <div className="d-flex credit-heading-1">
              <div className="">
                <img src={CreaditIcon} alt="" />
              </div>
              <div className="ms-2">Credits</div>
            </div>
            <div className="my-3">
              <div className="progress-bar mt-4 mb-3">
                <div
                  className="progress-bar-inner"
                  style={{
                    width: `${
                      Math.ceil(
                        (100 / Number(usageDetails.allowed_words)) *
                          Number(usageDetails.consumed_words)
                      ) || 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="progress-status">
              {Math.ceil(
                (100 / Number(usageDetails.allowed_words)) *
                  Number(usageDetails.consumed_words)
              ) || 0}
              % of plan credits used
            </div>
            <div className="progress-link">
              <Link to="/settings/workspace/billing">Get more credits</Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="links-section px-3 mt-auto">
            <div className="px-3">
              <Link
                to="/settings/personal/profile"
                className="d-flex mt-3 mb-2 text-decoration-none"
              >
                <img src={Settings} alt="" width="15" />
                <div className="ms-2">Settings</div>
              </Link>
              <Link to="#" className="d-flex mb-2 text-decoration-none">
                <img src={Help} alt="" width="15" />
                <div className="ms-2">Help</div>
              </Link>
              <Link to="#" className="d-flex mb-2 text-decoration-none">
                <img src={History} alt="" width="15" />
                <div className="ms-2">All outputs History</div>
              </Link>
              <Link
                to="/settings/workspace/billing"
                className="d-flex mb-2 text-decoration-none"
              >
                <img src={Billing} alt="" width="15" />
                <div className="ms-2">Billing</div>
              </Link>
              <Link
                to="/settings/workspace/usage"
                className="d-flex mb-2 text-decoration-none"
              >
                <img src={Usage} alt="" width="15" />
                <div className="ms-2">Usage</div>
              </Link>
            </div>
            {/* User Section */}
            <div className="">
              <button
                className="invitation-btn bg-white d-flex justify-content-center p-2  mt-3 mt-lg-auto mt-md-auto w-100"
                onClick={() => {
                  handleClick()
                  setIsShowInvite(!isShowInvite)
                }}
              >
                <div>Invite Team Members</div>
                <img src={Invite} alt="" className="ms-2" />
              </button>
            </div>
            <div ref={userRef} className="user-section ps-3 position-relative">
              <button
                className="btn px-0 d-flex justify-content-between shadow-none border border-0 w-100 my-2 d-flex justify-content-start user-head"
                type="button"
                id="user"
                onClick={() => {
                  setUserPopupShow(!userPopupShow);
                }}
              >
                <div className="d-flex justify-content-start flex-grow-1">
                  <img src={Useravatar} alt="" />
                  <div
                    className="ms-2 text-truncate"
                    title={me?.user?.fname + " " + me?.user?.lname}
                  >
                    {me?.user?.fname + " " + me?.user?.lname}
                  </div>
                </div>
                <div>
                  <img src={Userdropdown} alt="" />
                </div>
              </button>
              <ul
                className={`${
                  userPopupShow ? "d-block" : "d-none"
                } w-100 logout-menu position-absolute`}
                aria-labelledby="user"
              >
                <li>
                  <button
                    className="btn btn-sm dropdown-item logout-btn"
                    onClick={logOut}
                  >
                    <img src={Logouticon} alt="" className="ms-1 me-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {props.pageTitle && (
          <div
            className={`nav-header d-flex flex-row-reverse d-lg-none ${
              props.leftOption
                ? "justify-content-between"
                : "justify-content-center"
            }`}
          >
            {props.leftOption && (
              <button onClick={props.onLeftClick}>{props.leftOption}</button>
            )}
            <div className="nav-header-title">{props.pageTitle}</div>
            {props.rightOption && (
              <button onClick={props.onRightClick}>{props.rightOption}</button>
            )}
          </div>
        )}
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
    </>
  );
};

export default Sidenav;
