import SettingsNav from "../../../components/SettingsNav/SettingsNav";
import DefaultAvatar from "../../../assets/images/default_avatar.png";

export default function General() {
  return (
    <div className="d-flex">
      <SettingsNav />

      <section className="settings-right-section col">
        <h2 className="heading-title">Company Information</h2>
        <p className="heading-desc">Tell us about your business</p>

        <div className="mt-5">
          <img src={DefaultAvatar} alt="default avatar" width={52} />
          <form className="profile-settings-form mt-4">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Company name</label>
                  <input
                    className="form-control"
                    name="companyName"
                    placeholder="Type your Company name"
                  />
                </div>
              </div>
              <div className="col-lg-6 mt-3">
                <div className="form-group">
                  <label>Primary website domain</label>
                  <input
                    className="form-control"
                    name="websiteDomain"
                    placeholder="Type your website address"
                  />
                </div>
              </div>
              <div className="col mt-3">
                <div className="form-group">
                  <label>Billing email</label>
                  <input
                    className="form-control"
                    name="billingEmail"
                    placeholder="Type your billing email"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-coral text-white mt-4">Save</button>
          </form>
        </div>
      </section>
    </div>
  );
}
