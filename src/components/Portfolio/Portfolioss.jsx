import React, { useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import left from "../../assets/png/left.png";
import right from "../../assets/png/right.png";
import Button from "../button/button";
import close from "../../assets/portfolio/close-modal.png";
import closemobile from "../../assets/portfolio/close-mobile.png";
import { getPaintings } from "../../api/Paintings/getPaintingsList";
import { getPaintingDetail } from "../../api/Paintings/getPaintingDetail";
import { VariableSizeGrid as Grid } from "react-window";

const Portfolio = ({ home, Category }) => {
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true);
  const gridRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const fetchPaintings = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await getPaintings(setData, Category);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, [Category]);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const scrollSpeed = isIOS ? 2.0 : 1.5;

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid || !isScrolling) return;

    let scrollLeft = 0;
    let requestId = null;

    const scrollGrid = () => {
      scrollLeft += scrollSpeed;

      if (scrollLeft >= grid._outerRef.scrollWidth - grid._outerRef.clientWidth) {
        scrollLeft = 0; 
      }

      grid.scrollTo({ scrollLeft });

      requestId = requestAnimationFrame(scrollGrid);
    };

    requestId = requestAnimationFrame(scrollGrid);

    return () => cancelAnimationFrame(requestId);
  }, [scrollSpeed, isScrolling, data]);


  const openModal = (paintingId) => {
    getPaintingDetail((detail) => {
      const galleryImages = [
        { image: detail.mainImage },
        ...detail.otherImages,
      ];

      setDataDetail({ ...detail, galleryImages });

      document.body.classList.add("no-scroll");
      document.body.style.overflow = "hidden";
      setIsScrolling(false);
      setCurrentImageIndex(0);
    }, paintingId);
  };

  const closeModal = () => {
    setDataDetail(null);
    document.body.classList.remove("no-scroll");
    document.body.style.overflow = "";
    setIsScrolling(true);
    setCurrentImageIndex(0);
  };

  const showNextImage = () => {
    if (!dataDetail || !dataDetail.galleryImages) return;

    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === dataDetail.galleryImages.length - 1) {
        return 0;
      }
      return prevIndex + 1;
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

  const GridItem = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 2 + columnIndex;
    if (index >= data.length) return null;

    const item = data[index];

    return (
      <li
        className={`item ${index % 2 === 0 ? "item-1" : ""}`}
        onClick={() => openModal(item.id)}
        style={{
          ...style,
          cursor: "pointer",
          backgroundColor: "transparent",
          pointerEvents: "auto",
        }}
      >
        <img src={item.mainImage} alt={item.title} />
      </li>
    );
  };

  const getResponsiveGridSettings = () => {
    const width = window.innerWidth;
    const maxWidth = 1920;

    if (width <= 744) {
      return {
        columnWidth: () => 198,
        rowHeight: () => 245,
        height: 560,
        width: 375,
      };
    }

    if (width <= 1200) {
      return {
        columnWidth: () => 188,
        rowHeight: () => 235,
        height: 560,
        width: 744,
      };
    }

    return {
      columnWidth: () => 330,
      rowHeight: () => 407,
      height: 994,
      width: Math.min(width * 0.99, maxWidth),
    };
  };

  const [gridSettings, setGridSettings] = useState(getResponsiveGridSettings());

  useEffect(() => {
    const handleResize = () => {
      setGridSettings(getResponsiveGridSettings());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  

  const getDeclension = (number, singular, pluralFew, pluralMany) => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return pluralMany;
    }

    if (lastDigit === 1) {
      return singular;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return pluralFew;
    }

    return pluralMany;
  };

  const getTimeUnit = (value, unit) => {
    switch (unit) {
      case "days":
        return getDeclension(value, "день", "дня", "дней");
      case "weeks":
        return getDeclension(value, "неделя", "недели", "недель");
      case "months":
        return getDeclension(value, "месяц", "месяца", "месяцев");
      case "hours":
        return getDeclension(value, "час", "часа", "часов");
      case "minutes":
        return getDeclension(value, "минута", "минуты", "минут");
      default:
        return unit;
    }
  };

  // прокрутка мышкой
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - gridRef.current.offsetLeft);
    setScrollLeft(gridRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - gridRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Скорость прокрутки
    gridRef.current.scrollLeft = scrollLeft - walk;
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
            <ul className="masonry">
              <Grid
              className="masonry-list"
              onWheel={(e) => e.preventDefault()}
                ref={gridRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                height={gridSettings.height}
                columnCount={Math.ceil(data.length / 2)}
                columnWidth={gridSettings.columnWidth}
                rowCount={2}
                rowHeight={gridSettings.rowHeight}
                width={gridSettings.width}
              >
                {GridItem}
              </Grid>
            </ul>
          </div>
        </div>
      </div>

      {dataDetail && (
        <div className="portfolio-modal" onClick={closeModal}>
          <img src={close} className="close-modall" onClick={closeModal} />
          <div
            className="portfolio-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={closemobile}
              className="close-modile"
              onClick={closeModal}
            />
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
              <Button onClick={closeModal} />
            </div>

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
      )}
    </section>
  );
};

export default Portfolio;
