import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Portfolio.css";
import left from "../../assets/png/left.png";
import right from "../../assets/png/right.png";
import Button from "../button/button";
import close from "../../assets/portfolio/close-modal.png"; 
import closemobile from "../../assets/portfolio/close-mobile.png";
import { getPaintings } from "../../api/Paintings/getPaintingsList";
import { getPaintingDetail } from "../../api/Paintings/getPaintingDetail";

const Portfolio = ({ home, Category }) => {
  const [data, setData] = useState([]);
  const [countPages, setCountPages] = useState(0);
  const [dataDetail, setDataDetail] = useState(null);
  const masonryRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const observer = useRef(null);
  const [loading, setLoading] = useState(false); 


  const fetchPaintings = async (page) => {
    if (loading) return; // Если запрос уже выполняется, выходим

    setLoading(true); // Устанавливаем флаг загрузки
    try {
      await getPaintings(setData, setCountPages, Category, page);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    } finally {
      setLoading(false); // Сбрасываем флаг загрузки
    }
  };


  useEffect(() => {
    fetchPaintings(currentPage);
  }, [Category, currentPage]);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const scrollSpeed = isIOS ? 4 : 1.5;

  useEffect(() => {
    const masonryContainer = masonryRef.current;

    if (!masonryContainer) return;

    let animationFrameId;

    const autoScroll = () => {
      if (!isScrolling || !masonryContainer) return;

      if (
        masonryContainer.scrollLeft >=
        masonryContainer.scrollWidth - masonryContainer.clientWidth
      ) {
        masonryContainer.scrollLeft = 0; 
      } else {
        masonryContainer.scrollLeft += scrollSpeed;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    autoScroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isScrolling, data]); 

  const openModal = (paintingId) => {
    getPaintingDetail((detail) => {
      const galleryImages = [
        { image: detail.mainImage },
        ...detail.otherImages,
      ];

      setDataDetail({ ...detail, galleryImages });
      setIsScrolling(false); 
      document.body.classList.add(".no-scroll");
      document.body.style.overflow = 'hidden'; 
      setCurrentImageIndex(0);
    }, paintingId);
  };

  const closeModal = () => {
    setDataDetail(null);
    setIsScrolling(true);
    document.body.classList.remove(".no-scroll");
    document.body.style.overflow = '';
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

  const lastPaintingElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !loading) {
            if (currentPage < countPages) {
              setCurrentPage((prevPage) => prevPage + 1);
            } else {
              setCurrentPage(1); 
            }
          }
        },
        {
          rootMargin: "100px",
        }
      );

      if (node) observer.current.observe(node);
    },
    [countPages, currentPage, loading] 
  );

  useEffect(() => {
    if (data.length > 50) {
      setData((prevData) => prevData.slice(25));
    }
  }, [data]);

  // перевод дней

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

  // Функция для определения правильного склонения в зависимости от единицы времени
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
                  ref={i === data.length - 1 ? lastPaintingElementRef : null} 
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
      )}
    </section>
  );
};

export default Portfolio;
