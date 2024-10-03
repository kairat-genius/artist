import React, { useState, useEffect, useRef } from "react";
import "./Reviews.css";

import background1 from "../../assets/reviews/background_reviews_1.png";
import background2 from "../../assets/reviews/background_reviews_2.png";
import background1_744 from "../../assets/reviews/background_reviews_1-744.png";
import background2_744 from "../../assets/reviews/background_reviews_2-744.png";
import { getReviews } from "../../api/Reviews/getReviews";
import { getMobileReviews } from "../../api/Reviews/getMobileReviews";

const getPageNumberFromUrl = (url) => {
  if (!url) return null;
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("page");
};

const Reviews = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 744);

  const [headerText, setHeaderText] = useState("говорят Обо мне");

  const updateHeaderText = () => {
    if (window.innerWidth <= 744) {
      setHeaderText("говорят Обо\n мне");
    } else {
      setHeaderText("говорят Обо мне");
    }
  };

  useEffect(() => {
    updateHeaderText();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 744);
      updateHeaderText();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsFetching(true);
      if (isMobile) {
   
       await getMobileReviews(setData);
      } else {
  
        await getReviews(setData, setPagination, currentPage);
      }
      setIsFetching(false);
    };
    fetchReviews();
  }, [currentPage, isMobile]);

  const centerScroll = () => {
    const wrapper = wrapperRef.current;
    const items = wrapper.querySelectorAll("li");

    if (items.length > 0) {
      const centerItem = items[Math.floor(items.length / 2)];
      const scrollPosition =
        centerItem.offsetLeft -
        wrapper.clientWidth / 2 +
        centerItem.clientWidth / 2;
      wrapper.scrollLeft = scrollPosition;
    }
  };

  useEffect(() => {
    if (!isMobile) centerScroll();
  }, [data, isMobile]);

  const handlePrevious = () => {
    if (isFetching) return;
    const previousPage = getPageNumberFromUrl(pagination.previous);
    if (previousPage) {
      setCurrentPage(parseInt(previousPage));
    }
  };

  const handleNext = () => {
    if (isFetching) return;
    const nextPage = getPageNumberFromUrl(pagination.next);
    if (nextPage) {
      setCurrentPage(parseInt(nextPage));
    }
  };

  const handleScroll = () => {
    const wrapper = wrapperRef.current;
    if (isFetching || isMobile) return; 

    if (
      wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth &&
      pagination.next
    ) {
      handleNext();
    }

    if (wrapper.scrollLeft === 0 && pagination.previous) {
      handlePrevious();
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    wrapper.addEventListener("scroll", handleScroll);

    return () => {
      wrapper.removeEventListener("scroll", handleScroll);
    };
  }, [pagination, isFetching, isMobile]);

  return (
    <section className="reviews" id="reviews">
      <div className="reviews_content">
        <div className="reviews_background">
          <img src={background1} className="reviews_img" />
          <img src={background2} className="reviews_img2" />

          <img src={background1_744} className="reviews_img-744" />
          <img src={background2_744} className="reviews_img2-744" />
        </div>
        <div className="content">
          <div className="reviews-descriptons">
            <div>
              <h2 className="h2_1">Клиенты</h2>
              <h2 className="h2_2">
                {headerText.split("\n").map((line, index) => (
                  <h2 className="h2_3" key={index}>
                    {line}
                    <br />
                  </h2>
                ))}
              </h2>
            </div>
          </div>

          <div className="masonry-wrapper">
            {!isMobile && (
              <div className="arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                  onClick={handlePrevious}
                  style={{
                    cursor: pagination.previous ? "pointer" : "not-allowed",
                  }}
                >
                  <rect
                    x="70"
                    y="70"
                    width="70"
                    height="70"
                    rx="35"
                    transform="rotate(-180 70 70)"
                    fill="#333333"
                  />
                  <path
                    d="M10.2929 34.2929C9.90237 34.6834 9.90237 35.3166 10.2929 35.7071L16.6569 42.0711C17.0474 42.4616 17.6805 42.4616 18.0711 42.0711C18.4616 41.6805 18.4616 41.0474 18.0711 40.6569L12.4142 35L18.0711 29.3431C18.4616 28.9526 18.4616 28.3195 18.0711 27.9289C17.6805 27.5384 17.0474 27.5384 16.6569 27.9289L10.2929 34.2929ZM58 34L11 34V36L58 36V34Z"
                    fill="white"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                  onClick={handleNext}
                  style={{
                    cursor: pagination.next ? "pointer" : "not-allowed",
                  }}
                >
                  <rect
                    x="70"
                    y="70"
                    width="70"
                    height="70"
                    rx="35"
                    transform="rotate(-180 70 70)"
                    fill="#333333"
                  />
                  <path
                    d="M59.7071 35.7071C60.0976 35.3166 60.0976 34.6834 59.7071 34.2929L53.3431 27.9289C52.9526 27.5384 52.3195 27.5384 51.9289 27.9289C51.5384 28.3195 51.5384 28.9526 51.9289 29.3431L57.5858 35L51.9289 40.6569C51.5384 41.0474 51.5384 41.6805 51.9289 42.0711C52.3195 42.4616 52.9526 42.4616 53.3431 42.0711L59.7071 35.7071ZM12 36H59V34H12V36Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
            <ul className="wrapper" ref={wrapperRef}>
              {data.map((review, index) => (
                <li
                  key={index}
                  className={
                    index % 3 === 0
                      ? "item_1"
                      : index % 3 === 1
                      ? "item_2 item-center"
                      : "item_3"
                  }
                >
                  <img
                    src={review.img}
                    alt={`Review by ${review.customerName}`}
                  />
                  <div className="card">
                    <p>{review.text}</p>
                    <span>{review.customerName}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
