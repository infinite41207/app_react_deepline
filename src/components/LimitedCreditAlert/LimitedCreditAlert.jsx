import Watch from "../../assets/images/limited-alert/watch.svg";
import Close from "../../assets/images/limited-alert/close.svg";
import Upgrade from "../../assets/images/limited-alert/upgrade.svg";

import "./LimitedCreditAlert.scss";

export default function LimitedCreditAlert(props) {
  return (
    <>
      <div className="backdrop"></div>
      <div className="alert-container position-absolute px-4 w-80 py-4 px-lg-5 d-flex flex-column">
        <button
          className="close-btn align-self-end mb-2"
          onClick={props.onClose}
        >
          <img src={Close} alt="close" />
        </button>
        <div className="d-flex align-items-center justify-content-center flex-column flex-lg-row">
          <div className="d-flex flex-column me-0 p-0 justify-content-center">
            <img src={Watch} alt="watch" height={20} className="mb-2" />
            <div className="heading mb-2 d-flex align-items-center text-center">
              Your trial has limited credits and ends in {props.days} days
            </div>
            <div className="desc text-center">
              To continue generating content, subscribe to a plan.
            </div>
          </div>
          {/* <button className="text-text-uppercase mt-4 mt-lg-0 d-flex align-items-center upgrade-btn py-2 px-3 ms-lg-4">
            <img src={Upgrade} alt="upgrade" className="me-2" />
            Upgrade now
          </button> */}
        </div>
      </div>
    </>
  );
}
