import { useState, useEffect, useContext } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams, useNavigate } from "react-router-dom";
import CreditSelector from "react-select";

import { CreditContext } from "../../../../../contexts/CreditContext";

import PinkCheckIcon from "../../../../../icons/PinkCheckIcon";
import InfoIcon from "../../../../../icons/InfoIcon";
import WhiteCheckIcon from "../../../../../icons/WhiteCheckIcon";
import { makePayment, getUsageDetails } from "../../../../../API/payment";

import { pricings } from "../../../../../constants/pricings";
import CheckIcon from "../../../../../icons/CheckIcon";

import "./Subscription.scss";

export default function Create() {
  const navigate = useNavigate();
  const [checkedVal, setCheckedVal] = useState("starter");
  const [selectCredit, setSelectCredit] = useState({ value: 10000 });
  const { updateHasCredit } = useContext(CreditContext);
  const [CreditError, setCreditError] = useState(false);
  const [isEditingPlan, setIsEditingPlan] = useState(true);
  // const [params, setParmas] = useState({});
  const [selectedStarterCredit, setSelectedStarterCredit] = useState(10000);
  const [selectedEnterpriseCredit, setSelectedEnterpriseCredit] =
    useState(50000);
  const [plans, setPlans] = useState([]);
  const [isMonthly, setIsMonthly] = useState(true);
  const params = useParams();
  // const { type, monthly, credits } = params;

  const getSelected = async () => {
    const res = await getUsageDetails();
    if (res.status_code === 404) return;
    console.log(res, "u;age");
    console.log();
    setIsMonthly(res.data.package_name.includes("monthly"));
    setCheckedVal(
      res.data.package_name.includes("Enterprise") ? "enterprise" : "starter"
    );
    if (res.data.package_name.includes("Enterprise")) {
      setSelectedEnterpriseCredit(res.data.allowed_words);
    } else {
      setSelectedStarterCredit(res.data.allowed_words);
    }
  };

  const initChargebee = () => {
    const oldScript = document.querySelector(
      "script[src='https://js.chargebee.com/v2/chargebee.js'"
    );
    if (oldScript) {
      oldScript.remove();
    }
    const el = document.createElement("script");
    let isSuccess = false;
    el.async = true;
    el.onload = () => {
      window.Chargebee.init({
        site: "deepline",
      });
      window.Chargebee.registerAgain();
      const cbInstance = window.Chargebee.getInstance();
      cbInstance.setPortalCallbacks({
        loaded: () => {
          console.log("Portal loaded successfully");
        },
        subscriptionChanged: (data) => {
          console.log("Subscription changed", data.subscription.id);
        },
      });
      cbInstance.setCheckoutCallbacks(function (cart) {
        // you can define a custom callbacks based on cart object
        return {
          loaded: function () {
            isSuccess = false;
            console.log(checkedVal, "checkedVal");
          },
          close: function () {
            console.log("checkout closed");
            if (isSuccess) {
              updateHasCredit().then(() => {
                navigate("/settings/workspace/billing");
              });
            }
          },
          success: async function (hostedPageId) {
            console.log("successsss", hostedPageId);
            var transactionId = "";
            if (hostedPageId.indexOf("_sub_") > -1) {
              transactionId = hostedPageId.split("_sub_")[1];
            } else if (hostedPageId.indexOf("_inv_") > -1) {
              transactionId = hostedPageId.split("_inv_")[1];
            }
            console.log("Transaction ID:", transactionId);
            makePay(transactionId || hostedPageId);
            isSuccess = true;
            // Your custom logic here
          },
          step: function (value) {
            console.log(value);
            console.log(cart, "cart");
          },
        };
      });
    };
    el.setAttribute("data-cb-site", "deepline");
    el.setAttribute("src", "https://js.chargebee.com/v2/chargebee.js");
    document.body.appendChild(el);
  };

  useEffect(() => {
    initChargebee();
  }, [checkedVal, selectedEnterpriseCredit, selectedStarterCredit, isMonthly]);

  const makePay = async (transactionId) => {
    const params = {
      transaction_id: transactionId,
      // package_id:
      //   pricings[checkedVal][
      //     checkedVal === "starter"
      //       ? selectedStarterCredit
      //       : selectedEnterpriseCredit
      //   ][isMonthly ? "mid" : "yid"],
      package_name: `${checkedVal === "starter" ? "Starter" : "Enterprise"} ${
        pricings[checkedVal][
          checkedVal === "starter"
            ? selectedStarterCredit
            : selectedEnterpriseCredit
        ][isMonthly ? "monthly" : "yearly"]
      }$ ${isMonthly ? "monthly" : "yearly"} package`,
      allowed_words: Number(
        checkedVal === "starter"
          ? selectedStarterCredit
          : selectedEnterpriseCredit
      ),
    };
    console.log(params, "params");
    const res = await makePayment(params);
    console.log(res, "_______makepay");
  };

  // useEffect(() => {
  //   if (monthly === "true") {
  //     setIsMonthly(true);
  //   } else {
  //     setIsMonthly(false);
  //   }
  //   if (type === "starter") {
  //     setSelectedStarterCredit(Number(credits));
  //   } else {
  //     setSelectedEnterpriseCredit(Number(credits));
  //   }
  //   setCheckedVal(type);
  // }, []);

  useEffect(() => {
    getSelected();
  }, []);

  useEffect(() => {
    // setParmas({
    //   transaction_id: "trans_100001",
    //   package_id: "packg_ 5546858",
    //   package_name: "Starter 24$ monthly package",
    //   currency: "USD",
    //   // amount_paid: isMonthly
    //   //   ? pricing.starter[selectedStarterCredit].monthly
    //   //   : pricing.starter[selectedStarterCredit].yearly,
    //   // billing_cycle: 1,
    //   billing_cycle_param: "monthly",
    //   allowed_words: 35000,
    // });
    // console.log(selectCredit.value);
    setPlans([
      {
        title: "Starter",
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
        price:
          pricings.starter[selectedStarterCredit][
            isMonthly ? "monthly" : "yearly"
          ],
        disabled: false,
      },
      {
        title: "Enterprise Mode",
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
        price:
          pricings.enterprise[selectedEnterpriseCredit][
            isMonthly ? "monthly" : "yearly"
          ],
        disabled: false,
      },
      {
        title: "Business",
        value: "business",
        description:
          "Get a customized plan suited to your organization’s needs with tailored word and user packages, onboarding, full support, and an account manager assigned to you.",
        advantages: [
          "Everything in Enterprise Mode",
          "Integrations such as SEO, Zapier,and more",
          "API connections and personalization",
          "Onboarding and a dedicated AccountManager",
          "Unlimited monthly credits",
          "Free additional credits",
          "Custom number of team members",
        ],
        price: 0,
        disabled: true,
      },
    ]);
  }, [isMonthly, selectedEnterpriseCredit, selectedStarterCredit]);

  const handleChangeCurrency = () => {
    setIsMonthly(!isMonthly);
    console.log(checkedVal);
  };

  const handleCheckChange = (value) => {
    if (value !== "business") {
      setCheckedVal(value);
    }
    console.log(checkedVal);
  };

  const creditOptions = {
    starter: [
      { value: 10000, string: (10000).toLocaleString() },
      { value: 35000, string: (35000).toLocaleString() },
      { value: 50000, string: (50000).toLocaleString() },
      { value: 75000, string: (75000).toLocaleString() },
      { value: 100000, string: (100000).toLocaleString() },
      { value: 150000, string: (150000).toLocaleString() },
      { value: 320000, string: (320000).toLocaleString() },
    ],
    enterprise: [
      { value: 50000, string: (50000).toLocaleString() },
      { value: 100000, string: (100000).toLocaleString() },
      { value: 200000, string: (200000).toLocaleString() },
      { value: 300000, string: (300000).toLocaleString() },
      { value: 500000, string: (500000).toLocaleString() },
      { value: 600000, string: (600000).toLocaleString() },
      { value: 800000, string: (800000).toLocaleString() },
    ],
  };

  const handleCreditChange = (event) => {
    setCreditError(false);
    setSelectCredit(event);
    checkedVal === "starter"
      ? setSelectedStarterCredit(event.value)
      : setSelectedEnterpriseCredit(event.value);
  };

  return (
    <>
      <div className="row m-0 py-5 page-create">
        <div className="col-lg-2 text-lg-end mb-3 mb-lg-0">
          <Link
            to="/settings/workspace/billing"
            className="go-back text-decoration-none"
          >
            <FiArrowLeft className="me-2" />
            Go back
          </Link>
        </div>
        <div className="col-lg-6">
          <div className="subscription-section">
            <div className="subscription-header d-flex justify-content-between align-items-center">
              <div className="title">Choose your plan</div>
              {!isEditingPlan && (
                <button
                  className="button"
                  onClick={() => setIsEditingPlan(true)}
                >
                  Edit
                </button>
              )}
            </div>
            {isEditingPlan && (
              <div>
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`subscription-step ${
                      checkedVal === plan.value ? "active-step " : ""
                    }${plan.value === "business" && "disabled-step"}`}
                    onClick={() => handleCheckChange(plan.value)}
                  >
                    <div className="px-2 px-lg-5 px-md-5 px-sm-3 py-4 row m-0 subscription-content">
                      <div className="col-lg-10">
                        <h6 className={`d-flex align-items-center ${plan.disabled && "ps-5"}`}>
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
                          {plan.disabled ? "PRICING VARIES" : "Starts at"}
                        </span>
                        <div className={`${plan.disabled && "contact-link"}`}>
                          {!plan.disabled && <strong>${plan.price}</strong>}
                          {plan.price ? (
                            ` /${isMonthly ? "mo" : "year"}`
                          ) : (
                            <Link to="#">Contact Sales</Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="d-flex px-5 pb-4 my-4 justify-content-start justify-content-lg-end justify-content-md-end ms-3 ms-lg-0 ms-md-0">
              {isEditingPlan && (
                <button
                  className="button"
                  onClick={() => {
                    setIsEditingPlan(false);
                  }}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
          <div className="adjust-credits my-3 px-5 py-3 ">
            <div className="d-flex justify-content-between align-items-center my-3">
              <span>Adjust credits</span>
              {isEditingPlan && (
                <button
                  className="button"
                  onClick={() => setIsEditingPlan(false)}
                >
                  Edit
                </button>
              )}
            </div>
            {!isEditingPlan && (
              <>
                <span className="my-3">Word credits / mo</span>
                <CreditSelector
                  value={Number(
                    checkedVal === "starter"
                      ? selectedStarterCredit
                      : selectedEnterpriseCredit
                  ).toLocaleString()}
                  options={
                    checkedVal === "starter"
                      ? creditOptions.starter
                      : creditOptions.enterprise
                  }
                  placeholder={Number(
                    checkedVal === "starter"
                      ? selectedStarterCredit
                      : selectedEnterpriseCredit
                  ).toLocaleString()}
                  onChange={handleCreditChange}
                  getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginLeft: 10 }}>{e.string}</span>
                    </div>
                  )}
                  className={`tone-selector shadow-none outline-line form-control ${
                    CreditError ? "invalid" : ""
                  }`}
                />
                <p className="my-4">
                  The total words generated by deepline.ai per month
                </p>
              </>
            )}
            {/* <form className="adjust-settings-form mt-3 mt-lg-5 d-block">
            <div className="form-group">
              <label>Word credits / mo</label>
              <input
                className="form-control my-2"
                name="fname"
                placeholder="35,000"
              />
              <p>The total words generated by deepline.ai per month</p>
            </div>
          </form> */}
          </div>
        </div>
        <div className="col-lg-4 pe-lg-5">
          <>
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
                    className={`${
                      !isMonthly ? "pink" : ""
                    } switch-slider round`}
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
                  <div>
                    {checkedVal === "starter" ? "Starter" : "Enterprise"}
                  </div>
                </div>
              </div>
              <div className="item d-flex align-items-center py-3 justify-content-between">
                <div>
                  <span className="mb-2">
                    Credits <InfoIcon />
                  </span>
                  <div>{`${Number(
                    checkedVal === "starter"
                      ? selectedStarterCredit
                      : selectedEnterpriseCredit
                  ).toLocaleString()} words/mo`}</div>
                </div>
                <span>{`$${
                  pricings[checkedVal][
                    checkedVal === "starter"
                      ? selectedStarterCredit
                      : selectedEnterpriseCredit
                  ][isMonthly ? "monthly" : "yearly"]
                }/${isMonthly ? "mo" : "year"}`}</span>
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
                <span>{`$${
                  pricings[checkedVal][
                    checkedVal === "starter"
                      ? selectedStarterCredit
                      : selectedEnterpriseCredit
                  ][isMonthly ? "monthly" : "yearly"]
                }/${isMonthly ? "mo" : "year"}`}</span>
              </div>
              <button
                data-cb-type="checkout"
                data-cb-plan-id="starter-10$-monthly-package"
                className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                  checkedVal === "starter" &&
                  selectedStarterCredit === 10000 &&
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
                data-cb-plan-id="starter-100$-annually-package"
                className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                  checkedVal === "starter" &&
                  selectedStarterCredit === 10000 &&
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
                  checkedVal === "starter" &&
                  selectedStarterCredit === 35000 &&
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
                data-cb-plan-id="starter-240$-annually-package"
                className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                  checkedVal === "starter" &&
                  selectedStarterCredit === 35000 &&
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
                  checkedVal === "starter" &&
                  selectedStarterCredit === 50000 &&
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
                data-cb-plan-id="starter-319$-annually-package"
                className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                  checkedVal === "starter" &&
                  selectedStarterCredit === 50000 &&
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
                  checkedVal === "starter" &&
                  selectedStarterCredit === 75000 &&
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
                data-cb-plan-id="starter-518$-annually-package"
                className={`w-100 py-3 mt-4 align-items-center justify-content-center ${
                  checkedVal === "starter" &&
                  selectedStarterCredit === 75000 &&
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
                  selectedStarterCredit === 100000 &&
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
                  selectedStarterCredit === 100000 &&
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
                  selectedStarterCredit === 150000 &&
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
                  selectedStarterCredit === 150000 &&
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
                  selectedStarterCredit === 320000 &&
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
                  selectedStarterCredit === 320000 &&
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
                  selectedEnterpriseCredit === 50000 &&
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
                  selectedEnterpriseCredit === 50000 &&
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
                  selectedEnterpriseCredit === 100000 &&
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
                  selectedEnterpriseCredit === 100000 &&
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
                  selectedEnterpriseCredit === 200000 &&
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
                  selectedEnterpriseCredit === 200000 &&
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
                  selectedEnterpriseCredit === 300000 &&
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
                  selectedEnterpriseCredit === 300000 &&
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
                  selectedEnterpriseCredit === 500000 &&
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
                  selectedEnterpriseCredit === 500000 &&
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
                  selectedEnterpriseCredit === 600000 &&
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
                  selectedEnterpriseCredit === 600000 &&
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
                  selectedEnterpriseCredit === 800000 &&
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
                  selectedEnterpriseCredit === 800000 &&
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
            <div className="qa">
              <InfoIcon />
              <div className="d-flex justify-content-start align-items-start px-5">
                <p>Why is the amount due today less than the plan total?</p>
              </div>
              <p className="px-5">
                When you make a change to your plan the amount due today is
                prorated based on how much time was spent on the previous plan
                vs the new plan. We only charge you the difference.
              </p>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
