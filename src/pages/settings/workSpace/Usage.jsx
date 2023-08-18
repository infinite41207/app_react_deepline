import { useState, useEffect, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import SettingsNav from "../../../components/SettingsNav/SettingsNav";
import CreditIcon from "../../../icons/CreditIcon";
// import { BsSearch } from "react-icons/bs";
// import SlashIcon from "../../../icons/SlashIcon";
// import DefaultAvatar from "../../../assets/images/default_avatar.png";
import { CreditContext } from "../../../contexts/CreditContext";
import UpgradeCreditAlert from "../../../components/UpgradeCreditAlert/UpgradeCreditAlert";
import CountUp from "react-countup";

import { getUsageDetails } from "../../../API/payment";
import { getAllTemplates } from "../../../API/template";

import "../Settings.scss";

export default function Usage() {
  const [isTeam, setIsTeam] = useState(true);
  const [templatesCount, setTemplatesCount] = useState(0);
  const [usageDetails, setUsageDetails] = useState({});
  const [packageDetails, setPackageDetails] = useState({});
  const [chartDatas, setChartDatas] = useState({});
  const { hasCredits } = useContext(CreditContext);
  const [isAlertShow, setIsAlertShow] = useState(false);

  const getTemplatesCount = async () => {
    try {
      const res = await getAllTemplates();
      console.log(res.length);
      setTemplatesCount(res.length);
      let charts = [];
      res.map((item, index) => {
        charts.push({
          credits: item.characters,
          date: formatDate(item.created),
        });
      });
      setChartDatas(charts);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  const formatDate = (string) => {
    return new Date(string || new Date()).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDetails = async () => {
    try {
      const res = await getUsageDetails();
      setUsageDetails(res.data);
      setPackageDetails(res.header_data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDetails();
    getTemplatesCount();
  }, []);

  useEffect(() => {
    if (!hasCredits) {
      setIsAlertShow(true);
    }
  }, [hasCredits]);

  return (
    <div className="d-flex">
      {isAlertShow && (
        <UpgradeCreditAlert onCloseClick={() => setIsAlertShow(false)} />
      )}
      <SettingsNav />

      <section className="settings-right-section col">
        <div className="d-flex align-items-center justify-content-between flex-column flex-lg-row flex-md-row">
          <div>
            <h2 className="heading-title text-center text-lg-start text-md-start">Usage</h2>
            <p className="heading-desc">
              Learn how your team is using deepline.ai
            </p>
          </div>
          <div className="mb-3 mb-lg-0 mb-md-0 btn-groups">
            <button
              className={`user-rol-btns me-2 mb-2 mb-sm-0 ${
                isTeam ? "active" : ""
              }`}
              onClick={() => setIsTeam(true)}
            >
              All team
            </button>
            <button
              className={`user-rol-btns me-2 mb-2 mb-sm-0 ${
                !isTeam ? "active" : ""
              }`}
              onClick={() => setIsTeam(false)}
            >
              Individual
            </button>
          </div>
        </div>

        <div className="usage-section p-lg-4">
          <div className="usage-deadline text-center text-lg-start text-md-start">{`Credit usage for 
            ${formatDate(usageDetails.valid_from)}
           - ${formatDate()}`}</div>

          <div className="row usage-notice">
            <div className="col-lg-4">
              <div className="usage-info">
                <CreditIcon />
                <h4 className="mt-2">Credits used</h4>
                <h1>
                  <CountUp
                    end={Number(usageDetails.consumed_words || 0)}
                    duration={2}
                  />
                </h1>
                <div className="progress-bar mt-4 mb-3">
                  <div
                    className="progress-bar-inner"
                    style={{
                      width: `${
                        Math.ceil(
                          (100 / Number(usageDetails.allowed_words)) *
                            Number(usageDetails.consumed_words)
                        ) || 0
                      }%`,
                    }}
                  ></div>
                </div>
                <p>
                  <CountUp
                    end={
                      Math.ceil(
                        (100 / Number(usageDetails.allowed_words)) *
                          Number(usageDetails.consumed_words)
                      ) || 0
                    }
                    duration={2}
                  />
                  % of plan credits used
                </p>
              </div>
            </div>
            {isTeam && (
              <div className="col-lg-4 col-md-6">
                <div className="usage-info">
                  <h4 className="mt-2">Active users</h4>
                  <h1>
                    <CountUp end={Number(1)} duration={2} />
                  </h1>
                </div>
              </div>
            )}
            <div className="col-lg-4 col-md-6">
              <div className="usage-info">
                <h4 className="mt-2">Templates</h4>
                <h1>
                  <CountUp end={Number(templatesCount)} duration={2} />
                </h1>
              </div>
            </div>
          </div>

          <div className="chart-section">
            <BarChart width={1200} height={300} data={chartDatas}>
              <XAxis dataKey="date" />
              <YAxis
                axisLine={true}
                // domain={[0, "dataMax + 500"]}
              />
              <CartesianGrid
                stroke="#ccc"
                strokeDasharray="2 2"
                vertical={false}
              />
              <Bar
                dataKey="credits"
                fill="#a700f1"
                barSize={20}
                radius={[50, 50, 0, 0]}
              />
            </BarChart>
          </div>

          {/* {isTeam && (
            <div className="teams">
              <div className="team-search">
                <span className="search-icon">
                  <BsSearch />
                </span>
                <input placeholder="Search..." />
                <span className="slash-icon">
                  <SlashIcon />
                </span>
              </div>

              <table className="table usage mt-3">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Credit Used</th>
                    <th>Generations</th>
                    <th>Templates</th>
                    <th>Projects</th>
                  </tr>
                </thead>
                <tbody>
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
                    <td>admin</td>
                    <td>45</td>
                    <td>6</td>
                    <td>6</td>
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
                    <td>36</td>
                    <td>9</td>
                    <td>9</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )} */}
        </div>
      </section>
    </div>
  );
}
