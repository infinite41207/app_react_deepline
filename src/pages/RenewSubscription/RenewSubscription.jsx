import { useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { getDeleteAccountOTP } from "../../API/auth";
import { CreditContext } from "../../contexts/CreditContext";

import SignOutIcon from "../../assets/images/renew/sign-out.svg";
import BackIcon from "../../assets/images/renew/back.svg";
import DeleteIcon from "../../assets/images/renew/delete.svg";

import "./RenewSubscription.scss";

export default function RenewSubscription() {
  const { me, logOut } = useContext(AuthContext);
  const { hasCredits, updateHasCredit } = useContext(CreditContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    updateHasCredit();
  }, []);

  useEffect(() => {
    if (hasCredits) {
      navigate("/templates");
    }
  }, []);

  const handleDelete = async () => {
    setIsLoading(true);
    console.log(me);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${me.token}`,
      },
      withCredentials: false,
    };

    try {
      const res = await getDeleteAccountOTP(config);
      setIsLoading(false);
      if (res.data.type === "success") {
        navigate(`/settings/personal/delete-account/verify`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="row m-0 renew-page">
      <div className="col-lg-2 p-3 d-flex flex-column justify-content-between align-items-center">
        <Link className="navbar-brand" to="/" style={{ fontSize: "19px" }}>
          deepline<span className="text-warning-1">.</span>ai
        </Link>
        <div className="d-flex flex-column w-100">
          <button
            onClick={() => logOut()}
            className="text-center justify-content-center my-1 px-4 py-2 d-flex align-items-center"
          >
            <img src={SignOutIcon} alt="sign out" className="me-2" />
            Sign out
          </button>
          <Link
            to="/templates"
            className="text-decoration-none text-center my-1 px-4 py-2 d-flex justify-content-center align-items-center"
          >
            <img src={BackIcon} alt="back" className="me-2" />
            Go back to Dashboard
          </Link>
        </div>
      </div>
      <div className="col-lg-10 px-5 py-5 mb-5 d-flex flex-column text-align-start">
        <div className="renew-header d-flex flex-column align-items-start mb-4">
          <h1 className="my-3">
            {`Hey ${me?.user?.fname} ${me?.user?.lname} 👋`}
          </h1>
          <p className="my-2">
            Your workspace has unpaid invoices.
            <br />
            Please pay these invoices to reactivate
            <br /> your workspace.
          </p>
          <span className="mt-3 my-2">
            No active subscription on your account
          </span>
          <button className="px-3 px-2">Refresh</button>
        </div>
        <span className="my-4">Plan</span>
        <div className="renew-card p-4 mb-3 d-flex flex-column align-items-start">
          <span className="unpaid my-2">UNPAID</span>
          <span className="starter my-2">Starter</span>
          <div className="price mt-2 mb-3">US$10.00 /month</div>
          <div className="credit-detail d-flex my-1">
            <span className="me-3">Quantity: 35,000</span>
            <span>Show cost details</span>
          </div>
          <div className="billing-cycle mt-0 mb-4">
            Billing cycle renews on 13 April 2023.
          </div>
          <div className="billing-buttons mb-4 d-flex flex-column flex-lg-row flex-md-row w-100">
            <Link
              to="/settings/workspace/billing/invoice"
              className="px-3 me-2 text-decoration-none mb-2 mb-lg-0 mb-md-0 text-center d-flex align-items-center justify-content-center"
            >
              View / Pay invoices
            </Link>
            <Link
              to="/settings/workspace/billing/subscription/create"
              className="px-3 text-decoration-none text-center d-flex align-items-center justify-content-center"
            >
              Edit billing details
            </Link>
          </div>
        </div>
        <div className="renew-card p-4 d-flex flex-column align-items-start">
          <img src={DeleteIcon} alt="delete" className="mb-2" />
          <div className="my-2">Delete My Account</div>
          <p className="mt-2 mb-4 pe-5">
            If you would like to discontinue your partnership with deepline.ai
            and have your account removed from our system, we can assist you
            with this process. It is important to note that this action is
            permanent, and once the account is deleted, all data and information
            associated with the account will be lost and cannot be recovered. If
            you still wish to proceed with the account deletion, please click on
            "Delete My Account".
          </p>
          <button
            className="px-3 mb-3 d-flex align-items-center"
            onClick={() => handleDelete()}
          >
            <span className={isLoading ? "opacity-0" : "opacity-1"}>
              Delete My Account
            </span>
            <div
              className={(isLoading ? "" : "d-none") + " spinner-border"}
              role="status"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                color: "#ffffff",
              }}
            >
              <span className="sr-only visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
