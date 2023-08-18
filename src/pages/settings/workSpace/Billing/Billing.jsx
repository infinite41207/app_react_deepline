import { useState, useEffect, useContext } from "react";
import SettingsNav from "../../../../components/SettingsNav/SettingsNav";
import CreditIcon from "../../../../icons/CreditIcon";
import { Link } from "react-router-dom";
import SubscripIcon from "../../../../icons/SubscripIcon";
import { getUsageDetails, pauseSubscription } from "../../../../API/payment";
import { CreditContext } from "../../../../contexts/CreditContext";
import UpgradeCreditAlert from "../../../../components/UpgradeCreditAlert/UpgradeCreditAlert";
import CountUp from "react-countup";
import "../../Settings.scss";
import "./Billing.scss";

export default function Billing() {
  const { hasCredits } = useContext(CreditContext);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [checkedVal, setCheckedVal] = useState("upgrade");
  const [usageDetails, setUsageDetails] = useState({});
  const [activeStatus, setActiveStatus] = useState({});
  const getDetails = async () => {
    try {
      const res = await getUsageDetails();
      setUsageDetails(res.data);
      console.log(res.data);
      console.log(res.header_data);
      setActiveStatus(res.header_data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelSubscription = async () => {
    const params = {
      subscription_id: usageDetails.subscription_id,
    };
    const res = await pauseSubscription(params);
    if (res.status_code === 200) {
      getDetails();
    }
    console.log(res, "____cancel");
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    console.log(hasCredits, "hascrdits");
    if (hasCredits) {
      setIsAlertShow(false);
    } else {
      setIsAlertShow(true);
    }
  }, [hasCredits]);

  return (
    <div className="d-flex">
      {isAlertShow && (
        <UpgradeCreditAlert onCloseClick={() => setIsAlertShow(false)} />
      )}
      <SettingsNav />

      <section className="settings-right-section col">
        <h2 className="heading-title text-center text-lg-start text-md-start">
          Billing
        </h2>
        <p className="heading-desc text-center text-lg-start text-md-start">
          Learn how we bill you for using deepline.ai
        </p>

        <div className="usage-section p-lg-4">
          <div className="usage-deadline text-center text-lg-start text-md-start">
            Available credits
          </div>

          <div className="row g-1 mt-3">
            <div className="col-lg-4">
              <div className="usage-info">
                <CreditIcon />
                <h4 className="mt-2">Total credits</h4>
                <h1>
                  <CountUp
                    end={Number(usageDetails.consumed_words || 0)}
                    duration={2}
                  />
                </h1>
                <p>
                  <CountUp
                    end={
                      Math.ceil(
                        (100 / Number(usageDetails.allowed_words)) *
                          Number(usageDetails.consumed_words)
                      ) || 0
                    }
                    duration={2}
                  />
                  % of total credits used
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="usage-info">
                <CreditIcon />
                <h4 className="mt-2">Plan credits</h4>
                <h1>
                  <CountUp
                    end={Number(usageDetails.allowed_words || 0)}
                    duration={2}
                  />
                </h1>
                <p>
                  <CountUp
                    end={
                      Math.ceil(
                        (100 / Number(usageDetails.allowed_words)) *
                          Number(usageDetails.consumed_words)
                      ) || 0
                    }
                    duration={2}
                  />
                  % of plan credits used
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="usage-info">
                <CreditIcon />
                <h4 className="mt-2">Bonus credits</h4>
                <h1>{Number(0).toLocaleString()}</h1>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="usage-info">
                <SubscripIcon />
                <div className="fs-5 fw-600 mt-2 mb-1">Subscription</div>
                <div className="subscription-starter justify-content-center justify-content-lg-start justify-content-md-start d-flex align-items-center gap-2 mb-1">
                  {usageDetails.package_name &&
                    (usageDetails.package_name.split(" ")[0] === "7"
                      ? "Free Trial"
                      : usageDetails.package_name.split(" ")[0])}
                  {activeStatus.subscription_status && (
                    <div className="active">active</div>
                  )}
                </div>
                <p className="fw-medium mb-1">
                  {usageDetails.allowed_words &&
                    usageDetails.allowed_words.toLocaleString()}{" "}
                  word credits
                </p>
                <p style={{ color: "#17171A" }}>
                  Billing cycle renews in{" "}
                  {new Date(usageDetails.valid_till).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <div className="d-flex edit-buttons flex-column flex-lg-row flex-md-row gap-2 mt-3 mt-lg-5">
                  <Link to="/settings/workspace/billing/subscription/create/">
                    <button className="payment-detail w-100 mb-2 px-5">
                      Edit plan
                    </button>
                  </Link>
                  {usageDetails.status !== "in_trial" &&
                    usageDetails.subscription_status === "active" && (
                      <button
                        className="mb-2"
                        onClick={() => cancelSubscription()}
                      >
                        Cancel subscription
                      </button>
                    )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="usage-info">
                <div className="fw-600" style={{ fontSize: "1.125rem" }}>
                  If I go over my plan limit for the month
                </div>
                <div className="radio-group mt-4">
                  <div className="form-group d-flex align-items-baseline">
                    <input
                      type="radio"
                      id="upgrade"
                      checked={checkedVal === "upgrade"}
                      onChange={() => setCheckedVal("upgrade")}
                    />
                    <label className="ms-1" htmlFor="upgrade">
                      Upgrade account to the next tier (cheaper per word)
                    </label>
                  </div>
                  <div className="form-group d-flex mt-2 align-items-baseline">
                    <input
                      type="radio"
                      id="nothing"
                      checked={checkedVal === "nothing"}
                      onChange={() => setCheckedVal("nothing")}
                    />
                    <label className="ms-1" htmlFor="nothing">
                      Do nothing and wait for me to manually update my plan
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bill-bottom d-flex justify-content-between flex-column flex-lg-row flew-md-column gap-3 gap-lg-0 gap-md-0 align-items-center mt-4">
            <div className="text-white">
              <h4 className="fw-bold">Get 2 months free ✌️</h4>
              <p className="mb-0">Pay annually to get 2 months free.</p>
            </div>

            <button className="btn bg-white mt-3 mt-lg-0">View details</button>
          </div>

          <div className="bill-bottom bill-invoices d-flex justify-content-between flex-column flex-lg-row flew-md-column gap-3 gap-lg-0 gap-md-0 align-items-center mt-4 bg-white">
            <div style={{ color: "#17171A" }}>
              <h4 className="fw-bold text-center text-lg-start">Invoices</h4>
              <p className="mb-0 fw-normal text-center text-lg-start text-md-start">
                View your payment history
              </p>
            </div>
            <Link
              to="/settings/workspace/billing/invoice"
              className="mt-3 mt-lg-0"
            >
              <button className="btn bg-coral text-white">
                View billing history
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
