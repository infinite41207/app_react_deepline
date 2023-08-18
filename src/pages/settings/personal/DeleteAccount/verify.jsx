import { useState, useContext } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount, getDeleteAccountOTP } from "../../../../API/auth";
import { AuthContext } from "../../../../contexts/AuthContext";

export default function DeleteAccountVerify() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { me, logOut } = useContext(AuthContext);
  const [otp, setOtp] = useState('');

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();
    setLoading(true);
    try {
      const res = await deleteAccount(otp);
      if (res.data.status_code === 200) {
        setLoading(false);
        logOut()
        navigate("/delete-account-confirmed");
      }
    } catch (error) {
      setLoading(false);
      let status_code = error.response.data.status_code;
      if (status_code === 400 || status_code === 403 || status_code === 404) {
        setAlertMessage(error.response.data.message);
      }
    }
  };

  const handleResend = async () => {
    try {
      const res = await getDeleteAccountOTP()
      if (res.data.type === "success") {
        setSuccessMessage("New OTP has been sent to your email address");
      }
    } catch (error) {
      setAlertMessage(error.response.data.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-align-items-center del-account-verify"
      style={{ height: "100vh" }}
    >
      <div className="text-center verify-maxWidth d-flex flex-column justify-content-center">
        <div className="mb-3">
          <Link
            to={process.env.REACT_APP_FRONTEND_BASE_URL}
            className="navbar-brand"
          >
            deepline<span className="text-warning-1">.</span>ai
          </Link>
        </div>
        <div className="form-title mb-4">Verify it's you</div>
        <div className="form-description mb-3 col-9 mx-auto">
          Please check your inbox for a verification code to confirm your
          identity before deleting your Account
        </div>
        {successMessage ? (
          <div
            className="alert alert-success alert-dismissible fade show px-3 py-2 mx-5 form-description"
            role="alert"
          >
            {successMessage}
            <button
              type="button"
              className="btn-close shadow-none top-50 end-0 translate-middle-y p-0 me-2"
              data-bs-dismiss="alert"
              aria-label="Close"
              style={{ fontSize: "x-small" }}
            ></button>
          </div>
        ) : (
          ""
        )}

        {alertMessage ? (
          <div
            className="alert alert-danger alert-dismissible fade show px-3 py-2 mx-5 form-description"
            role="alert"
          >
            {alertMessage}
            <button
              type="button"
              className="btn-close shadow-none top-50 end-0 translate-middle-y p-0 me-2"
              data-bs-dismiss="alert"
              aria-label="Close"
              style={{ fontSize: "x-small" }}
            ></button>
          </div>
        ) : (
          ""
        )}

        <form
          onSubmit={handleDeleteSubmit}
          className="auth-form col-10 mx-auto verify-form p-3"
        >
          <div className="row text-start mb-2">
            <div className="col-12 mb-3">
              <input type="hidden" name="id" value={me?.user?.id} />
              <div className="form-group">
                <label className="form-label">
                  Code sent to
                  <span className="verify-label-email ms-1">
                    {me?.user?.email}
                  </span>
                </label>
                <input
                  type="number"
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp || ""}
                  className="form-control shadow-none py-2"
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn auth-btn-blue-gradient-1 w-100">
            <div className={loading ? "d-none" : "d-"}>
              Confirm Deletion
              <HiOutlineArrowRight className="my-auto ms-2" />
            </div>
            <div
              className={(loading ? "" : "d-none") + " spinner-border"}
              role="status"
              style={{
                width: "1.25rem",
                height: "1.25rem",
                color: "#ffffff",
              }}
            >
              <span className="sr-only visually-hidden">Loading...</span>
            </div>
          </button>
        </form>
        <div className="verify-form-footer d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn p-0 border border-0"
            id="resend"
            onClick={handleResend}
          >
            <FiRefreshCcw className="mb-1 me-2" />
            <span className="send-code-text">Send a new code</span>
          </button>
        </div>
      </div>
    </div>
  );
}
