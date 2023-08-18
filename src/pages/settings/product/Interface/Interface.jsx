import { useState } from "react";
import SettingsNav from "../../../../components/SettingsNav/SettingsNav";
import MoonIcon from "../../../../icons/MoonIcon";
import './Interface.scss';

export default function Interface() {
  const [active, setActive] = useState(false);
  return (
    <div className="d-flex">
      <SettingsNav />

      <section className="settings-right-section col">
        <h2 className="heading-title">Interface settings</h2>
        <p className="heading-desc">Adjust product user interface options.</p>

        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="dark-mode">
              <div className="d-flex justify-content-between">
                <MoonIcon />

                <label className="switch mt-1">
                  <input type="checkbox" onChange={() => setActive(!active)} />
                  <span
                    className={`switch-slider round ${active ? "active" : ""}`}
                  ></span>
                </label>
              </div>
              <div className="title">Dark Mode (Beta)</div>
              <div className="desc">
                Enable dark mode for deepline.ai. This feature is in beta, and
                only available in the Document Editor view.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
