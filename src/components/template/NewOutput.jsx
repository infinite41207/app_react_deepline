import { useContext, useMemo, useEffect, useRef, useState } from "react";
import ToneSelector from "react-select";

import { CreditContext } from "../../contexts/CreditContext";
import { useNavigate } from "react-router-dom";

import UpgradeCreditAlert from "../UpgradeCreditAlert/UpgradeCreditAlert";

import "./template.scss";
/* Voice Tone Images */
import Friendly from "../../assets/images/dashboard/voice-tone-selector/friendly.svg";
import Luxury from "../../assets/images/dashboard/voice-tone-selector/luxury.svg";
import Relaxed from "../../assets/images/dashboard/voice-tone-selector/relaxed.svg";
import Professional from "../../assets/images/dashboard/voice-tone-selector/professional.svg";
import Bold from "../../assets/images/dashboard/voice-tone-selector/bold.svg";
import Adventurous from "../../assets/images/dashboard/voice-tone-selector/adventurous.svg";
import Witty from "../../assets/images/dashboard/voice-tone-selector/witty.svg";
import Persuasive from "../../assets/images/dashboard/voice-tone-selector/persuasive.svg";
//components
import Textlengthrange from "../Input/Range/Textlengthrange";
//icons
import { HiOutlineArrowRight } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

// loading component
import LottyLoading from "../lotties/loading";
//api
import { generateText, getTemplates } from "../../API/template";
//context
import { TemplateContext } from "../../contexts/TemplateContext";
import "./template.css";
import Models from "./Models";
import { io } from "socket.io-client";
import FileUploader from "../Input/FileUploader/FileUploader";
import { BsArrowLeft } from "react-icons/bs";
import MdArrowUP from "../../icons/MdArrowUp";
import MdArrowDown from "../../icons/MdArrowDown";
// components
import TextArea from "../Input/TextArea/index";
// constants
import { examples } from "../../constants/templates";

const socket = io("https://api.deepline.ai", {
  transports: ["polling"],
  secure: true,
});

export default function NewOutput(props) {
  const [productnameCount, setProductnameCount] = useState(0);
  const [keywordsCount, setKeywordsCount] = useState(0);
  const [formData, setFormData] = useState("");
  const [selectTone, setSelectTone] = useState("");
  const [toneError, setToneError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allmodels, setAllmodels] = useState([]);
  const [newoutputCount, setNewoutputCount] = useState(1);
  const [mobileShow, setMobileShow] = useState(true);
  const { updateTemplates } = useContext(TemplateContext);
  const { hasCredits } = useContext(CreditContext);
  const [totals, setTotals] = useState(0);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [socketId, setSocketId] = useState("");
  const generateBtnRef = useRef();
  const [callNum, setCallNum] = useState(0);
  const [isWritten, setIsWritten] = useState(false);
  const [isWritting, setIsWritting] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const outputWrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
      if (allmodels.length > 0) {
        console.log(mobileShow, "mobileShow");
        if (!mobileShow) setMobileShow(true);
        window.history.go(1);
        setAllmodels([]);
      } else {
        navigate("/templates");
      }
    };
  }, [allmodels]);

  useEffect(() => {
    const inputElem = document.getElementsByClassName(
      "tone-selector__control"
    )[0];
    console.log("outputWrapperRef.current", outputWrapperRef.current);
    console.log(inputElem, "inputElem");
    inputElem?.addEventListener(["touchend"], () => {
      if (outputWrapperRef.current) {
        console.log(
          "outputWrapperRef.current.scrollHeight:",
          outputWrapperRef.current.scrollHeight
        );
        outputWrapperRef.current.scrollTo({
          top: outputWrapperRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
    inputElem?.addEventListener(["click"], () => {
      if (outputWrapperRef.current) {
        console.log(
          "outputWrapperRef.current.scrollHeight:",
          outputWrapperRef.current.scrollHeight
        );
        outputWrapperRef.current.scrollTo({
          top: outputWrapperRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  }, []);

  const voicetoneData = [
    {
      value: "Friendly",
      text: "Friendly",
      icon: <img src={Friendly} alt="" width="15" height="15" />,
    },
    {
      value: "Luxury",
      text: "Luxury",
      icon: <img src={Luxury} alt="" width="15" height="15" />,
    },
    {
      value: "Relaxed",
      text: "Relaxed",
      icon: <img src={Relaxed} alt="" width="15" height="15" />,
    },
    {
      value: "Professional",
      text: "Professional",
      icon: <img src={Professional} alt="" width="15" height="15" />,
    },
    {
      value: "Bold",
      text: "Bold",
      icon: <img src={Bold} alt="" width="15" height="15" />,
    },
    {
      value: "Adventurous",
      text: "Adventurous",
      icon: <img src={Adventurous} alt="" width="15" height="15" />,
    },
    {
      value: "Witty",
      text: "Witty",
      icon: <img src={Witty} alt="" width="15" height="15" />,
    },
    {
      value: "Persuasive",
      text: "Persuasive",
      icon: <img src={Persuasive} alt="" width="15" height="15" />,
    },
  ];

  // useEffect(() => {
  //   updateHasCredit();
  // }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
    });

    socket.on("message", (data) => {
      console.log(data);
      // setLoadingAnswer(true);
    });

    socket.on("message-end", (data) => {
      console.log(data);
      // if (beforeEnd !== data.data.message) {
      //   setMessages((prev) => [
      //     ...prev,
      //     { message: data.data.message, sentByMe: false },
      //   ]);
      //   beforeEnd = data.data.message;
      // }
      // setLoadingAnswer(false);
    });
  }, []);

  useEffect(() => {
    if (props.icon === "document") {
      setIsDocument(true);
    }
    if (props.param) {
      setFormData({
        input_text_id: "",
        text: "",
        text_type: props.param,
        keywords: "",
        tone_type: "",
        characters: "",
      });
      fetchTemp();
    }
  }, [props]);

  useEffect(() => {
    if (formData.text_type) {
      setFormData({ socket_id: socketId, ...formData });
    }
  }, [socketId]);

  const fetchTemp = async () => {
    const res = await getTemplates(props);
    setTotals(res.totals);
  };

  const handleChange = (event) => {
    if (event.target.name === "text") {
      setProductnameCount(event.target.value.length);
    }
    if (event.target.name === "keywords") {
      setKeywordsCount(event.target.value.length);
    }

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChangeTextArea = (event) => {
    // console.log(event.target.value);
    setFormData({ ...formData, text: event.target.value });
  };

  const handleToneChange = (event) => {
    setToneError(false);
    setSelectTone(event);
    setFormData({ ...formData, tone_type: event.value });
  };

  const numCharacters = (value) => {
    setFormData({ ...formData, characters: value });
  };

  const resetForm = () => {
    setProductnameCount(0);
    setKeywordsCount(0);
    setFormData({
      ...formData,
      input_text_id: "",
      text: "",
      keywords: "",
      tone_type: "",
      characters: 300,
    });
  };

  /* Submit Form To Generate Text */
  const handleGenerateText = async () => {
    // if (!hasCredits) return setIsAlertShow(true);
    if (selectTone && !formData.tone_type) {
      setFormData({ ...formData, tone_type: selectTone.value });
      formData.tone_type = selectTone.value;
    }
    if (formData.tone_type) {
      setLoading(true);
      setToneError(false);
      if (window.innerWidth < 992) {
        setMobileShow(false);
      }
      try {
        const response = await generateText(formData);
        if (response.data.status_code === 200) {
          if (response.data.data) {
            response.data.data.map((elem) => (elem.showLoading = false));
            updateTemplates();
            setAllmodels([...response.data.data, ...allmodels]);
            setFormData({
              ...formData,
              input_text_id: response.data.header_data.input_text_id,
            });
            if (callNum === 0) setCallNum(newoutputCount - 1);
            else setCallNum(callNum - 1);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error) {
          console.log(error);
        }
      }
    } else {
      setToneError(true);
    }
  };

  const handleWriteExample = () => {
    let i = 0;
    let text = "";
    let keywords = "";
    setIsWritten(false);
    setIsWritting(true);
    const typeWriter = () => {
      const txt = examples[props.param].text;
      const keyword = examples[props.param].keywords || "";
      text += txt.charAt(i);
      keywords = keyword ? keywords + keyword.charAt(i) : "";
      if (i < Math.max(keyword.length, txt.length)) {
        setFormData({ ...formData, text, keywords });
        i++;
        setTimeout(typeWriter, 20);
      } else {
        setIsWritten(true);
        setIsWritting(false);
      }
    };
    typeWriter();
    setSelectTone(voicetoneData[0]);
    setProductnameCount(examples[props.param].text.length);
    setKeywordsCount(examples[props.param].keywords?.length);
    setFormData({
      ...formData,
      tone_type: voicetoneData[0].value,
      characters: 300,
    });
  };

  useEffect(() => {
    if (callNum > 0) {
      handleGenerateText();
    }
  }, [callNum]);

  const generateDesc = (str) => {
    const text = str.slice(0, str.length - 1).toLowerCase();
    return capitalizeFirstLetter(text);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      {isAlertShow && (
        <UpgradeCreditAlert onCloseClick={() => setIsAlertShow(false)} />
      )}
      <div className="row m-0 w-100 container-outer">
        <div className="col-lg-6 p-0 position-relative">
          <div className="">
            <div className="output-form-wrapper" ref={outputWrapperRef}>
              <div className="bg-white db-heading-1 px-4 py-3 db-header bb-1px-link-water d-flex align-items-center">
                {props.icon && (
                  <img
                    src={require(`../../assets/images/dashboard/form-title-pics/${props.icon}.svg`)}
                    alt=""
                    className="me-2"
                  />
                )}
                {props.title}
              </div>
              <div className="bg-white db-heading-2 px-4 py-3 bb-1px-link-water">
                {props.desc}
              </div>
              <div className="d-flex justify-content-center mt-3 gap-3 d-lg-none mb-2">
                <button
                  className="btn shadow-none right-active-btn"
                  onClick={() => props.onChangePage("newOutput")}
                >
                  New Outputs
                </button>
                <button
                  className="btn shadow-none right-section-btn"
                  onClick={() => props.onChangePage("history")}
                  disabled={totals < 1}
                >
                  History
                </button>
              </div>

              {mobileShow && (
                <div className="bg-white px-4 pt-3 newoutput-form-groups">
                  {props.param !== "Document" &&
                    props.param !== "Paragraph Re-Writting" && (
                      <>
                        <div className="form-group mb-3">
                          <label className="form-label d-flex justify-content-between mb-3">
                            <div>{props.inputText}</div>
                            <div>{productnameCount}/80</div>
                          </label>

                          <input
                            type="text"
                            name="text"
                            id="title-text"
                            maxLength="80"
                            onChange={handleChange}
                            value={formData.text || ""}
                            className="form-control shadow-none"
                            required={true}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label d-flex justify-content-between mb-3">
                            <div>Key Benefits/Features</div>
                            <div>{keywordsCount}/800</div>
                          </label>
                          <textarea
                            className="form-control shadow-none"
                            maxLength="800"
                            name="keywords"
                            onChange={handleChange}
                            value={formData.keywords}
                            rows="5"
                            placeholder={props.benifitsPlaceholder}
                            required
                          ></textarea>
                        </div>
                      </>
                    )}
                  {props.param === "Document" && (
                    <div className="mb-3">
                      <FileUploader desc="Upload your document" />
                    </div>
                  )}
                  {props.param === "Paragraph Re-Writting" && (
                    <div className="mb-3">
                      <label className="form-label d-flex justify-content-between mb-3">
                        <div>What would you like to re-write</div>
                      </label>
                      <TextArea
                        name="text"
                        className="w-100 re-writting-text"
                        rows={5}
                        value={formData.text}
                        placeholder="Paste the content or the URL of the article that you want to re-write"
                        onChange={handleChangeTextArea}
                      />
                    </div>
                  )}
                  <div className="form-group mb-3">
                    <label className="form-label d-flex justify-content-between mb-3">
                      <div>Tone of Voice</div>
                    </label>
                    <ToneSelector
                      placeholder="Try “Witty”, “Professional”, Or “Adventurous”"
                      value={selectTone}
                      options={voicetoneData}
                      // openOnFocus={true}
                      // autofocus={true}
                      // defaultMenuIsOpen
                      // autosize={true}
                      // menuPlacement="auto"
                      // menuIsOpen
                      onFo
                      onChange={handleToneChange}
                      classNamePrefix="tone-selector"
                      getOptionLabel={(e) => (
                        <div
                          style={{ display: "flex", alignItems: "center" }}
                          className="tone-selector-option-label"
                        >
                          {e.icon}
                          <span style={{ marginLeft: 10 }}>{e.text}</span>
                        </div>
                      )}
                      className={`tone-selector shadow-none outline-line form-control ${
                        toneError ? "invalid" : ""
                      }`}
                    />
                    {toneError ? (
                      <div className="text-danger px-2 mt-1">
                        This field is required
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {props.param !== "Document" &&
                    props.param !== "Paragraph Re-Writting" && (
                      <div className="form-group mb-3">
                        <label className="form-label d-flex justify-content-between mb-3">
                          <div>Length</div>
                        </label>
                        <Textlengthrange onSelectCharacters={numCharacters} />
                      </div>
                    )}
                </div>
              )}
            </div>

            <div className="bg-white px-4 py-2 py-md-3 bt-1px-link-water generate-btn-group">
              <div>
                <button
                  ref={generateBtnRef}
                  className={`btn db-submit-btn w-100 text-uppercase ${
                    isWritten ? "animate__shakeX animate__animated" : ""
                  }`}
                  disabled={loading}
                  onClick={handleGenerateText}
                >
                  {loading ? (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "#5401AF",
                      }}
                    >
                      <span className="sr-only visually-hidden">
                        Loading...
                      </span>
                    </div>
                  ) : (
                    <>
                      Generate
                      <HiOutlineArrowRight className="ms-2" />
                    </>
                  )}
                </button>
              </div>
              <div className="d-flex justify-content-between mt-2 footer-buttons align-items-center">
                <div className="my-auto">
                  <button
                    type="reset"
                    onClick={resetForm}
                    className="btn clear-btn d-flex align-items-center justify-content-center"
                    disabled={loading}
                  >
                    <RxCross2 className="me-1" />
                    Clear inputs
                  </button>
                </div>
                <div className="d-flex gap-2">
                  <div className="form-group position-relative">
                    <div className="number-of-outputs d-flex align-items-center">
                      <span className="text-nowrap d-flex align-items-center">
                        Number of outputs<span className="ms-2 x-mark">x</span>
                        <input
                          type="number"
                          onChange={(e) => setNewoutputCount(e.target.value)}
                          name="number_of_outputs"
                          value={newoutputCount || ""}
                          disabled={loading}
                          min={1}
                        />
                      </span>
                      <div className="d-flex flex-column arrows me-2">
                        <span
                          className="p-0"
                          onClick={() => setNewoutputCount(newoutputCount + 1)}
                        >
                          <MdArrowUP />
                        </span>
                        <span
                          className="p-0"
                          onClick={() => {
                            if (newoutputCount > 1)
                              setNewoutputCount(newoutputCount - 1);
                          }}
                        >
                          <MdArrowDown />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`col-lg-6 model-section p-0 d-lg-block ${
            mobileShow ? "d-none" : "d-block"
          }`}
        >
          <div className="px-4 bg-white db-heading-1 px-2 py-3 db-header bb-1px-link-water d-lg-flex gap-3 d-none">
            <button
              className="btn shadow-none right-active-btn"
              onClick={() => props.onChangePage("newOutput")}
            >
              New Outputs
            </button>
            <button
              className="btn shadow-none right-section-btn"
              onClick={() => props.onChangePage("history")}
              disabled={totals < 1}
            >
              History
            </button>
          </div>

          {/* Display New Generated Text Output Here Start */}
          {allmodels.length < 1 && !loading && props.icon && (
            <div className="nothing-check">
              <div className="d-flex flex-column align-items-center col-lg-6">
                <img
                  src={require(`../../assets/images/dashboard/nothing/${props.icon}.svg`)}
                  alt="nothing to check"
                />
                <h5 className="fw-semibold">Nothing to check yet</h5>
                <p className="mb-0 text-center">
                  {`Create a ${generateDesc(props.title)}`} to see deepline.ai's
                  feedback
                </p>
                {!isDocument && (
                  <button onClick={handleWriteExample} disabled={isWritting}>
                    <span className="me-2">
                      <BsArrowLeft />
                    </span>
                    Write me an example
                  </button>
                )}
              </div>
            </div>
          )}
          {/* </div> */}
          {(allmodels.length > 0 || loading) && (
            <div className="row m-0 px-4 py-3 overflow-auto theme-scrollbar models-output-section w-100">
              {loading ? (
                <LottyLoading text="Text generation in progress.." />
              ) : (
                ""
              )}
              <div className="col-12 p-0">
                <Models
                  allmodels={allmodels}
                  loading={loading}
                  page="newOutput"
                  newoutputCount={newoutputCount}
                  setLoading={() => setLoading(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
