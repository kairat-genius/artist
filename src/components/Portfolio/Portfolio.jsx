import React, { useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import left from "../../assets/png/left.png";
import right from "../../assets/png/right.png";
import Button from "../button/button";

import { getPaintings } from "../../api/Paintings/getPaintingsList";
import { getPaintingDetail } from "../../api/Paintings/getPaintingDetail";

const Portfolio = ({ home }) => {
  const [data, setData] = useState([]); 
  const [dataDetail, setDataDetail] = useState(null); 
  const masonryRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  useEffect(() => {
    getPaintings(setData);
  }, []);

  let scrollSpeed = 1.5;

  useEffect(() => {
    const masonryContainer = masonryRef.current;

    if (!masonryContainer) return;

    let scrollDirection = 1;
    let animationFrameId;

    const autoScroll = () => {
      if (!isScrolling) return;

      if (
        masonryContainer.scrollLeft >=
        masonryContainer.scrollWidth - masonryContainer.clientWidth
      ) {
        scrollDirection = -1;
      } else if (masonryContainer.scrollLeft <= 0) {
        scrollDirection = 1; 
      }

      masonryContainer.scrollLeft += scrollDirection * scrollSpeed;

      animationFrameId = requestAnimationFrame(autoScroll); 
    };

    autoScroll(); 

    return () => cancelAnimationFrame(animationFrameId);
  }, [isScrolling]);


  const openModal = (paintingId) => {
    getPaintingDetail((detail) => {
      const galleryImages = [
        { image: detail.mainImage },
        ...detail.otherImages,
      ];

      setDataDetail({ ...detail, galleryImages });
      setIsScrolling(false); 
      document.body.classList.add("no-scroll");
      setCurrentImageIndex(0);
    }, paintingId);
  };

  const closeModal = () => {
    setDataDetail(null);
    setIsScrolling(true);
    document.body.classList.remove("no-scroll"); 
    setCurrentImageIndex(0); 
  };

  const showNextImage = () => {
    if (!dataDetail || !dataDetail.galleryImages) return;

    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === dataDetail.galleryImages.length - 1) {
        return 0; // Вернуться к первому изображению
      }
      return prevIndex + 1; // Перейти к следующему изображению
    });
  };

  const showPrevImage = () => {
    if (!dataDetail || !dataDetail.galleryImages) return;

    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === 0) {
        return dataDetail.galleryImages.length - 1; 
      }
      return prevIndex - 1; 
    });
  };
  return (
    <section className={home ? "portfolio" : "portfolio-cat"} id="gallery">
      <div className="portfolio_content">
        <div className="content">
          <div className="portfolio-descriptons">
            <div>
              <h2 className="h2_1">я не просто рисую,</h2>
              <h2 className="h2_2">я живу этим</h2>
            </div>
            <p>
              Каждый мой новый заказ это целая история, которую я проживаю и
              воплощаю в реальность. Для меня важно нести искусство в
              современный мир.
            </p>
          </div>

          <div className="masonry-wrapper">
            <ul className="masonry" ref={masonryRef}>
              {data.map((item, i) => (
                <li
                  className={`item ${i % 4 === 0 ? "item-1" : ""} ${
                    i % 2 === 0 ? "even-item" : ""
                  }`}
                  key={item.id}
                  onClick={() => openModal(item.id)} 
                  style={{ cursor: "pointer" }}
                >
                  <img src={item.mainImage} alt={item.title} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {dataDetail && (
        <div className="portfolio-modal" onClick={closeModal}>
          <div
            className="portfolio-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="portfolio-content-text">
              <div className="portfolio-content-text-div">
                <h3>{dataDetail.title}</h3>
                <div className="portfolip-text-p">
                  <p>{dataDetail.info}</p>
                  <p>
                    Площадь: {dataDetail.area} {dataDetail.areaUnit}
                  </p>
                  <p>
                    Срок: {dataDetail.dueDate} {dataDetail.dueDateUnit}
                  </p>
                </div>
              </div>
              <Button />
            </div>

            {/* Галерея изображений */}
            <div className="portfolio-modal-image-container">
              <img
                className="portfolio-left-arrow"
                src={left}
                alt="left arrow"
                onClick={showPrevImage}
              />
              <img
                className="portfolio-main-image"
                src={dataDetail.galleryImages[currentImageIndex]?.image}
                alt={`painting-detail-${dataDetail.id}`}
              />
              <img
                className="portfolio-right-arrow"
                src={right}
                alt="right arrow"
                onClick={showNextImage}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
