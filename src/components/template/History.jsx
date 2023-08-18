import { useEffect, useState } from "react";
import { getHistoryOutput, getHistories } from "../../API/template";
import "./template.scss";
import Models from "./Models";
import { useRef } from "react";

import { useNavigate } from "react-router-dom";

export default function History(props) {
  const [allhistories, setAllHistories] = useState("");
  const [historyTitle, setHistoryTitle] = useState("");
  const [allmodels, setAllmodels] = useState([]);
  const [lastRecordId, setLastRecordId] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyloading, setHistoryloading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const historiesRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
      if (allmodels.length > 0) {
        console.log("okok");
        window.history.go(1);
        setAllmodels([]);
        setCollapsed(!collapsed);
        setHistoryTitle("");
      } else {
        navigate("/templates");
      }
    };
  }, [allmodels]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!historiesRef.current.contains(e.target)) {
      setCollapsed(false);
    }
  };

  const fetchHistories = async () => {
    setHistoryloading(true);
    try {
      const response = await getHistories({
        last_rec_id: lastRecordId,
        text_type: props.typeText,
      });
      setAllHistories(response.data.data);
      let resLeng = response.data.data.length;
      if (resLeng > 0) {
        let lastObj = response.data.data[resLeng - 1];
        setLastRecordId(lastObj._id);
      }
      setHistoryloading(false);
    } catch (error) {
      setHistoryloading(false);
    }
  };

  const getSingleHistory = async (historyId, output_title) => {
    setCollapsed(false);
    setAllmodels([]);
    setHistoryTitle(output_title);
    setLoading(true);
    try {
      const response = await getHistoryOutput(historyId);
      setLoading(false);
      setAllmodels(response.data.data);
    } catch (error) {
      setLoading(false);
    }
  };

  function dateFomat(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <div className="row m-0 w-100">
        <div className="col-lg-6 py-3 order-2 order-lg-1 px-4">
          <div
            ref={historiesRef}
            className={`histories-section ${collapsed ? "collapsed" : ""}`}
          >
            <div className="d-lg-none">
              <div className="bg-white db-heading-1 px-4 db-header d-flex align-items-center">
                {props.icon && (
                  <img
                    src={require(`../../assets/images/dashboard/form-title-pics/${props.icon}.svg`)}
                    alt=""
                    className="me-2"
                  />
                )}
                {props.typeText}
              </div>
              <div className="bg-white db-heading-2 px-4 pb-3 bb-1px-link-water">
                {props.desc}
              </div>
            </div>
            <div className="d-flex justify-content-center my-3 gap-3 d-lg-none">
              <button
                className="btn shadow-none right-section-btn"
                onClick={() => props.onChangePage("newOutput")}
              >
                New Outputs
              </button>
              <button
                className="btn shadow-none  right-active-btn"
                onClick={() => props.onChangePage("history")}
              >
                History
              </button>
            </div>
            {allhistories &&
              allhistories.map((elem, index) => {
                return (
                  <button
                    onClick={() => getSingleHistory(elem._id, elem.text)}
                    className="d-flex justify-content-between history-content-section px-4 py-2 mb-2 w-100"
                    key={index}
                  >
                    <div className="history-content-title">{elem.text}</div>
                    <div className="history-content-date-time my-auto ms-3">
                      {dateFomat(elem.created)}
                    </div>
                  </button>
                );
              })}
            {historyloading && (
              <div className="text-center mt-5">
                <div
                  className="spinner-border"
                  role="status"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    color: "#5401AF",
                  }}
                >
                  <span className="sr-only visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2 model-section p-0">
          <div className="bg-white db-heading-1 px-4 py-3 db-header bb-1px-link-water d-flex justify-content-between">
            <div className="d-flex gap-3">
              <button
                className="btn shadow-none right-section-btn"
                onClick={() => props.onChangePage("newOutput")}
              >
                New Outputs
              </button>
              <button
                className="btn shadow-none right-active-btn"
                onClick={() => setCollapsed(!collapsed)}
              >
                History
              </button>
            </div>
          </div>
          <div className="row m-0 px-4 py-3 overflow-auto theme-scrollbar histories-output-section">
            <h1 className="history-output-title mb-4">{historyTitle}</h1>
            <div className="col-12 p-0">
              <Models
                allmodels={allmodels}
                loading={loading}
                page="history"
                setLoading={() => setLoading(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
