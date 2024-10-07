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

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isgridRef, setIsgridRef] = useState(true);

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

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const scrollSpeed = isIOS ? 2.0 : 1.5;

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid || !isScrolling || isDragging || dataDetail) return;

    let requestId = null;
    let scrollLeft = scrollPosition;


    const scrollGrid = () => {
      if (isDragging || dataDetail) return; // Останавливаем автоскролл при взаимодействии или открытии модального окна

      scrollLeft -= scrollSpeed;

      if (scrollLeft <= 0) {
        scrollLeft = grid._outerRef.scrollWidth - grid._outerRef.clientWidth;
      }


      grid.scrollTo({ scrollLeft });
      setScrollPosition(scrollLeft); 
      requestId = requestAnimationFrame(scrollGrid);
    };

    requestId = requestAnimationFrame(scrollGrid);

    return () => cancelAnimationFrame(requestId);
  }, [scrollSpeed, isScrolling, isDragging, scrollPosition, dataDetail]);

  const openModal = (paintingId) => {
    // Получение деталей картины
    getPaintingDetail((detail) => {
      const galleryImages = [
        { image: detail.mainImage },
        ...detail.otherImages,
      ];

      setDataDetail({ ...detail, galleryImages });
      setCurrentImageIndex(0);

      // Останавливаем автоскролл, когда открыто модальное окно
      setIsScrolling(false);

      // Открываем модальное окно
      const modal = document.querySelector(".portfolio-modal");
      modal.classList.add("modal-active");

      // Блокируем прокрутку страницы
      document.body.classList.add("no-scroll");
      document.body.style.overflow = "hidden";
    }, paintingId);
  };

  const closeModal = () => {
    setDataDetail(null);
    document.body.classList.remove("no-scroll");
    document.body.style.overflow = "";
    setIsScrolling(true);
    setCurrentImageIndex(0);

    setCanScroll(true);

    
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
    const halfLength = Math.ceil(data.length / 2);
    const index = rowIndex * halfLength + columnIndex;

    if (index >= data.length) return null;

    const item = data[index];

    const handleMouseDown = (e) => {
      setIsgridRef(false);
      openModal(item.id);
    };

    let className = 'item';

    //Первая строка
    if (rowIndex === 0) {
      className += index % 2 === 0 ? ' item-first-row-even' : '';
    }
    
    //Вторая строка
    else if (rowIndex === 1) {
      const isFirstColumnEven = halfLength % 2 === 0;
  
      if (isFirstColumnEven) {
        //второй строки четная
        className += columnIndex % 2 === 0 ? ' item-second-row-even-start-even' : '';
      } else {
        // второй строки нечетная
        className += columnIndex % 2 === 0 ? ' item-second-row-even-end-odd' : '';
      }
    }


    return (
      <li
      className={className}
        onMouseDown={handleMouseDown}
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

  //

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsScrolling(true);
  };

  const handleMouseDown = (e) => {
    const isGridItem = e.target.closest(".item"); // Assuming 'item' is the class for your card

    if (isGridItem) {
      setIsDragging(false); // Prevent dragging
      return; // Don't proceed to set dragging state
    }

    if (dataDetail) return; // Проверяем, открыто ли модальное окно

    const grid = gridRef.current;
    setIsGrabbing(true);
    setCanScroll(true);
    setIsDragging(true);
    setStartX(e.pageX - grid._outerRef.offsetLeft);
    setScrollLeft(grid._outerRef.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsGrabbing(false); // Возвращаем курсор на grab
    setCanScroll(false); // Останавливаем скроллинг при отпускании мыши
    setIsDragging(false);

    const grid = gridRef.current;
    setScrollPosition(grid._outerRef.scrollLeft); // Сохраняем текущее положение прокрутки
    setIsScrolling(true); // Включаем авто-скролл после завершения перетаскивания
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !canScroll) return;

    e.preventDefault();

    const grid = gridRef.current;
    const x = e.pageX - grid._outerRef.offsetLeft;
    const walk = (x - startX) * 2;

    let newScrollLeft = scrollLeft - walk;

    const maxScrollLeft =
      grid._outerRef.scrollWidth - grid._outerRef.clientWidth;

    // Бесшовный скролл для ручного перемещения
    if (newScrollLeft <= 0) {
      newScrollLeft = maxScrollLeft;
    } else if (newScrollLeft >= maxScrollLeft) {
      newScrollLeft = 1; // Чуть-чуть сдвигаем, чтобы избежать резкого прыжка
    }

    grid._outerRef.scrollLeft = newScrollLeft;
    setScrollPosition(newScrollLeft);
  };


  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    //обработчики для мыши
    grid._outerRef.addEventListener("mousedown", handleMouseDown);
    grid._outerRef.addEventListener("mouseleave", handleMouseLeave);
    grid._outerRef.addEventListener("mouseup", handleMouseUp);
    grid._outerRef.addEventListener("mousemove", handleMouseMove);

    return () => {
      grid._outerRef.removeEventListener("mousedown", handleMouseDown);
      grid._outerRef.removeEventListener("mouseleave", handleMouseLeave);
      grid._outerRef.removeEventListener("mouseup", handleMouseUp);
      grid._outerRef.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft]);


  useEffect(() => {
    if (data.length < 14) {
      setIsgridRef(false);
    } else {
      setIsgridRef(true);
    }
  }, [data.length]);

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
                ref={isgridRef ? gridRef : null}
                height={gridSettings.height}
                columnCount={Math.ceil(data.length / 2)}
                columnWidth={gridSettings.columnWidth}
                rowCount={2}
                rowHeight={gridSettings.rowHeight}
                width={gridSettings.width}
                style={{
                  cursor: isGrabbing ? "grabbing" : "grab",
                  "touch-action": "none",
                }}
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
