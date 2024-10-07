import React, { useState } from "react";
import left from "../../../assets/png/left.png";
import right from "../../../assets/png/right.png";
import Button from "../../button/button";
import close from "../../../assets/portfolio/close-modal.png"; 
import closemobile from "../../../assets/portfolio/close-mobile.png";
import translation from "../../../hooks/translation";



const Modal = ({ closeModal, dataDetail, currentImageIndex, showNextImage, showPrevImage}) => {
  const { getTimeUnit } = translation();

  return (
      dataDetail && (
        <div className="portfolio-modal" onClick={closeModal}>
          <img src={close} className="close-modall" onClick={closeModal}/>
          <div
            className="portfolio-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
              <img src={closemobile} className="close-modile" onClick={closeModal}/>
            <div className="portfolio-content-text">
              <div className="portfolio-content-text-div">
                <h3>{dataDetail.title}</h3>
                <div className="portfolip-text-p">
                  <p>{dataDetail.info}</p>
                  <p>
                    Площадь: {dataDetail.area} {dataDetail.areaUnit}
                  </p>
                  <p>
                  Срок: {dataDetail.dueDate}{" "}
                  {getTimeUnit(dataDetail.dueDate, dataDetail.dueDateUnit)}
                  </p>
                </div>
              </div>
              <Button onClick={closeModal}/>
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
              <div className="image-indicators">
                {dataDetail.galleryImages.length > 4 ? (
                  <>
                    <span className="dot small" />
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className={`dot ${
                          currentImageIndex === i + 1 ? "active" : ""
                        }`}
                      />
                    ))}
                    <span className="dot small" />
                  </>
                ) : (
                  dataDetail.galleryImages.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${
                        currentImageIndex === index ? "active" : ""
                      }`}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )
  );
};

export default Modal;
