import { useEffect, useState } from "react";
import { updateOutputRecord } from "../../API/template";
import $ from "jquery";
/* No Fill */
import Star from "../../assets/images/dashboard/output-section/favourite.svg";
import Like from "../../assets/images/dashboard/output-section/like.svg";
import Unlike from "../../assets/images/dashboard/output-section/unlike.svg";
/* With Fill */
import Starfill from "../../assets/images/dashboard/output-section/favouritefill.svg";
import Likefill from "../../assets/images/dashboard/output-section/likefill.svg";
import Unlikefill from "../../assets/images/dashboard/output-section/unlikefill.svg";
/* Social Icon With Change State */
import Comment from "../../assets/images/dashboard/output-section/comment.svg";
import Copy from "../../assets/images/dashboard/output-section/copy.svg";

// components
import TextArea from "../Input/TextArea/index";

export default function Models(props) {
  const [allmodels, setAllmodels] = useState([]);

  useEffect(() => {
    if (props.allmodels) setAllmodels(props.allmodels);
  }, [props]);

  const [textTimeout, setTextTimeout] = useState("");

  const sendOutputRequest = async (generated_data) => {
    try {
      const response = await updateOutputRecord(generated_data._id, {
        generated_text: generated_data.generated_text,
        isFavourite: generated_data.isFavourite,
        isLiked: generated_data.isLiked,
        isUnliked: generated_data.isUnliked,
      });
      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      console.log(error);
    }
  };

  const handleUpdateOutput = (e, index, type) => {
    console.log(e, index, type);
    let generated_data = "";
    setAllmodels(
      allmodels.map((e2, i2) => {
        if (i2 === index) {
          if (e.target.value) e2.generated_text = e.target.value;
          generated_data = e2;
        }
        return e2;
      })
    );
    if (type === "text") {
      if (textTimeout) {
        clearTimeout(textTimeout);
      }

      setTextTimeout(
        setTimeout(() => {
          sendOutputRequest(generated_data);
        }, 500)
      );
    } else {
      if (type === "favourite") {
        if (generated_data.isFavourite === true) {
          generated_data.isFavourite = false;
        } else {
          generated_data.isFavourite = true;
        }
      }
      if (type === "like") {
        if (generated_data.isLiked === true) {
          generated_data.isLiked = false;
        } else {
          generated_data.isLiked = true;
          generated_data.isUnliked = false;
        }
      }
      if (type === "unlike") {
        if (generated_data.isUnliked === true) {
          generated_data.isUnliked = false;
        } else {
          generated_data.isUnliked = true;
          generated_data.isLiked = false;
        }
      }
      sendOutputRequest(generated_data);
    }
  };

  /* Copy To Clipboard Function */
  const copyToClipBoard = async (e) => {
    const mainDiv = $(e.target)
      .closest(".outputMainDiv")
      .find(".output-content");
    console.log(mainDiv.text());
    $("textarea", mainDiv).select();
    document.execCommand("copy");
    await navigator.clipboard.writeText(mainDiv.text());
  };

  const downloadDocs = (e) => {
    const mainDiv = $(e.target)
      .closest(".outputMainDiv")
      .find(".output-content")
      .text();
    const element = document.createElement("a");
    const file = new Blob([mainDiv], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "yr ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "m ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "hr ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "min ago";
    }
    return "Just now";
  }

  return (
    <>
      {allmodels &&
        allmodels.map((elem, index) => {
          return (
            <div className="outputMainDiv" key={index}>
              <TextArea
                className={`output-content theme-scrollbar form-control shadow-none px-3 py-2 ${
                  index + 1 <= props.newoutputCount
                    ? "output-content-bg-green"
                    : "output-content-bg-white"
                }`}
                name="generate_text"
                value={elem.generated_text}
                onChange={(e) => handleUpdateOutput(e, index, "text")}
              />
              <div className="d-flex justify-content-between output-stats mt-2 mb-3">
                <div className="d-flex justify-content-start gap-2">
                  <button
                    className="btn shadow-none p-0 border d-flex align-items-center border-0"
                    onClick={(e) => handleUpdateOutput(e, index, "favourite")}
                  >
                    {elem.isFavourite ? (
                      <img src={Starfill} alt="" />
                    ) : (
                      <img src={Star} alt="" />
                    )}
                    <span className="d-none d-lg-flex ms-lg-2">favourite</span>
                  </button>
                  <button
                    className="btn shadow-none d-flex align-items-center p-0 border border-0"
                    onClick={copyToClipBoard}
                  >
                    <img src={Copy} alt="" />
                    <span className="d-none d-lg-flex ms-lg-2">Copy</span>
                  </button>
                  <button
                    className="btn shadow-none p-0 border d-flex align-items-center border-0"
                    onClick={downloadDocs}
                  >
                    <img src={Comment} alt="" />
                    <span className="d-none d-lg-flex ms-lg-2">
                      Download Doc
                    </span>
                  </button>
                  <button
                    className="btn shadow-none p-0 border d-flex align-items-center border-0"
                    onClick={(e) => handleUpdateOutput(e, index, "like")}
                  >
                    {elem.isLiked ? (
                      <img src={Likefill} alt="" />
                    ) : (
                      <img src={Like} alt="" />
                    )}
                    <span className="d-none d-lg-flex ms-lg-2">Like</span>
                  </button>
                  <button
                    className="btn d-flex align-items-center shadow-none p-0 border border-0"
                    onClick={(e) => handleUpdateOutput(e, index, "unlike")}
                  >
                    {elem.isUnliked ? (
                      <img src={Unlikefill} alt="" />
                    ) : (
                      <img src={Unlike} alt="" />
                    )}
                    <span className="d-none d-lg-flex ms-lg-2">Dislike</span>
                  </button>
                </div>
                <div className="my-auto">
                  {timeSince(new Date(elem.created))}
                </div>
              </div>
              {props.allmodels.length - 1 !== index && (
                <div className="output-divider mb-4"></div>
              )}
            </div>
          );
        })}

      {props.loading && props.page === "history" && (
        <div className="text-center py-5 mt-5">
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
    </>
  );
}
