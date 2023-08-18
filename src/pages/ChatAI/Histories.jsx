import { useState } from "react";
import MoreIcon from "../../icons/MoreIcon";
import "./scss/History.scss";
export default function Histories(props) {
  const [isCollapse, setIsCollapse] = useState(false);
  const handlePageChange = (pageName) => {
    setIsCollapse(false);
    props.onPageChange(pageName);
    props.onPageToggle(false);
  };

  const handlePageToggle = () => {
    setIsCollapse(true);
    props.onPageToggle(true);
  };

  const handleGetHistoryOutput = (id) => {
    props.onGetHistoryOutput(id)
  }

  function dateFormat(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    // <div className={`history-section ${isCollapse ? "border-show" : ""}`}>
    <div className={`history-section`}>
      <div className="button-group gap-3 d-none d-lg-flex p-3 justify-content-end">
        <button
          className={!isCollapse ? "active" : ""}
          onClick={() => handlePageChange("newChat")}
        >
          + New Chat
        </button>
        <button
          className={`${isCollapse ? "active" : ""} me-lg-5`}
          onClick={() => handlePageToggle()}
        >
          History
        </button>
      </div>

      <div className={`${isCollapse ? "collaped" : ""} histories theme-scrollbar px-3 pt-3`}>
        {props.allHistories &&
          props.allHistories.map((e, i) => (
            <button key={e.name + i} className={`history ${props.currentId === e._id ? 'active' : ''}`} onClick={() => handleGetHistoryOutput(e._id)}>
              <span className="title">{e.name}</span>
              <div className="created-at d-flex gap-2 align-items-center">
                {dateFormat(e.created)}
                <MoreIcon />
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
