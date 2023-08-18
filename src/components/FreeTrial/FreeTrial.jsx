import { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { CreditContext } from "../../contexts/CreditContext";
import { makePayment } from "../../API/payment";
import { pricings } from "../../constants/pricings";

import { getUsageDetails } from "../../API/payment";

import "./FreeTrial.scss";
import PinkCheckIcon from "../../icons/PinkCheckIcon";
import InfoIcon from "../../icons/InfoIcon";
import WhiteCheckIcon from "../../icons/WhiteCheckIcon";
import CheckIcon from "../../icons/CheckIcon";

export default function FreeTrial() {
  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);
  const [checkedVal, setCheckedVal] = useState("starter");
  const params = useParams();
  const { type, monthly, credits } = params;
  console.log(type, monthly, credits, "typemonthly, crdits");
  const [enterpriseCredit, setEnterpriseCredit] = useState(50000);
  const [starterCredit, setStarterCredit] = useState(10000);
  const { setIsTrialPackage, updateHasCredit } = useContext(CreditContext);

  const makePay = async (transactionId) => {
    const params = {
      transaction_id: transactionId,
      package_name: `${checkedVal === "starter" ? "Starter" : "Enterprise"} ${
        pricings[checkedVal][
          checkedVal === "starter" ? Number(credits) : Number(credits)
        ][isMonthly ? "monthly" : "yearly"]
      }$ ${isMonthly ? "monthly" : "yearly"} package`,
      allowed_words: Number(
        checkedVal === "starter" ? Number(credits) : Number(credits)
      ),
    };
    const res = await makePayment(params);
    console.log(res);
    // const resposnse = await getUsageDetails();
    // console.log(resposnse, "okok");
  };

  useEffect(() => {
    setIsMonthly(monthly === "true");
    setCheckedVal(type);
  }, []);

  useEffect(() => {
    if (type === "starter") {
      setStarterCredit(Number(credits));
    } else {
      setEnterpriseCredit(Number(credits));
    }
  }, []);

  useEffect(() => {
    const el = document.createElement("script");
    let isSuccess = false;
    el.async = true;
    el.onload = () => {
      window.Chargebee.init({
        site: "deepline",
      });
      window.Chargebee.registerAgain();
      const cbInstance = window.Chargebee.getInstance();
      cbInstance.setCheckoutCallbacks(function (cart) {
        // you can define a custom callbacks based on cart object
        return {
          loaded: function () {
            isSuccess = false;
          },
          close: function () {
            if (isSuccess) {
              updateHasCredit().then(() => {
                navigate("/settings/workspace/billing");
              });
            }
          },
          success: function (hostedPageId) {
            console.log("successsss", hostedPageId);
            var transactionId = "";
            if (hostedPageId.indexOf("_sub_") > -1) {
              transactionId = hostedPageId.split("_sub_")[1];
            } else if (hostedPageId.indexOf("_inv_") > -1) {
              transactionId = hostedPageId.split("_inv_")[1];
            }
            console.log("Transaction ID:", transactionId);
            makePay(transactionId || hostedPageId);
            setIsTrialPackage(false);
            isSuccess = true;
            // Your custom logic here
          },
          step: function (value) {
            console.log(value);
          },
        };
      });
    };
    el.setAttribute("data-cb-site", "deepline");
    el.setAttribute("src", "https://js.chargebee.com/v2/chargebee.js");
    document.body.appendChild(el);
  }, []);

  const plans = [
    {
      title: "Starter 7 Days Trial",
      value: "starter",
      description:
        "Use our AI templates to create short texts, such as social media posts and product descriptions, or longer texts, such as blog posts or emails.",
      advantages: [
        "A selection of our AI templates",
        "Grammarly add-on",
        "Paragraph rewriting",
        "Email and chat support",
        "10,000 monthly credits",
        "Up to 5 team members",
      ],
      price: `${
        type === "starter"
          ? pricings[type][credits][isMonthly ? "monthly" : "yearly"]
          : isMonthly
          ? "10"
          : "100"
      }`,
      disabled: false,
    },
    {
      title: "Enterprise 7 Days Trial",
      value: "enterprise",
      description:
        "Access all our AI templates for short- and long-form content creation in 29+ languages and use them across platforms with our Chrome Extension.",
      advantages: [
        "Everything in Starter",
        "All our AI templates(+ Doc-Style Generator)",
        "Add-ons (29+ languages, AI Chat)",
        "Chrome Extension",
        "Email and chat support",
        "50,000 monthly credits",
        "Up to 10 team members",
      ],
      price: `${
        type === "enterprise"
          ? pricings[type][credits][isMonthly ? "monthly" : "yearly"]
          : isMonthly
          ? "42"
          : "419"
      }`,
      disabled: false,
    },
  ];

  const handleCheckChange = (value) => {
    console.log(value);
    setCheckedVal(value);
  };

  const handleChangeCurrency = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <>
      <div className="row m-0 pt-5 py-2 page-free">
        <div className="col-lg-2 text-lg-end mb-3 mb-lg-0">
          <Link to="/templates" className="go-back text-decoration-none">
            <FiArrowLeft className="me-2" />
            Go back
          </Link>
        </div>
        <div className="col-lg-6">
          <div className="subscription-section">
            <div className="subscription-header d-flex justify-content-between align-items-center">
              <div className="title">Select your trial option</div>
            </div>
            <div>
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`subscription-step ${
                    checkedVal === plan.value ? "active-step " : ""
                  }`}
                  onClick={() => handleCheckChange(plan.value)}
                >
                  <div className="px-2 px-lg-5 px-md-5 px-sm-3 py-4 row m-0 subscription-content">
                    <div className="col-lg-10">
                      <h6 className="d-flex align-items-center">
                        {!plan.disabled && (
                          <div className="forms me-4">
                            <label for={`rdo${index}`}>
                              <input
                                type="radio"
                                id={`rdo${index}`}
                                name="radio"
                                onChange={() => handleCheckChange(plan.value)}
                                checked={checkedVal === plan.value}
                              />
                              <span class="rdo"></span>
                            </label>
                          </div>
                        )}
                        {plan.title}
                      </h6>
                      <p className="ps-5">{plan.description}</p>
                      {plan.advantages.map((item, index) => (
                        <div
                          className="d-flex align-items-center ps-5"
                          key={index}
                        >
                          <CheckIcon />
                          <span className="ms-2">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="col-lg-2 mt-4 mt-lg-0 px-1 d-flex flex-column align-items-baseline m-auto">
                      <span className="text-uppercase text-right">
                        Starts at
                      </span>
                      <div>
                        <strong>${plan.price}</strong>
                        {` /${isMonthly ? "mo" : "year"}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="adjust-credits mt-3 px-5 py-3 ">
            <div className="d-flex justify-content-between align-items-center my-3">
              <span>Allowed credits</span>
              <div>5,000/ 7 Days</div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 pe-lg-5">
          <div className="package-switch-text d-flex justify-content-center mb-3 py-3 px-5">
            <div>Bill Monthly</div>
            <div className="mx-2">
              <label className="switch mt-1">
                <input
                  type="checkbox"
                  checked={!isMonthly}
                  onChange={handleChangeCurrency}
                />
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
                <div>{`${
                  checkedVal === "starter" ? "Starter" : "Enterprise"
                } Trial`}</div>
              </div>
            </div>
            <div className="item d-flex align-items-center py-3 justify-content-between">
              <div>
                <span className="mb-2">
                  Credits <InfoIcon />
                </span>
                <div>5,000 / 7 Days</div>
              </div>
              <span>$0.00</span>
            </div>
            <div className="item d-flex align-items-center py-3 justify-content-between">
              <div>
                <span className="mb-2">Discount</span>
              </div>
              {!isMonthly && (
                <span className="pink">
                  <PinkCheckIcon />2 months free
                </span>
              )}
            </div>
            <div className="item d-flex align-items-center py-3 item-bold justify-content-between">
              <div>
                <span className="mb-2">
                  Total <InfoIcon />
                </span>
              </div>
              <span>$0.00</span>
            </div>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-10$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" && starterCredit === 10000 && isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-100$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 10000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-24$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" && starterCredit === 35000 && isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-240$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 35000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-32$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" && starterCredit === 50000 && isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-319$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 50000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-52$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" && starterCredit === 75000 && isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-518$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 75000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-70$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 100000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-698$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 100000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-97$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 150000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-967$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 150000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-192$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 320000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="starter-1913$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "starter" &&
                starterCredit === 320000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-42$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 50000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-419$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 50000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-84$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 100000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-837$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 100000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-168$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 200000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-1674$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 200000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-248$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 300000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-2471$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 300000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-420$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 500000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-4184$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 500000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-504$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 600000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-5020$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 600000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-672$-monthly-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 800000 &&
                isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
            <button
              data-cb-type="checkout"
              data-cb-plan-id="enterprise-6694$-annually-package"
              className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                checkedVal === "enterprise" &&
                enterpriseCredit === 800000 &&
                !isMonthly
                  ? "d-flex"
                  : "d-none"
              }`}
            >
              <WhiteCheckIcon />
              Confirm changes
            </button>
          </div>
          <div className="notice mb-5 text-center">
            Payments are secured by Stripe
          </div>
        </div>
      </div>
    </>
  );
}
