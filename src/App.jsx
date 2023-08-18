import React, { useContext, useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";

import { CreditContext } from "./contexts/CreditContext";

import "aos/dist/aos.css";

/* CDNS */
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; /* Include Bootstrap 5 CSS */
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"; /* Include Bootstrap 5 JS */

/* Components */
import Signup from "./pages/auth/Signup"; /* Include Signup */
import Login from "./pages/auth/Login" /* Include Login */;
import Verifyotp from "./pages/auth/Verifyotp"; /* Include Verify OTP */

/* Include Template Screens */
import LimitedCreditAlert from "./components/LimitedCreditAlert/LimitedCreditAlert";
import Dashboard from "./pages/templates/Dashboard";
import Profile from "./pages/settings/personal/Profile";
import DeleteAccount from "./pages/settings/personal/DeleteAccount/index";
import DeleteAccountVerify from "./pages/settings/personal/DeleteAccount/verify";
import DeleteAccountConfirm from "./pages/settings/personal/DeleteAccount/confirm";
import Integrations from "./pages/settings/product/Integrations";
import Usage from "./pages/settings/workSpace/Usage";
import Notfound404 from "./components/errorscreens/Notfound404"; /* Include 404 Not Found */
import ChatAI from "./pages/ChatAI/ChatAI";
import ChatBox from "./pages/ChatAI/ChatBox";

/*---------------For GTM Tracking----------------- */
import TagManager from "react-gtm-module";
import Template from "./pages/templates/Template";
import Interface from "./pages/settings/product/Interface/Interface";
import General from "./pages/settings/workSpace/General";
import Team from "./pages/settings/workSpace/Team/Team";
import Billing from "./pages/settings/workSpace/Billing/Billing";
import Create from "./pages/settings/workSpace/Billing/Subscription/Create";
import Invoice from "./pages/settings/workSpace/Billing/Invoice/Invoice";
import RenewSubscription from "./pages/RenewSubscription/RenewSubscription";
import FreeTrial from "./components/FreeTrial/FreeTrial";

const tagManagerArgs = {
  gtmId: "G-1PNQR5ZFHF",
};
TagManager.initialize(tagManagerArgs);
/*---------------For GTM Tracking----------------- */

const App = () => {
  const { isTrialPackage, setIsTrialPackage, updateHasCredit, remainingDays } =
    useContext(CreditContext);
  const [isAlertShow, setIsAlertShow] = useState(false);
  window.dataLayer.push({
    event: "pageview",
  });

  useEffect(() => {
    updateHasCredit();
    console.log('okok');
    AOS.init();
    return () => AOS.refresh();
  }, []);

  useEffect(() => {
    console.log("isTrialPackage", isTrialPackage);
    setIsAlertShow(isTrialPackage);
  }, [isTrialPackage]);

  /* Disable Right Click In App */
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  const handleCloseAlert = () => {
    setIsTrialPackage(false);
    const timeout = setTimeout(() => {
      updateHasCredit();
    }, 14400000);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      {isAlertShow && (
        <LimitedCreditAlert onClose={handleCloseAlert} days={remainingDays} />
      )}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          exact
          path="verify-otp/:id/:email/:otp/"
          element={<Verifyotp />}
        />
        {/* <Route exact path='/verify-otp/:id?/:otp?' element={<Verifyotp/>} /> */}
        <Route exact path="/templates" element={<Dashboard />} />
        <Route exact path="/template/:tempName" element={<Template />} />
        <Route exact path="/settings/personal/profile" element={<Profile />} />
        <Route
          exact
          path="/settings/personal/delete-account"
          element={<DeleteAccount />}
        />
        <Route
          exact
          path="/settings/personal/delete-account/verify"
          element={<DeleteAccountVerify />}
        />
        <Route
          exact
          path="/delete-account-confirmed"
          element={<DeleteAccountConfirm />}
        />
        <Route
          exact
          path="/settings/product/integrations"
          element={<Integrations />}
        />
        <Route
          exact
          path="/settings/product/interface"
          element={<Interface />}
        />
        <Route exact path="/settings/workspace/general" element={<General />} />
        <Route exact path="/settings/workspace/billing" element={<Billing />} />
        <Route
          exact
          path="/renew-subscription"
          element={<RenewSubscription />}
        />
        <Route
          exact
          path="/settings/workspace/billing/subscription/create"
          element={<Create />}
        />
        <Route
          exact
          path="/freetrial/:type/:monthly/:credits/"
          element={<FreeTrial />}
        />
        <Route
          exact
          path="/settings/workspace/billing/invoice"
          element={<Invoice />}
        />
        <Route exact path="/settings/workspace/team" element={<Team />} />
        <Route exact path="/settings/workspace/usage" element={<Usage />} />
        <Route exact path="/chat-ai" element={<ChatAI />} />
        <Route exact path="/chat-ai/:field" element={<ChatBox />} />

        <Route path="*" exact={true} element={<Notfound404 />} />
      </Routes>
    </>
  );
};

export default App;
