import Integration from "../../../components/Integration/Integration";
import SettingsNav from "../../../components/SettingsNav/SettingsNav";

export default function Integrations() {
  return (
    <div className="d-flex">
      <SettingsNav />

      <section className="settings-right-section col">
        <h2 className="heading-title">Integrations settings</h2>
        <p className="heading-desc">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor.
        </p>

        <div className="row">
          <div className="col-lg-4">
            <Integration
              title="Integration One"
              desc="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
            />
          </div>
          <div className="col-lg-4">
            <Integration
              title="Integration Two"
              desc="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
            />
          </div>
          <div className="col-lg-4">
            <Integration
              title="Integration Three"
              desc="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
