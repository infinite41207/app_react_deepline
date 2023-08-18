import upgradeAlertIcon from "../../assets/images/templates/upgrade-alert.svg";
import CloseIcon from "../../assets/images/templates/alert-close.svg";

import "./UpgradeCreditAlert.scss";

import { Link } from "react-router-dom";

export default function UpgradeCreditAlert(props) {
  return (
    <>
      <div className="backdrop"></div>
      <div className="d-flex update-alert position-absolute flex-column align-items-center">
        <Link
          to="#"
          className="align-self-end alert-close"
          onClick={() => props.onCloseClick()}
        >
          <img src={CloseIcon} alt="close" />
        </Link>
        <img src={upgradeAlertIcon} alt="alert" className="my-2 alert-icon" />
        <h1 className="alert-heading my-2">Whoops!</h1>
        <p className="alert-desc text-center mb-4">
          It appears that your account is inactive. Please visit the billing
          page to continue using your account.
        </p>
        <Link
          to="/renew-subscription"
          className="update-btn text-decoration-none"
        >
          Update billing details
        </Link>
      </div>
    </>
  );
}
