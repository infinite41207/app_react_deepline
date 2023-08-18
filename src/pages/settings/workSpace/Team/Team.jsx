import { useState } from "react";

import SettingsNav from "../../../../components/SettingsNav/SettingsNav";
import SlashIcon from "../../../../icons/SlashIcon";
import DefaultAvatar from "../../../../assets/images/default_avatar.png";
import { BsSearch } from "react-icons/bs";
import "./Team.scss";
import InviteModal from "../../../../components/Invite/Invite";
import UsersGroupIcon from "../../../../icons/UsersGroupIcon";

export default function Team() {
  const [isShowInvite, setIsShowInvite] = useState(false);
  return (
    <>
      {isShowInvite && <InviteModal onClose={() => setIsShowInvite(false)} />}
      <div className="d-flex">
        <SettingsNav />

        <section className="settings-right-section col">
          <div className="row">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between">
                <h2 className="heading-title">Team</h2>
                <div className="additional-text">2 team members</div>
              </div>

              <div className="teams mt-4">
                <div className="team-search">
                  <span className="search-icon">
                    <BsSearch />
                  </span>
                  <input placeholder="Search..." />
                  <span className="slash-icon">
                    <SlashIcon />
                  </span>
                </div>

                <table className="table teams mt-3">
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Role</th>
                      <th>Usage Limits</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={DefaultAvatar}
                          alt="user avatar"
                          className="user-avatar"
                        />
                        <div className="text-start">
                          <div className="username">John Doe</div>
                          <div className="useremail">johndoe@gmail.com</div>
                        </div>
                      </div>
                    </td>
                    <td>admin</td>
                    <td>
                      <input value={"35,000"} />
                    </td>
                    <td>Nov 16</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={DefaultAvatar}
                          alt="user avatar"
                          className="user-avatar"
                        />
                        <div className="text-start">
                          <div className="username">John Doe</div>
                          <div className="useremail">johndoe@gmail.com</div>
                        </div>
                      </div>
                    </td>
                    <td>member</td>
                    <td>
                      <input value={"35,000"} />
                    </td>
                    <td>Feb 1</td>
                  </tr> */}
                    <tr>
                      <td className="text-center no-member py-3" colSpan={4}>
                        Sorry, there are no member on your team right now
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button type="submit" className="btn-coral text-white mt-5 px-4" onClick={() => setIsShowInvite(!isShowInvite)}>
                <span className="me-2">
                  <UsersGroupIcon />
                </span>
                Invite team members
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
