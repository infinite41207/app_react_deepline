import { useState } from "react";
import IntegrationIcon from "../../icons/IntegrationIcon";
import "./Integration.scss";

export default function Integration(props) {
    const [active, setActive] = useState(false)
  return (
    <div className="integration">
      <div className="d-flex justify-content-between">
        <IntegrationIcon />
        <div className="mx-2">
          <label className="switch mt-1">
            <input type="checkbox" onChange={() => setActive(!active)}/>
            <span
              className={`switch-slider round ${active ? 'active' : ''}`}
            ></span>
          </label>
        </div>
      </div>
      <div className="title">
        {props.title}
      </div>
      <div className="desc">
        {props.desc}
      </div>
    </div>
  );
}
