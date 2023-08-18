import SettingsNav from "../../../components/SettingsNav/SettingsNav";
import "../Settings.scss";

export default function Profile() {
  return (
    <div className="d-flex">
      <SettingsNav />

      <section className="settings-right-section">
        <h2 className="heading-title">Profile settings</h2>

        <form className="profile-settings-form mt-3 mt-lg-5">
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <label>First name</label>
                <input
                  className="form-control"
                  name="fname"
                  placeholder="Type first name"
                />
              </div>
              <div className="col-md-6">
                <label>Last name</label>
                <input
                  className="form-control"
                  name="lname"
                  placeholder="Type last name"
                />
              </div>
              <div className="col-12 mt-3">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  placeholder="Type your email"
                />
              </div>
            </div>
            <button type="submit" className="btn-coral text-white mt-4">Save</button>
          </div>
        </form>
      </section>
    </div>
  );
}
