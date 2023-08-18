import "./auth.css";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"; /* Include reCAPTCHA */
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";

/* Icons */
import { HiOutlineArrowRight } from "react-icons/hi";
import googleBtnImg from "../../assets/images/auth/google-signin-btn.png";
import Ellipse1 from "../../assets/images/auth/ellipse1.svg";
import Ellipse2 from "../../assets/images/auth/ellipse2.svg";
import Textbox1 from "../../assets/images/auth/text1.svg";
import Textbox2 from "../../assets/images/auth/text2.svg";
import Sidegirl from "../../assets/images/auth/girl.png";
import Inputcheck from "../../assets/images/auth/input-verified-check.svg";
import { signup, signInWithSocial, signUpWithSocial } from "../../API/auth";
// context
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [verifyCaptcha, setVerifyCaptcha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    callback_url: `${process.env.REACT_APP_BASE_URL}/verify-otp`,
    social_login_id: "",
  });
  const { doSetUser } = useContext(AuthContext);
  const verifycaptchaFunction = () => {
    setVerifyCaptcha(true);
  };
  const expiredcaptchaFunction = () => {
    setVerifyCaptcha(false);
  };
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  /* Submit Form */
  const signupSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();
    console.log(formData);
    setLoading(true);
    try {
      const res = await signup(formData);
      setLoading(false);
      if (res.data.type === "success") {
        navigate(`/verify-otp/${res.data.data.id}/${formData.email}/""`);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response.data.type === "error") {
        setAlertMessage(err.response.data.message);
      }
    }
  };

  /* Submit Social Login Form */
  const socialLogin = async (provider, data) => {
    console.log(formData);
    setLoading(true);
    try {
      const res = await signInWithSocial({
        social_login_id: data.sub,
        social_login_type: provider.toUpperCase(),
      });
      doSetUser(res.data.data);
      navigate("/templates");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let status_code = err.response.data.status_code;
      if (status_code === 404) {
        const signUpData = {
          social_login_id: data.sub,
          fname: data.given_name,
          lname: data.family_name,
          email: data.email,
        };
        socialSignup(signUpData);
      } else if (status_code === 403) {
        alert("Something went wrong!");
      }
    }
  };

  /* Submit Social Signup Form */
  const socialSignup = async (data) => {
    setLoading(true);
    try {
      const res = await signUpWithSocial({
        social_login_id: data.social_login_id,
        social_login_type: "GOOGLE",
        fname: data.fname,
        lname: data.lname,
        email: data.email,
      });
      if (res.data.status_code === 201) {
        doSetUser(res.data.data);
        navigate("/templates");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let status_code = error.response.data.status_code;
      if (status_code === 403 || status_code === 429) {
        setAlertMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-5 col-sm-6 col-8 mx-xl-4 mx-auto">
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="container text-center">
              <div className="mb-4">
                <Link
                  to={process.env.REACT_APP_FRONTEND_BASE_URL}
                  className="navbar-brand"
                >
                  deepline<span className="text-warning-1">.</span>ai
                </Link>
              </div>
              <h2 className="form-title mb-3">Create your account</h2>
              <div className="form-description mb-3">
                Set up your account in just this simple step
              </div>
              <div className="text-nowrap">
                <LoginSocialGoogle
                  client_id={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}` || ""}
                  redirect_uri={process.env.REACT_APP_BASE_URL}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ provider, data }) => {
                    socialLogin(provider, data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <img
                    style={{
                      height: "60px",
                      width: "auto",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    src={googleBtnImg}
                    alt="Google Login Button"
                  />
                </LoginSocialGoogle>
              </div>

              <div className="form-divider my-4 position-relative">
                <div className="form-divider-text px-2 text-nowrap bg-white position-absolute top-50 start-50 translate-middle">
                  Or register with your email
                </div>
              </div>

              {alertMessage ? (
                <div
                  className="alert alert-danger alert-dismissible fade show px-3 py-2 form-description"
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

              <form onSubmit={signupSubmit} className="auth-form">
                <div className="row text-start">
                  <div className="col-6 mb-3">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <input
                        type="text"
                        name="fname"
                        onChange={handleChange}
                        value={formData.fname}
                        className="form-control shadow-none py-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="form-group">
                      <label className="form-label">Last name</label>
                      <input
                        type="text"
                        name="lname"
                        onChange={handleChange}
                        value={formData.lname}
                        className="form-control shadow-none py-2"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group position-relative">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="form-control shadow-none py-2"
                        required
                      />
                      {emailValid ? (
                        <img
                          src={Inputcheck}
                          alt=""
                          width="30"
                          className="position-absolute top-50 end-0 translate-middle-y verified-check"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={verifycaptchaFunction}
                  onExpired={expiredcaptchaFunction}
                  className="my-3 d-flex justify-content-center"
                />
                <button
                  type="submit"
                  className="btn w-100 submit-button py-2"
                  disabled={!verifyCaptcha}
                >
                  Continue
                  <HiOutlineArrowRight className="my-auto ms-2" />
                </button>
              </form>
              <div className="form-footer-text mt-4">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-fill d-xl-block d-none">
          <div className="secondary-section position-relative d-flex align-items-center justify-content-center">
            <img src={Ellipse1} alt="" width="410" className="signup-thread1" />
            <img
              src={Ellipse2}
              alt=""
              className="position-absolute signup-thread2"
            />
            <motion.img
              src={Textbox1}
              alt=""
              className="position-absolute signup-text1"
              animate={{
                y: [0, -1, 1, -1.5, 1.5, -1, 1, 0],
              }}
              transition={{
                duration: 6,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            <motion.img
              src={Sidegirl}
              alt=""
              height="630"
              className="position-absolute signup-girl"
              animate={{
                x: [0, -1, 1, -1.5, 1.5, -1, 1, 0],
              }}
              transition={{
                duration: 6,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            <motion.img
              src={Textbox2}
              alt=""
              className="position-absolute signup-text2"
              animate={{
                y: [0, -1, 1, -1.5, 1.5, -1, 1, 0],
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
              }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="deepline-loader">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Signup;
