/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import AIAvatar from "../../assets/images/chatai/ai_avatar.svg";
import DefaultAvatar from "../../assets/images/chatai/avatar1.svg";
import "./scss/ChatAI.scss";
import { useRef } from "react";
import EditIcon from "../../icons/EditIcon";
import HandThumbsUp from "../../icons/HandThumbsUp";
import HandThumbsDown from "../../icons/HandThumbsDown";

export default function ChatBox(props) {
  const listRef = useRef();

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [props]);

  return (
    <div ref={listRef} className={props.className}>
      {props.messages.map((e, i) => (
        <div
          key={i}
          className={`${
            !e.is_msg_sent_by_me ? "send-by-ai" : ""
          } message-box d-flex align-items-start justify-content-between gap-4`}
        >
          {e.is_msg_sent_by_me ? (
            <div className="sent-by-user d-flex justify-content-between align-items-end w-100">
              <div className="d-block d-lg-flex d-md-flex gap-3 align-items-start">
                <img src={DefaultAvatar} width={23} className="d-block d-lg-block d-md-block my-3 my-lg-0 my-md-0" alt="user avatar" />
                {e.message}
              </div>
              <a href="#">
                <EditIcon />
              </a>
            </div>
          ) : (
            <div className="d-block w-100">
              <div className="d-flex d-sm-none mb-3">
                <div className="d-flex gap-3 justify-content-between w-100 align-items-start">
                  <img src={AIAvatar} width={23} alt="deepline avatar" />
                  <span className="d-flex">
                    <a href="#" className="me-2">
                      <HandThumbsUp />
                    </a>
                    <a href="#">
                      <HandThumbsDown />
                    </a>
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-flex gap-3 align-items-start">
                  <img src={AIAvatar} width={23} alt="deepline avatar" className="d-none d-sm-flex d-md-flex d-lg-flex" />
                  <div className="message">{e.message}</div>
                </div>
                <span className="d-none d-sm-flex d-md-flex d-lg-flex ms-sm-auto">
                  <a href="#" className="me-2">
                    <HandThumbsUp />
                  </a>
                  <a href="#">
                    <HandThumbsDown />
                  </a>
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
