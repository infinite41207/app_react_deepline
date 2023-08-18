import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsNav from "../../../../components/SettingsNav/SettingsNav";
import TrashIcon from "../../../../icons/TrashIcon";
import { AuthContext } from "../../../../contexts/AuthContext";
import { getDeleteAccountOTP } from "../../../../API/auth";
import "../../Settings.scss";

export default function DeleteAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const { me } = useContext(AuthContext);
  const navigate = useNavigate();
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
    <div className="d-flex">
      <SettingsNav />

      <section className="settings-right-section col">
        <h2 className="heading-title">Delete Account</h2>
        <p className="heading-desc">
          Delete your account and information permanently
        </p>

        <div className="del-account-card w-100">
          <TrashIcon />
          <div className="heading-2 mt-1 mb-2">Delete My Account</div>
          <p className="pe-lg-5">
            If you would like to discontinue your partnership with deepline.ai
            and have your account removed from our system, we can assist you
            with this process. It is important to note that this action is
            permanent, and once the account is deleted, all data and information
            associated with the account will be lost and cannot be recovered. If
            you still wish to proceed with the account deletion, please click on
            "Delete My Account".
          </p>
          <div className="d-sm-flex gap-3 justify-content-end mt-4">
            <button className="btn-coral px-4 mb-3 mb-sm-0" onClick={handleDelete}>
              <span className={isLoading ? "opacity-0" : "opacity-1"}>
                Delete My Account
              </span>
              <div
                className={
                  (isLoading ? "" : "d-none") + " spinner-border"
                }
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
            <button className="btn-grey px-4" onClick={() => window.history.back()}>Cancel</button>
          </div>
        </div>
      </section>
    </div>
  );
}
