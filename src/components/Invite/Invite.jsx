import { useState } from "react";
import { ReactMultiEmail } from "react-multi-email";
import Jane from "../../assets/images/invite/Jane.svg";
import Robert from "../../assets/images/invite/Robert.svg";
import John from "../../assets/images/invite/John.svg";
import Copy from "../../assets/images/invite/Copy.svg";
import Detail from "../../assets/images/invite/Detail.svg";
import "react-multi-email/dist/style.css";

import "./Invite.scss";

export default function Invite(props) {
  const [emails, setEmails] = useState([]);
  const [isShow, setIsShow] = useState(true);

  return (
    <>
      <div className="invite-backdrop" onClick={props.onClose}></div>
      <div className="invite-container position-absolute p-5">
        <h1 className="heading">Invite your team member</h1>
        <p className="desc">
          Email a unique link to your team member or team members (comma
          separated) to join your account.
        </p>
        <div className="d-flex align-items-start invite-input-group mb-4">
          <ReactMultiEmail
            placeholder=""
            emails={emails}
            autoFocus={true}
            onChange={(emails) => {
              setEmails(emails);
            }}
            getLabel={(email, index, removeEmail) => {
              return (
                <div data-tag key={index}>
                  <div data-tag-item>{email}</div>
                  <span data-tag-handle onClick={() => removeEmail(index)}>
                    ×
                  </span>
                </div>
              );
            }}
          />
          <button className="px-3 py-2">Send invite</button>
        </div>
        <div className="team">
          <div className="heading mb-3">Team Members</div>
          {/* <div className="member d-flex mb-3">
            <img src={Jane} alt="avatar" className="me-3" />
            <div className="info">
              <div className="name">Jane Cooper</div>
              <div className="email">jane.cooper@gmail.com</div>
            </div>
          </div> */}
          <p className="no-members mb-5">
            Sorry, there are no member on your team right now
          </p>
        </div>
        <div className="invite-link">
          <div className="heading mb-3">Link to invite</div>
          <div className="desc mb-3">
            Generate a unique link you can share with your team to join your
            account. This link will expire in 2 weeks.
          </div>
          <div className="link-gen d-flex justify-content-between align-items-center gap-2">
            <div className="link py-2 px-3 text-truncate">
              https://app.deepline.ai/join/238867f4-94ca-4182-ba6b-e7d...
            </div>
            <button className="px-3 py-2">
              <img src={Copy} alt="copy" />
            </button>
            <button className="px-3 py-2">
              <img src={Detail} alt="detail" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
