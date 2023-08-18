import "./auth.css";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { LoginSocialGoogle } from "reactjs-social-login";

import { HiOutlineArrowRight } from "react-icons/hi";

/* Images */
import Inputcheck from "../../assets/images/auth/input-verified-check.svg";
import googleBtnImg from "../../assets/images/auth/google-signin-btn.png";
import { signIn, signInWithSocial, signUpWithSocial } from "../../API/auth";

// context
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [verifyCaptcha, setVerifyCaptcha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    callback_url: `${process.env.REACT_APP_BASE_URL}/verify-otp`,
  });
  const navigate = useNavigate();
  const { doSetUser, toFreeTrial } = useContext(AuthContext);

  const verifycaptchaFunction = (value) => {
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
  const loginSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();
    setLoading(true);
    try {
      const res = await signIn(formData);
      if (res.data.status_code === 200) {
        doSetUser(res.data.data);
        navigate(`/verify-otp/${res.data.data.id}/${formData.email}/""`);
      }
    } catch (error) {
      setLoading(false);
      let status_code = error.response.data.status_code;
      if (status_code === 401 || status_code === 403 || status_code === 404) {
        setAlertMessage(error.response.data.message);
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
      if (toFreeTrial) {
        navigate(toFreeTrial);
      } else {
        navigate("/templates");
      }
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
        if (toFreeTrial) {
          navigate(toFreeTrial);
        } else {
          // navigate("/templates");
          navigate("/freetrial/starter/true/10000")
        }
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
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center login-maxWidth">
          <div className="mb-4">
            <a
              href={process.env.REACT_APP_FRONTEND_BASE_URL}
              className="navbar-brand"
            >
              deepline<span className="text-warning-1">.</span>ai
            </a>
          </div>
          <h2 className="form-title mb-4">Sign in to your account</h2>
          <div>
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
              Or sign in with your email
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

          <form onSubmit={loginSubmit} className="auth-form">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={verifycaptchaFunction}
              onExpired={expiredcaptchaFunction}
              className="mt-3 mb-2 d-flex justify-content-center"
            />
            <div className="row text-start mb-4">
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
            <button
              type="submit"
              className="btn w-100 submit-button py-2"
              disabled={!verifyCaptcha}
            >
              Continue with Email
              <HiOutlineArrowRight className="my-auto ms-2" />
            </button>
          </form>
          <div className="form-footer-text mt-4">
            Don't have an account yet?{" "}
            <Link to="/signup">Get started here</Link>
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

export default Login;
