import { useEffect } from "react";
import { createContext, useState } from "react";

import moment from "moment";

import { getUsageDetails } from "../API/payment";

export const CreditContext = createContext();

const CreditContextProvider = (props) => {
  const [hasCredits, setHasCredits] = useState(true);
  const [isTrialPackage, setIsTrialPackage] = useState(false);
  const [remainingDays, setRemainingDays] = useState("");
  const updateHasCredit = async () => {
    const res = await getUsageDetails();
    const isActive = res.header_data.is_package_active;
    const isSubscriptionActive = res.data.subscription_status === "active";
    // const total = res.data.allowed_words;
    // const spent = res.data.consumed_words;
    if (res.data.status === "in_trial") {
      setIsTrialPackage(true);
      const a = moment();
      const b = moment(res.data.trial_end);
      setRemainingDays(Number(b.diff(a, "days")));
    }
    if (!isActive || !isSubscriptionActive) {
      setHasCredits(false)
      console.log('hascredit false');
    } else {
      setHasCredits(true)
      console.log('hascredit true')
    }
    
  };
  return (
    <CreditContext.Provider
      value={{
        hasCredits,
        isTrialPackage,
        setIsTrialPackage,
        remainingDays,
        updateHasCredit,
      }}
    >
      {props.children}
    </CreditContext.Provider>
  );
};

export default CreditContextProvider;
