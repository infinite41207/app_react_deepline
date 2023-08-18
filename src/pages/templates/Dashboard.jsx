/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CreditContext } from "../../contexts/CreditContext";

import "./template.css";

import UpgradeCreditAlert from "../../components/UpgradeCreditAlert/UpgradeCreditAlert";

/* Components */
import Sidenav from "../../components/sidenav/Sidenav";
/* Images */
import Listviewicon from "../../assets/images/templates/list-view.svg";
import Blockviewicon from "../../assets/images/templates/block-view.svg";
import Verticaldivider from "../../assets/images/templates/vertical-line-small.svg";
import Themechangeblulb from "../../assets/images/templates/theme-change-bulb.svg";
import Searchicon from "../../assets/images/templates/search.svg";
import Homeicon from "../../assets/images/templates/home.svg";

/* For Template Section Images */
import Amazonicon from "../../assets/images/templates/amazon.svg";
import Productdesicon from "../../assets/images/templates/prod-description.svg";
import Realestateicon from "../../assets/images/templates/real-estate.svg";
import Blogposticonicon from "../../assets/images/templates/blog-post.svg";
import Paragraphwritingicon from "../../assets/images/templates/paragraph-rewrite.svg";
import Emailengagingicon from "../../assets/images/templates/email-engaging.svg";
import Facebookadsicon from "../../assets/images/templates/facebook-ads.svg";
import Metadescriptionicon from "../../assets/images/templates/meta-description.svg";
import Instagramicon from "../../assets/images/templates/instagram.svg";
import Chataiicon from "../../assets/images/templates/chat-ai.svg";
import Imageaiicon from "../../assets/images/templates/image-ai.svg";
import Document from "../../assets/images/templates/document.svg";
import Rightarrowblue from "../../assets/images/templates/right-arrow-blue.svg";

const Dashboard = () => {
  /* Load On First Time When Page Is Load */
  const { hasCredits, updateHasCredit } = useContext(CreditContext);
  const [isAlertShow, setIsAlertShow] = useState(false);

  useEffect(() => {
    gridView();
  }, []);

  useEffect(() => {
    if (hasCredits) {
      updateHasCredit();
    }
  }, []);

  useEffect(() => {
    if (hasCredits) {
      setIsAlertShow(false);
    } else {
      setIsAlertShow(true)
    }
  }, [hasCredits]);

  const listView = () => {
    var gridElems = document.querySelectorAll(".grid-view");
    var listElems = document.querySelectorAll(".list-view");

    var listBtn = document.querySelector(".list-btn");
    var gridBtn = document.querySelector(".grid-btn");

    /* Hide grid items */
    for (let i = 0; i < gridElems.length; i++) {
      gridElems[i].classList.add("d-none");
    }

    /* Show list items */
    for (let i = 0; i < listElems.length; i++) {
      listElems[i].classList.remove("d-none");
    }

    listBtn.classList.add("bg-white");
    gridBtn.classList.remove("bg-white");
  };

  /* Fro Grid View Of Templates */
  const gridView = () => {
    var gridElems = document.querySelectorAll(".grid-view");
    var listElems = document.querySelectorAll(".list-view");

    var listBtn = document.querySelector(".list-btn");
    var gridBtn = document.querySelector(".grid-btn");

    /* Show grid items */
    for (let i = 0; i < gridElems.length; i++) {
      gridElems[i].classList.remove("d-none");
    }

    /* Hide list items */
    for (let i = 0; i < listElems.length; i++) {
      listElems[i].classList.add("d-none");
    }

    listBtn.classList.remove("bg-white");
    gridBtn.classList.add("bg-white");
  };

  /* Search for Template */
  const searchForTemplate = () => {
    /* (A) GET HTML ELEMENTS */
    var filter = document.getElementById(
      "template-search-input"
    ); /* Search box */
    var grid = document.querySelectorAll(
      ".grid-view .template-heading-black"
    ); /* All list items */
    var listViewItems = document.querySelectorAll(
      ".list-view .sep-card .content-sect .template-heading-black"
    );
    let search = filter.value.toLowerCase();

    /* Search in grid view */
    for (let i of grid) {
      let item = i.innerHTML.toLowerCase();
      let parentElem = i.parentNode;
      if (item.indexOf(search) === -1) {
        parentElem.classList.add("d-none");
      } else {
        parentElem.classList.remove("d-none");
      }
    }

    /* search in list-view */
    for (let i of listViewItems) {
      let item = i.innerHTML.toLowerCase();
      let firstParent = i.parentNode;
      let secondParent = firstParent.parentNode;
      let thirdParent = secondParent.parentNode;
      if (item.indexOf(search) === -1) {
        thirdParent.classList.add("d-none");
      } else {
        thirdParent.classList.remove("d-none");
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-0 dashboard-section1 position-relative">
        {isAlertShow && (
          <UpgradeCreditAlert onCloseClick={() => setIsAlertShow(false)} />
        )}
        <div className={`d-flex ${hasCredits && "hide-scroll"}`}>
          <Sidenav pageTitle="template" />
          <div className="row m-0 w-100 templates-dashboard">
            <div className="col-12 pt-lg-4 px-lg-5 bg-white">
              <div className="row d-flex template-top-navbar h-auto p-0 justify-content-center">
                <div className="col-lg-3 d-flex align-items-center ps-0">
                  <p className="font-inter fs-1p875rem fw-bold fst-normal learning-cards-black my-auto d-none d-lg-block">
                    Templates
                  </p>
                </div>
                <div className="col-7 col-lg-6 p-0 d-flex align-items-center mt-xxl-0 mt-xl-2 mt-lg-3 mt-md-3 mt-sm-3 mt-3">
                  <div className="input-group template-page-search-input w-100">
                    <span className="input-group-text ps-4 py-2 d-flex align-items-center">
                      <img
                        src={Searchicon}
                        className="my-auto"
                        height="16px"
                        width="16px"
                        alt="search icon"
                      />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-grey-ligh py-2 template-search-input"
                      id="template-search-input"
                      onKeyUp={searchForTemplate}
                      placeholder="Search"
                    />
                    <span className="input-group-text text-grey-94A3B8 py-2 d-none d-md-block">
                      <span className="px-2 border border-secondary rounded-1 template-search-slash">
                        /
                      </span>
                    </span>
                  </div>
                </div>
                <div className="col-4 col-md-3 mt-xxl-0 mt-xl-2 mt-lg-3 mt-md-3 mt-sm-3 mt-3 ps-0">
                  <div className="d-flex align-items-center template-search-sibling-btns ps-xxl-4 ps-xl-3 ps-lg-0 ps-md-0 ps-sm-0 ps-0 justify-content-xxl-end justify-content-xl-start">
                    <div className="d-flex gap-3 justify-between-evenly">
                      <div>
                        <button className="btn ms-2 ms-lg-0">
                          <img src={Themechangeblulb} alt="" />
                        </button>
                      </div>
                      <span className="d-flex align-items-center">
                        <img src={Verticaldivider} alt="" />
                      </span>
                      <div className="d-none d-lg-block">
                        <button
                          className="btn list-btn"
                          onClick={() => listView(this)}
                        >
                          <img src={Listviewicon} alt="" />
                        </button>
                      </div>
                      <div className="d-none d-lg-block">
                        <button
                          className="btn grid-btn"
                          onClick={() => gridView(this)}
                        >
                          <img src={Blockviewicon} alt="" />
                        </button>
                      </div>
                      <div>
                        <Link
                          className="btn grid-btn d-block d-lg-none"
                          to="https://deepline.ai"
                          onClick={() => {
                            gridView(this);
                          }}
                        >
                          <img src={Homeicon} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row template-nav-tabs p-0 d-none d-lg-block">
                <div className="templtae-nav-tab-categories">
                  <ul
                    className="nav nav-pills d-flex py-2"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-all-tab"
                        className="nav-link active fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-all"
                        type="button"
                        role="tab"
                        aria-controls="pills-all"
                        aria-selected="true"
                      >
                        All
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-ads-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-ads"
                        type="button"
                        role="tab"
                        aria-controls="pills-ads"
                        aria-selected="false"
                      >
                        Ads
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-blog-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-blog"
                        type="button"
                        role="tab"
                        aria-controls="pills-blog"
                        aria-selected="false"
                      >
                        Blog
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-ecommerce-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-ecommerce"
                        type="button"
                        role="tab"
                        aria-controls="pills-ecommerce"
                        aria-selected="false"
                      >
                        Ecommerce
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-email-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-email"
                        type="button"
                        role="tab"
                        aria-controls="pills-email"
                        aria-selected="false"
                      >
                        Email
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-frameworks-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-frameworks"
                        type="button"
                        role="tab"
                        aria-controls="pills-frameworks"
                        aria-selected="false"
                      >
                        Frameworks
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-google-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-google"
                        type="button"
                        role="tab"
                        aria-controls="pills-google"
                        aria-selected="false"
                      >
                        Google
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-marketing-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-marketing"
                        type="button"
                        role="tab"
                        aria-controls="pills-marketing"
                        aria-selected="false"
                      >
                        Marketing
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-new-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-new"
                        type="button"
                        role="tab"
                        aria-controls="pills-new"
                        aria-selected="false"
                      >
                        New
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-seo-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-seo"
                        type="button"
                        role="tab"
                        aria-controls="pills-seo"
                        aria-selected="false"
                      >
                        SEO
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-socialMedia-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-socialMedia"
                        type="button"
                        role="tab"
                        aria-controls="pills-socialMedia"
                        aria-selected="false"
                      >
                        Social Media
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-video-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-video"
                        type="button"
                        role="tab"
                        aria-controls="pills-video"
                        aria-selected="false"
                      >
                        Video
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        id="pills-website-tab"
                        className="nav-link fw-normal font-inter fs-14px text-blackish text-dark-black fst-normal"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-website"
                        type="button"
                        role="tab"
                        aria-controls="pills-website"
                        aria-selected="false"
                      >
                        Website
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-12 bg-grey-ligh">
                  <div
                    className="template-categories-content tab-content"
                    id="pills-tabContent"
                  >
                    {/* All */}
                    <div
                      className="tab-pane fade show active"
                      id="pills-all"
                      role="tabpanel"
                      aria-labelledby="pills-all-tab"
                    >
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Amazonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Amazon Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Amazon descriptions for your
                            products.
                          </p>
                          <Link
                            to="/template/amazon-product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Productdesicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate engaging, SEO-optimized descriptions and
                            listings.
                          </p>
                          <Link
                            to="/template/product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Realestateicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Real Estate Listing - Residential
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Real Estate listing descriptions
                            for you.
                          </p>
                          <Link
                            to="/template/residential-real-estate"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Emailengagingicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            E-mail Engaging Letters
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Upgrade your correspondence by creating professional
                            emails.
                          </p>
                          <Link
                            to="/template/e-mail"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Facebookadsicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Facebook Ads
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Produce social media advertising tailored to your
                            audience.
                          </p>
                          <Link
                            to="/template/facebook-ad"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Metadescriptionicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Meta Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate brief, SEO-optimized meta descriptions for
                            your website.
                          </p>
                          <Link
                            to="/template/meta"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Instagramicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Instagram Captions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Develop appealing captions and written content for
                            social media.
                          </p>
                          <Link
                            to="/template/instagram-caption"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Chataiicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Chat AI
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Our AI Chat helps you create content and answers any
                            questions you have.
                          </p>
                          <Link
                            to="/chat-ai"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Imageaiicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px d-flex align-items-center">
                            Image AI
                            <a
                              href="#"
                              role="button"
                              className="btn text-decoration-none bg-voilet text-white rounded-pill px-3 py-1 ms-3 font-roboto beta-btn"
                            >
                              Beta
                            </a>
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate visual images for your blog posts, website,
                            social media, etc.
                          </p>
                          <a
                            href="#"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </a>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px d-flex align-items-center">
                            Documents
                            <a
                              href="#"
                              role="button"
                              className="btn text-decoration-none bg-voilet text-white rounded-pill px-3 py-1 ms-3 font-roboto beta-btn"
                            >
                              Beta
                            </a>
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View of All */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Amazonicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Amazon Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Amazon descriptions for
                                  your products.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/amazon-product-description"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Productdesicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate engaging, SEO-optimized descriptions
                                  and listings.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/product-description"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Realestateicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Real Estate Listing - Residential
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Real Estate listing
                                  descriptions for you.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/residential-real-estate"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/paragraph-re-writting"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Emailengagingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  E-mail Engaging Letters
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Upgrade your correspondence by creating
                                  professional emails.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Instagramicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Instagram Captions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Develop appealing captions and written content
                                  for social media.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/instagram-caption"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Facebookadsicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Facebook Ads
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Produce social media advertising tailored to
                                  your audience.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/facebook-ad"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Metadescriptionicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Meta Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate brief, SEO-optimized meta
                                  descriptions for your website.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/meta"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/document"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Chataiicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Chat AI
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Our AI Chat helps you create content and
                                  answers any questions you have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/chat-ai"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row sep-card px-2p6rem py-2">
                            <div className="d-flex p-0 flex-wrap justify-content-center py-lg-0 py-md-3 py-sm-3 py-3">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Imageaiicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Image AI
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate visual images for your blog posts,
                                  website, social media, etc.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <a
                                  href="#"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ads  */}
                    <div
                      className="tab-pane fade show"
                      id="pills-ads"
                      role="tabpanel"
                      aria-labelledby="pills-ads-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Amazonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Amazon Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Amazon descriptions for your
                            products.
                          </p>
                          <Link
                            to="/template/amazon-product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Productdesicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate engaging, SEO-optimized descriptions and
                            listings.
                          </p>
                          <Link
                            to="/template/product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Realestateicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Real Estate Listing - Residential
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Real Estate listing descriptions
                            for you.
                          </p>
                          <Link
                            to="/template/residential-real-estate"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Emailengagingicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            E-mail Engaging Letters
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Upgrade your correspondence by creating professional
                            emails.
                          </p>
                          <Link
                            to="/template/e-mail"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Facebookadsicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Facebook Ads
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Produce social media advertising tailored to your
                            audience.
                          </p>
                          <Link
                            to="/template/facebook-ad"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Imageaiicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Image AI
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate visual images for your blog posts, website,
                            social media, etc.
                          </p>
                          <a
                            href="#"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </a>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row ">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Amazonicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Amazon Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Amazon descriptions for
                                  your products.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Productdesicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate engaging, SEO-optimized descriptions
                                  and listings.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Realestateicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Real Estate Listing - Residential
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Real Estate listing
                                  descriptions for you.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Emailengagingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  E-mail Engaging Letters
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Upgrade your correspondence by creating
                                  professional emails.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Facebookadsicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Facebook Ads
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Produce social media advertising tailored to
                                  your audience.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Imageaiicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Image AI
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate visual images for your blog posts,
                                  website, social media, etc.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blog  */}
                    <div
                      className="tab-pane fade show"
                      id="pills-blog"
                      role="tabpanel"
                      aria-labelledby="pills-blog-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Amazonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Amazon Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Amazon descriptions for your
                            products.
                          </p>
                          <Link
                            to="/template/amazon-product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Productdesicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate engaging, SEO-optimized descriptions and
                            listings.
                          </p>
                          <Link
                            to="/template/product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Realestateicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Real Estate Listing - Residential
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Real Estate listing descriptions
                            for you.
                          </p>
                          <Link
                            to="/template/residential-real-estate"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Amazonicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Amazon Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Amazon descriptions for
                                  your products.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Productdesicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate engaging, SEO-optimized descriptions
                                  and listings.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Realestateicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Real Estate Listing - Residential
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Real Estate listing
                                  descriptions for you.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ecommerce */}
                    <div
                      className="tab-pane fade show"
                      id="pills-ecommerce"
                      role="tabpanel"
                      aria-labelledby="pills-ecommerce-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Amazonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Amazon Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Amazon descriptions for your
                            products.
                          </p>
                          <Link
                            to="/template/amazon-product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Productdesicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate engaging, SEO-optimized descriptions and
                            listings.
                          </p>
                          <Link
                            to="/template/product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Realestateicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Real Estate Listing - Residential
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Real Estate listing descriptions
                            for you.
                          </p>
                          <Link
                            to="/template/residential-real-estate"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Emailengagingicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            E-mail Engaging Letters
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Upgrade your correspondence by creating professional
                            emails.
                          </p>
                          <Link
                            to="/template/e-mail"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Facebookadsicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Facebook Ads
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Produce social media advertising tailored to your
                            audience.
                          </p>
                          <Link
                            to="/template/facebook-ad"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Imageaiicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Image AI
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate visual images for your blog posts, website,
                            social media, etc.
                          </p>
                          <a
                            href="#"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </a>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Amazonicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Amazon Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Amazon descriptions for
                                  your products.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Productdesicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate engaging, SEO-optimized descriptions
                                  and listings.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Realestateicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Real Estate Listing - Residential
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Real Estate listing
                                  descriptions for you.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div
                      className="tab-pane fade show"
                      id="pills-email"
                      role="tabpanel"
                      aria-labelledby="pills-email-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Frameworks */}
                    <div
                      className="tab-pane fade show"
                      id="pills-frameworks"
                      role="tabpanel"
                      aria-labelledby="pills-frameworks-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Productdesicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate engaging, SEO-optimized descriptions and
                            listings.
                          </p>
                          <Link
                            to="/template/product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Realestateicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Real Estate Listing - Residential
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Real Estate listing descriptions
                            for you.
                          </p>
                          <Link
                            to="/template/residential-real-estate"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Emailengagingicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            E-mail Engaging Letters
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Upgrade your correspondence by creating professional
                            emails.
                          </p>
                          <Link
                            to="/template/e-mail"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Imageaiicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Image AI
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate visual images for your blog posts, website,
                            social media, etc.
                          </p>
                          <a
                            href="#"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </a>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Productdesicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate engaging, SEO-optimized descriptions
                                  and listings.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Realestateicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Real Estate Listing - Residential
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Real Estate listing
                                  descriptions for you.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Emailengagingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  E-mail Engaging Letters
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Upgrade your correspondence by creating
                                  professional emails.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Imageaiicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Image AI
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate visual images for your blog posts,
                                  website, social media, etc.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Google */}
                    <div
                      className="tab-pane fade show"
                      id="pills-google"
                      role="tabpanel"
                      aria-labelledby="pills-google-tab"
                    >
                      {/* grid View */}

                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Amazonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Amazon Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Amazon descriptions for your
                            products.
                          </p>
                          <Link
                            to="/template/amazon-product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Amazonicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Amazon Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Amazon descriptions for
                                  your products.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Marketing */}
                    <div
                      className="tab-pane fade show"
                      id="pills-marketing"
                      role="tabpanel"
                      aria-labelledby="pills-marketing-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* New  */}
                    <div
                      className="tab-pane fade show"
                      id="pills-new"
                      role="tabpanel"
                      aria-labelledby="pills-new-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Amazonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Amazon Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Amazon descriptions for your
                            products.
                          </p>
                          <Link
                            to="/template/amazon-product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Productdesicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate engaging, SEO-optimized descriptions and
                            listings.
                          </p>
                          <Link
                            to="/template/product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Realestateicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Real Estate Listing - Residential
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Real Estate listing descriptions
                            for you.
                          </p>
                          <Link
                            to="/template/residential-real-estate"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Emailengagingicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            E-mail Engaging Letters
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Upgrade your correspondence by creating professional
                            emails.
                          </p>
                          <Link
                            to="/template/e-mail"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Facebookadsicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Facebook Ads
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Produce social media advertising tailored to your
                            audience.
                          </p>
                          <Link
                            to="/template/facebook-ad"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Imageaiicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Image AI
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate visual images for your blog posts, website,
                            social media, etc.
                          </p>
                          <a
                            href="#"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </a>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Amazonicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Amazon Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Amazon descriptions for
                                  your products.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Productdesicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate engaging, SEO-optimized descriptions
                                  and listings.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Realestateicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Real Estate Listing - Residential
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Real Estate listing
                                  descriptions for you.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Emailengagingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  E-mail Engaging Letters
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Upgrade your correspondence by creating
                                  professional emails.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Facebookadsicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Facebook Ads
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Produce social media advertising tailored to
                                  your audience.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Imageaiicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Image AI
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate visual images for your blog posts,
                                  website, social media, etc.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SEO */}
                    <div
                      className="tab-pane fade show"
                      id="pills-seo"
                      role="tabpanel"
                      aria-labelledby="pills-seo-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Productdesicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate engaging, SEO-optimized descriptions and
                            listings.
                          </p>
                          <Link
                            to="/template/product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Realestateicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Real Estate Listing - Residential
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Real Estate listing descriptions
                            for you.
                          </p>
                          <Link
                            to="/template/residential-real-estate"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Emailengagingicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            E-mail Engaging Letters
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Upgrade your correspondence by creating professional
                            emails.
                          </p>
                          <Link
                            to="/template/e-mail"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Imageaiicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Image AI
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate visual images for your blog posts, website,
                            social media, etc.
                          </p>
                          <a
                            href="#"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </a>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Productdesicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate engaging, SEO-optimized descriptions
                                  and listings.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Realestateicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Real Estate Listing - Residential
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Real Estate listing
                                  descriptions for you.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Emailengagingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  E-mail Engaging Letters
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Upgrade your correspondence by creating
                                  professional emails.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Imageaiicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Image AI
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate visual images for your blog posts,
                                  website, social media, etc.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div
                      className="tab-pane fade show"
                      id="pills-socialMedia"
                      role="tabpanel"
                      aria-labelledby="pills-socialMedia-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Amazonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Amazon Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Amazon descriptions for your
                            products.
                          </p>
                          <Link
                            to="/template/amazon-product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Amazonicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Amazon Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Amazon descriptions for
                                  your products.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video */}
                    <div
                      className="tab-pane fade show"
                      id="pills-video"
                      role="tabpanel"
                      aria-labelledby="pills-video-tab"
                    >
                      {/* Grid View */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Amazonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Amazon Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Amazon descriptions for your
                            products.
                          </p>
                          <Link
                            to="/template/amazon-product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Productdesicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Product Descriptions
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate engaging, SEO-optimized descriptions and
                            listings.
                          </p>
                          <Link
                            to="/template/product-description"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Realestateicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Real Estate Listing - Residential
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create captivating Real Estate listing descriptions
                            for you.
                          </p>
                          <Link
                            to="/template/residential-real-estate"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Emailengagingicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            E-mail Engaging Letters
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Upgrade your correspondence by creating professional
                            emails.
                          </p>
                          <Link
                            to="/template/e-mail"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Facebookadsicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Facebook Ads
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Produce social media advertising tailored to your
                            audience.
                          </p>
                          <Link
                            to="/template/facebook-ad"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Imageaiicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Image AI
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Generate visual images for your blog posts, website,
                            social media, etc.
                          </p>
                          <a
                            href="#"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </a>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Amazonicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Amazon Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Amazon descriptions for
                                  your products.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Productdesicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Product Descriptions
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate engaging, SEO-optimized descriptions
                                  and listings.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Realestateicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Real Estate Listing - Residential
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create captivating Real Estate listing
                                  descriptions for you.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Emailengagingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  E-mail Engaging Letters
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Upgrade your correspondence by creating
                                  professional emails.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Facebookadsicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Facebook Ads
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Produce social media advertising tailored to
                                  your audience.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Imageaiicon} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Image AI
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Generate visual images for your blog posts,
                                  website, social media, etc.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/blog-post"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Website */}
                    <div
                      className="tab-pane fade show"
                      id="pills-website"
                      role="tabpanel"
                      aria-labelledby="pills-website-tab"
                    >
                      {/* Grid View  */}
                      <div className="row grid-view">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Blogposticonicon} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Blog Posts
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Create blogs that will help attract readers’
                            interest.
                          </p>
                          <Link
                            to="/template/blog-post"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img
                              src={Paragraphwritingicon}
                              className=""
                              alt=""
                            />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Paragraph Re-Writting
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Improve and develop written content you already
                            have.
                          </p>
                          <Link
                            to="/template/paragraph-re-writting"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 pe-lg-5 pe-md-3 pe-sm-3 pe-3 pt-2p6rem pb-6p25rem ps-2p5rem sep-card">
                          <div className="w-auto p-0">
                            <img src={Document} className="" alt="" />
                          </div>
                          <p className="fs-5 fw-600 font-inter template-heading-black pt-12px">
                            Documents
                          </p>
                          <p className="lh-lg font-inter text-left fs-14px text-blackish fw-300 pe-4p5rem">
                            Get help with creating long-form texts and
                            documents.
                          </p>
                          <Link
                            to="/template/document"
                            className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                          >
                            Template
                            <img src={Rightarrowblue} className="ms-2" alt="" />
                          </Link>
                        </div>
                      </div>

                      {/* List View */}
                      <div className="row list-view">
                        <div className="col-12">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Blogposticonicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Blog Posts
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Create blogs that will help attract readers’
                                  interest.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img
                                  src={Paragraphwritingicon}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Paragraph Re-Writting
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Improve and develop written content you
                                  already have.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center sep-card px-2p6rem py-2">
                              <div className="w-auto p-0 d-flex align-items-center">
                                <img src={Document} className="" alt="" />
                              </div>
                              <div className="content-sect flex-grow-1 d-flex flex-column justify-content-center py-2 ps-4">
                                <span className="fs-5 fw-600 font-inter template-heading-black my-auto">
                                  Documents
                                </span>
                                <p className="font-inter text-left fs-14px text-blackish fw-300 my-auto">
                                  Get help with creating long-form texts and
                                  documents.
                                </p>
                              </div>
                              <div className="template-goto d-flex align-items-center">
                                <Link
                                  to="/template/e-mail"
                                  className="text-blue text-decoration-none fs-14px font-inter fst-normal fw-500 template-goto-anchor"
                                >
                                  Template
                                  <img
                                    src={Rightarrowblue}
                                    className="ms-2"
                                    alt=""
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 d-block d-lg-none">
                <Link
                  to="/template/amazon-product-description"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Amazonicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Amazon Product Descriptions
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Create captivating Amazon descriptions for your products.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/product-description"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Productdesicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Product Descriptions
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Create captivating Amazon descriptions for your products.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/residential-real-estate"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Realestateicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Real Estate Listing - Residential
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Create captivating Real Estate listing descriptions for
                      you.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/blog-post"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Blogposticonicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Blog Posts
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Create blogs that will help attract readers’ interest.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/paragraph-re-writting"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Paragraphwritingicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Paragraph Re-Writting
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Improve and develop written content you already have.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/e-mail"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Emailengagingicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      E-mail Engaging Letters
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Upgrade your correspondence by creating professional
                      emails.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/facebook-ad"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Facebookadsicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Facebook Ads
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Produce social media advertising tailored to your
                      audience.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/meta"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Metadescriptionicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Meta Descriptions
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Generate brief, SEO-optimized meta descriptions for your
                      website.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/instagram-caption"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Instagramicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Instagram Captions
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Develop appealing captions and written content for social
                      media.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/chat-ai"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Chataiicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Chat AI
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Our AI Chat helps you create content and answers any
                      questions you have.
                    </p>
                  </div>
                </Link>
                <Link
                  to="#"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Imageaiicon} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Image AI
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Generate visual images for your blog posts, website,
                      social media, etc.
                    </p>
                  </div>
                </Link>
                <Link
                  to="/template/document"
                  className="sep-card d-flex gap-3 align-items-center p-3 text-decoration-none"
                >
                  <div className="w-auto p-0">
                    <img src={Document} className="" alt="" />
                  </div>
                  <div>
                    <p className="fw-600 font-inter template-heading-black pt-12px mb-0">
                      Documents
                    </p>
                    <p
                      className="font-inter text-left fs-13px text-blackish fw-300 mb-0"
                      style={{ lineHeight: "17.2px", color: "#2F2F31" }}
                    >
                      Get help with creating long-form texts and documents.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
