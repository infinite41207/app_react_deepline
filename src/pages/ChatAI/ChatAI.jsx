import { useEffect, useState, useRef, useContext } from "react";
import ChatBox from "./ChatBox";
import { CreditContext } from "../../contexts/CreditContext";
import {
  sendMessage,
  getConversationRecords,
  getMessages,
} from "../../API/message";

import UpgradeCreditAlert from "../../components/UpgradeCreditAlert/UpgradeCreditAlert";
import Sidenav from "../../components/sidenav/Sidenav";
import HelpIcon from "../../icons/HelpIcon";
import PCIcon from "../../icons/PCIcon";
import PowerIcon from "../../icons/PowerIcon";
import SendIcon from "../../icons/SendIcon";
import "./scss/ChatAI.scss";
import Histories from "./Histories";
import { io } from "socket.io-client";
import ReloadIcon from "../../icons/ReloadIcon";
import SquareIcon from "../../icons/SquareIcon";
import PlayIcon from "../../icons/PlayIcon";
import Slider from "react-slick";
import PlusIcon from "../../icons/PlusIcon";
import HistoryIcon from "../../icons/HistoryIcon";
import HistoryActive from "../../icons/HistoryActive";

const socket = io("https://api.deepline.ai", {
  transports: ["polling"],
  secure: true,
});

let beforeEnd = "";
var settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ChatAI() {
  const [command, setCommand] = useState("");
  const [currentPage, setCurrentPage] = useState("newChat");
  const [messages, setMessages] = useState([]);
  const [isCollaped, setIsCollapsed] = useState(false);
  const [historyCollapsed, setHistoryCollapsed] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [allHistories, setAllHistories] = useState([]);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const { hasCredits, updateHasCredit } = useContext(CreditContext);
  const [conversationId, setConversationId] = useState("");
  const historiesRef = useRef();
  // const [isRegenerate, setIsRegenerate] = useState(false);

  useEffect(() => {
    updateHasCredit();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("message", (data) => {
      setLoadingAnswer(true);
      console.log(data);
    });

    socket.on("message-end", (data) => {
      console.log(data);
      if (beforeEnd !== data.data.message) {
        setMessages((prev) => [
          ...prev,
          { message: data.data.message, is_msg_sent_by_me: false },
        ]);
        beforeEnd = data.data.message;
      }
      setLoadingAnswer(false);
      // document.getElementById("chat-input").focus();
    });
  }, []);

  const fetchHistories = async () => {
    // setHistoryLoading(true);
    try {
      const response = await getConversationRecords();
      // setHistoryLoading(false);
      setAllHistories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!historiesRef.current.contains(e.target)) {
      setHistoryCollapsed(false);
    }
  };

  const handleSendMessage = async () => {
    // if (!hasCredits) return setIsAlertShow(true);
    beforeEnd = "";
    const message = command;
    if (!message) return;
    setLoadingAnswer(true);
    setMessages((prev) => [...prev, { message, is_msg_sent_by_me: true }]);
    setCurrentPage("chatBox");
    setCommand("");
    console.log(conversationId);
    try {
      const response = await sendMessage({
        message: message,
        conversation_id: conversationId,
        socket_id: socket.id,
      });
      setConversationId(response.data.data.conversation_id);
      fetchHistories();
      setLoadingAnswer(false);
    } catch (error) {
      console.log(error);
      setLoadingAnswer(false);
    }
  };

  const handleGetHistoryOutput = async (id) => {
    setConversationId(id);
    setMessageLoading(true);
    setHistoryCollapsed(false);
    try {
      const response = await getMessages({ conversation_id: id });
      setMessageLoading(false);
      const sortedResult = response.data.data.sort((a, b) =>
        a.created
          .split("/")
          .reverse()
          .join()
          .localeCompare(b.created.split("/").reverse().join())
      );
      setMessages(sortedResult);
      setCurrentPage("chatBox");
    } catch (error) {
      console.log(error);
      setMessageLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    setConversationId("");
    setMessages([]);
  };

  const handlePageToggle = (collapsed) => {
    setIsCollapsed(collapsed);
    setConversationId("");
  };

  const handleRegenerate = () => {
    // if(!loadingAnswer) {
    //   console.log(messages)
    //   const index = messages.length - 1
    //   setMessages((prev) => [
    //     ...prev.slice(0, index),
    //     {
    //       message: "Hi", is_msg_sent_by_me: false
    //     }
    //   ]);
    // }
  };

  return (
    <>
      {isAlertShow && (
        <UpgradeCreditAlert onCloseClick={() => setIsAlertShow(false)} />
      )}
      <section>
        <div className="dashboard-section">
          <div className="d-flex">
            <Sidenav
              pageTitle="Chat Ai"
              leftOption={<PlusIcon />}
              rightOption={
                historyCollapsed ? <HistoryActive /> : <HistoryIcon />
              }
              onLeftClick={() => handlePageChange("newChat")}
              onRightClick={() => setHistoryCollapsed(true)}
            />
            <div className="w-100">
              <div className="row m-0 h-100 bg-white">
                <div
                  className={`chat-ai-layout side-next-layout ${
                    isCollaped ? "col-lg-8" : "col-lg-9"
                  }`}
                >
                  <div className="chat-ai-content position-relative">
                    <div
                      className={`d-lg-flex h-100 justify-content-lg-center ${
                        currentPage === "newChat" ? "align-items-center" : ""
                      }`}
                    >
                      {currentPage !== "chatBox" &&
                      currentPage === "newChat" ? (
                        <div
                          className={`catagory-section ${
                            !isCollaped ? "center" : ""
                          }`}
                        >
                          <div className="chat-ai-title text-center pt-lg-3 pt-lg-5">
                            Chat AI
                          </div>
                          <div className="watch-video d-flex align-items-center justify-content-center gap-2 mt-2">
                            <PlayIcon />
                            <a href="/watch a demo" target="_blank">
                              Watch a demo video
                            </a>
                          </div>
                          {/* <div className="row justify-content-center"> */}
                          <div className="mx-auto slider-section">
                            <Slider {...settings}>
                              <div className="category">
                                <div className="chat-service d-flex justify-content-center gap-1 gap-md-3 align-items-center mb-4">
                                  <PCIcon />
                                  <div className="title">
                                    Quick examples of what I can do
                                  </div>
                                </div>

                                <div className="service-list">
                                  <div className="service-title">
                                    I can collect news articles and stories from
                                    various sources and present them in one
                                    place.
                                  </div>
                                  <div className="service-desc">
                                    For example, Tell me more about the upcoming
                                    meteor event happening this February 2023.
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can assist with emails, articles, essays,
                                    ads, social media posts, answers, product
                                    reviews etc
                                  </div>
                                  <div className="service-desc">
                                    For example, Write a high-converting landing
                                    page headline and sub headline for
                                    deepline.ai
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can answer questions based on a given
                                    context.
                                  </div>
                                  <div className="service-desc">
                                    For example, What is the capital of France?
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can translate text from one language to
                                    another.
                                  </div>
                                  <div className="service-desc">
                                    For example, if someone gives me a sentence
                                    in Spanish, I can translate it into English
                                  </div>
                                </div>
                              </div>
                              <div className="category">
                                <div className="chat-service d-flex justify-content-center gap-3 align-items-center mb-4">
                                  <PCIcon />
                                  <div className="title">
                                    Quick examples of what I can do
                                  </div>
                                </div>

                                <div className="service-list">
                                  <div className="service-title">
                                    I can give reviews and recommendations
                                  </div>
                                  <div className="service-desc">
                                    For example, What's a good place to eat
                                    sushi in Tokyo?
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can provide information on current events
                                  </div>
                                  <div className="service-desc">
                                    For example, What's happening in the news
                                    today?
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can assist with online shopping
                                  </div>
                                  <div className="service-desc">
                                    For example, Can you help me find a good
                                    pair of running shoes?
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can help with mental health
                                  </div>
                                  <div className="service-desc">
                                    For example, I'm struggling with depression.
                                    Can you help me find resources for getting
                                    help?
                                  </div>
                                </div>
                              </div>
                              <div className="category">
                                <div className="chat-service d-flex justify-content-center gap-3 align-items-center mb-4">
                                  <PCIcon />
                                  <div className="title">
                                    Quick examples of what I can do
                                  </div>
                                </div>

                                <div className="service-list">
                                  <div className="service-title">
                                    I can assist with personal finance
                                  </div>
                                  <div className="service-desc">
                                    For example, Can you help me create a budget
                                    plan for paying off my debt?
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can carry on a conversation on any topic
                                  </div>
                                  <div className="service-desc">
                                    For example, What's your take on climate
                                    change and its impact on the planet?
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can help with career development
                                  </div>
                                  <div className="service-desc">
                                    For example, Can you help me prepare for an
                                    upcoming job interview?
                                  </div>
                                </div>
                                <div className="service-list">
                                  <div className="service-title">
                                    I can give advice
                                  </div>
                                  <div className="service-desc">
                                    For example, What should I do if I'm feeling
                                    anxious?
                                  </div>
                                </div>
                              </div>
                            </Slider>
                          </div>
                        </div>
                      ) : (
                        <>
                          {messageLoading ? (
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
                                <span className="sr-only visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : (
                            <ChatBox
                              className={`message-lists pt-lg-4 ${
                                !isCollaped ? "center" : ""
                              }`}
                              messages={messages}
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div
                      className={`type-comand d-flex align-items-center flex-row-reverse justify-content-between d-lg-block d-sm-block d-md-block  px-4 py-2 ${
                        !isCollaped ? "center" : ""
                      }`}
                    >
                      {messages.length > 1 && (
                        <div>
                          <button
                            className="response-status-btn mx-auto gap-1"
                            onClick={handleRegenerate}
                          >
                            {loadingAnswer ? (
                              <>
                                <SquareIcon />
                                <span className="d-none d-sm-flex d-lg-flex d-md-flex">
                                  Stop Generating
                                </span>
                              </>
                            ) : (
                              <>
                                <ReloadIcon />
                                <span className="d-none d-sm-flex d-lg-flex d-md-flex">
                                  Regenerate resonse
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                      <div className="position-relative w-100">
                        <input
                          placeholder="Type your command..."
                          className="w-100"
                          value={command}
                          id="chat-input"
                          onChange={(e) => setCommand(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <button className="addon" onClick={handleSendMessage}>
                          <SendIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  ref={historiesRef}
                  className={`chat-ai-layout history-layout px-0 ${
                    historyCollapsed ? "collapsed" : ""
                  } ${isCollaped ? "col-lg-4" : "col-lg-3"}`}
                >
                  <Histories
                    pageStatus
                    allHistories={allHistories}
                    onPageChange={handlePageChange}
                    onPageToggle={handlePageToggle}
                    onGetHistoryOutput={handleGetHistoryOutput}
                    currentId={conversationId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
