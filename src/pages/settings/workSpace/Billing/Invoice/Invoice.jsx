import { Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import { getPaymentHistory } from "../../../../../API/payment";

import { AuthContext } from "../../../../../contexts/AuthContext";
import { getDeleteAccountOTP } from "../../../../../API/auth";
import { CreditContext } from "../../../../../contexts/CreditContext";

import StripIcon from "../../../../../assets/images/workspace/stripe.svg";
import mastercard from "../../../../../assets/images/workspace/mastercard.svg";
import CloseIcon from "../../../../../icons/CloseIcon";
import SmallMenuIcon from "../../../../../icons/SmallMenuIcon";
import GreyPlus from "../../../../../icons/GreyPlus";
import UpdateIcon from "../../../../../icons/UpdateIcon";
import OpenIcon from "../../../../../icons/OpenIcon";
import ViewMoreIcon from "../../../../../icons/ViewMoreIcon";
import TrashIcon from "../../../../../assets/images/workspace/trash.svg";

import "./Invoice.scss";

export default function Invoice() {
  const { me, logOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const getHistory = async () => {
  //   try {
  //     const res = await getPaymentHistory();
  //     console.log(res);
  //   } catch (error) {
  //     if (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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

  // useEffect(() => {
  //   getHistory();
  // }, []);

  return (
    <div className="row m-0 page-invoice">
      <div className="col-lg-2">
        <Link
          className="navbar-brand text-center"
          to="/"
          style={{ fontSize: "19px" }}
        >
          deepline<span className="text-warning-1">.</span>ai
        </Link>
        <div className="d-flex justify-content-center flex-column align-items-center">
          <div className="d-flex flex-column justify-content-center w-100">
            <Link
              to="/settings/workspace/billing"
              className="go-back text-decoration-none"
            >
              <FiArrowLeft className="me-2" />
              Go back to Dashboard
            </Link>
          </div>
          <span className="mt-3 privacy-badge">Privacy</span>
        </div>
      </div>
      <div className="col-lg-10 py-5 px-2 px-lg-5 px-md-3">
        <div className="my-3 plan-name">Current Plan</div>
        <div className="card-box py-4 px-4">
          <label htmlFor="">Starter</label>
          <div className="mb-2 mt-1 credit-heading">US$10.00 per month</div>
          <div className="my-2 credit-detail">
            <span>Quantity: 35,000</span>
            <span className="ms-3">Show cost details</span>
          </div>
          <p>Your plan renews on 13 March 2023.</p>
        </div>
        <div className="card-box py-4 px-4 cancel-card mt-5">
          <h1>Cancel Account</h1>
          <p>
            Please be aware that cancelng your account will cause you to lose
            all of your saved content and earned credits on your account.
          </p>
          <button className="px-3 d-flex align-items-center position-relative" onClick={handleDelete}>
            <span
              className={`d-flex align-items-center ${
                isLoading ? "opacity-0" : "opacity-1"
              }`}
            >
              <img src={TrashIcon} alt="cancel" className="mx-2" />
              Cancel Account
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
