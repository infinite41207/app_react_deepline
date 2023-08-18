import { Link } from "react-router-dom";
import TranshXIcon from "../../../../icons/TranshXIcon";
import { BsArrowUpLeft } from "react-icons/bs";

export default function DeleteAccountConfirm() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-between del-account-confirmed"
      style={{ height: "100vh" }}
    >
      <Link
        to={process.env.REACT_APP_FRONTEND_BASE_URL}
        className="navbar-brand text-decoration-none"
      >
        deepline<span className="text-warning-1">.</span>ai
      </Link>
      <div>
        <div className="d-flex justify-content-center">
          <TranshXIcon className="trashx-icon" />
        </div>

        <div className="confirmed-title">
          Your account is deleted permanently{" "}
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-4 justify-content-center">
        <Link to={process.env.REACT_APP_FRONTEND_BASE_URL}>
          <BsArrowUpLeft />
          <span className="ms-1">Go Back To Homepage</span>
        </Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
    </div>
  );
}
