import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import BillingConfirm from "../../../../../components/BillingConfirm/BillingConfirm";

export const Edit = () => {
  return (
    <div className="row m-0 py-5">
      <div className="col-lg-2 text-end">
        <Link
          to="/settings/workspace/billing"
          className="go-back text-decoration-none"
        >
          <FiArrowLeft className="me-2" />
          Go back
        </Link>
      </div>
      <div className="col-lg-6">
        <div className="px-5 px-3">
          <span>Choose you plan</span>
          <Link
            to="/settings/workspace/billing/edit"
            className="go-back text-decoration-none"
          >
            Go back
          </Link>
        </div>
        <div className="px-5 px-3"></div>
      </div>
      <div className="col-lg-4 pe-lg-5">
        <BillingConfirm />
      </div>
    </div>
  );
};
