import { useEffect, useState } from "react";
import PinkCheckIcon from "../../icons/PinkCheckIcon";
import InfoIcon from "../../icons/InfoIcon";
import WhiteCheckIcon from "../../icons/WhiteCheckIcon";
import { makePayment } from "../../API/payment";

import "./BillingConfirm.scss";

export default function BillingConfirm(props) {
  const [params, setParmas] = useState({});

  useEffect(() => {
    setParmas({
      transaction_id: "trans_100001",
      package_id: "packg_ 5546858",
      package_name: "Starter 24$ monthly package",
      currency: "USD",
      amount_paid: "24",
      billing_cycle: 1,
      billing_cycle_param: "monthly",
      allowed_words: 35000,
    });
  }, []);

  const makePay = async () => {
    try {
      const res = await makePayment(params);
      console.log(res);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const [isMonthly, setIsMonthly] = useState(true);
  const handleChangeCurrency = () => {
    setIsMonthly(!isMonthly);
  };
  return (
    <>
      <div className="package-switch-text d-flex justify-content-center mb-3 py-3 px-5">
        <div>Bill Monthly</div>
        <div className="mx-2">
          <label className="switch mt-1">
            <input type="checkbox" onChange={handleChangeCurrency} />
            <span
              className={`${!isMonthly ? "pink" : ""} switch-slider round`}
            ></span>
          </label>
        </div>
        <div>Bill Annually</div>
      </div>
      <div className="review-changes p-5 mb-3">
        <span className="mb-5">Review changes</span>
        <div className="item d-flex align-items-center py-3 justify-content-between">
          <div>
            <span className="mb-2">Plan type</span>
            <div>Starter</div>
          </div>
          <span>$100/year</span>
        </div>
        <div className="item d-flex align-items-center py-3 justify-content-between">
          <div>
            <span className="mb-2">
              Credits <InfoIcon />
            </span>
            <div>35,000/mo</div>
          </div>
          <span>$100/year</span>
        </div>
        <div className="item d-flex align-items-center py-3 justify-content-between">
          <div>
            <span className="mb-2">Discount</span>
          </div>
          <span className="pink">
            <PinkCheckIcon />2 months free
          </span>
        </div>
        <div className="item d-flex align-items-center py-3 justify-content-between">
          <div>
            <span className="mb-2">
              Total <InfoIcon />
            </span>
          </div>
          <span>$200/year</span>
        </div>
        <div className="item-bold d-flex align-items-center py-3 justify-content-between">
          <div>
            <span className="mb-2">
              Due today <InfoIcon />
            </span>
          </div>
          <span>$200.00</span>
        </div>
        <button
          className="w-100 py-3 mt-4 d-flex align-items-center justify-content-center"
          onClick={() => makePay()}
        >
          <WhiteCheckIcon />
          Confirm changes
        </button>
      </div>
      <div className="notice mb-5 text-center">
        Payments are secured by Stripe
      </div>
      <div className="qa">
        <InfoIcon />
        <div className="d-flex justify-content-start align-items-start px-5">
          <p>Why is the amount due today less than the plan total?</p>
        </div>
        <p className="px-5">
          When you make a change to your plan the amount due today is prorated
          based on how much time was spent on the previous plan vs the new plan.
          We only charge you the difference.
        </p>
      </div>
    </>
  );
}
