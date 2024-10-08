import React, { useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import { getPaintings } from "../../api/Paintings/getPaintingsList";
import { VariableSizeGrid as Grid } from "react-window";

import adaptivePortfolio from "../../hooks/adaptive";
import Modal from "./components/Modal";
import { getPaintingDetail } from "../../api/Paintings/getPaintingDetail";
const Portfolio = ({ home, Category }) => {
  const [data, setData] = useState([]);
  const gridRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { gridSettings } = adaptivePortfolio();
  const [dataDetail, setDataDetail] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true);
  const scrollRequestRef = useRef(null);
  const scrollPosition = useRef(0);

  const checkWindowSize = () => {
    if (window.innerWidth < 1025) {
      setIsScrolling(false);
    } else if (window.innerWidth >= 1025 && data.length <= 14) {
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      checkWindowSize();
    }

    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, [data]);

  // мышка
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const grid = gridRef.current?._outerRef;

    if (!grid) return;

    const handleMouseDown = (e) => {
      if (window.innerWidth >= 1025 && data.length <= 14) return;
      if (window.innerWidth < 1025) return;

      if (e.target.classList.contains("masonry-list")) {
        isDragging.current = true;
        startX.current = e.pageX - grid.offsetLeft;
        scrollLeft.current = grid.scrollLeft;
        setIsScrolling(false);
      }
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth < 1025) return;
      if (window.innerWidth >= 1025 && data.length <= 14) return;
      if (!isDragging.current) return;

      const x = e.pageX - grid.offsetLeft;
      const walk = (x - startX.current) * 2;
      grid.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
      if (window.innerWidth < 1025) return;
      if (window.innerWidth >= 1025 && data.length <= 14) return;

      isDragging.current = false;
      setIsScrolling(true);

      scrollPosition.current = grid.scrollLeft;
    };

    const handleMouseLeave = () => {
      if (window.innerWidth < 1025) return;
      if (window.innerWidth >= 1025 && data.length <= 14) return;

      isDragging.current = false;
      setIsScrolling(true);
    };

    grid.addEventListener("mousedown", handleMouseDown);
    grid.addEventListener("mousemove", handleMouseMove);
    grid.addEventListener("mouseup", handleMouseUp);
    grid.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      grid.removeEventListener("mousedown", handleMouseDown);
      grid.removeEventListener("mousemove", handleMouseMove);
      grid.removeEventListener("mouseup", handleMouseUp);
      grid.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [gridRef, setIsScrolling, data]);

  useEffect(() => {
    const grid = gridRef.current?._outerRef;
    if (grid && isScrolling) {
      grid.scrollLeft = scrollPosition.current;
    }
  }, [isScrolling, gridRef, scrollPosition]);
  // конец мышки

  const fetchPaintings = () => {
    if (loading) return;

    setLoading(true);
    try {
      getPaintings(setData, Category);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, [Category]);

  // Восстановление позиции прокрутки
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current._outerRef.scrollLeft = scrollPosition.current;
    }
  }, [data]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !isScrolling || dataDetail !== null) return;

    const columnWidth = gridSettings.columnWidth();
    const countData = columnCount();
    const totalWidth = countData * columnWidth;

    let scrollOffset =
      scrollPosition.current ||
      grid._outerRef.scrollLeft ||
      grid._outerRef.scrollWidth / 3;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const scrollSpeed = isIOS ? 2.0 : 1.5;
    const resetThreshold = totalWidth - grid._outerRef.clientWidth;

    const scrollGrid = () => {
      if (scrollOffset >= resetThreshold) {
        scrollOffset = 0;
        grid.scrollTo({
          scrollLeft: scrollOffset,
          behavior: "smooth",
        });
      } else {
        scrollOffset += scrollSpeed;
        grid.scrollTo({
          scrollLeft: scrollOffset,
          behavior: "smooth",
        });
      }

      scrollPosition.current = scrollOffset;

      if (isScrolling && dataDetail === null) {
        scrollRequestRef.current = requestAnimationFrame(scrollGrid);
      }
    };

    scrollRequestRef.current = requestAnimationFrame(scrollGrid);

    return () => {
      if (scrollRequestRef.current) {
        cancelAnimationFrame(scrollRequestRef.current);
      }
    };
  }, [isScrolling, data, dataDetail, scrollPosition]);

  // Modal logic
  const openModal = (paintingId) => {
    setIsScrolling(false); // Stop auto-scroll when modal opens
    getPaintingDetail((detail) => {
      const galleryImages = [
        { image: detail.mainImage },
        ...detail.otherImages,
      ];

      setDataDetail({ ...detail, galleryImages });
      setCurrentImageIndex(0);

      const modal = document.querySelector(".portfolio-modal");
      modal.classList.add("modal-active");

      document.body.classList.add("no-scroll");
      document.body.style.overflow = "hidden";
    }, paintingId);

    if (scrollRequestRef.current) {
      cancelAnimationFrame(scrollRequestRef.current);
    }
  };

  const closeModal = () => {
    setDataDetail(null);
    document.body.style.overflow = "";

    if (window.innerWidth < 1025) {
      setIsScrolling(false);
    } else if (window.innerWidth >= 1025 && data.length < 14) {
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
    }
  };

  const showNextImage = () => {
    if (!dataDetail || !dataDetail.galleryImages) return;

    setCurrentImageIndex((prevIndex) =>
      prevIndex === dataDetail.galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPrevImage = () => {
    if (!dataDetail || !dataDetail.galleryImages) return;

    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? dataDetail.galleryImages.length - 1 : prevIndex - 1
    );
  };

  const duplicateDataUntilLength = (data, targetLength) => {
    let infiniteData = [...data];
    while (infiniteData.length < targetLength) {
      infiniteData = [...infiniteData, ...data];
    }
    return infiniteData;
  };

  const GridItem = ({ columnIndex, rowIndex, style }) => {
    const halfLength = Math.ceil(data.length / 2);

    const columnCountValue = columnCount();
    const infiniteData = duplicateDataUntilLength(data, columnCountValue);

    const infiniteLength = infiniteData.length;

    const index = (rowIndex * halfLength + columnIndex) % infiniteLength;

    const item = infiniteData[index];

    const handleMouseDown = (e) => {
      openModal(item.id);
    };

    let className = "item";

    if (rowIndex === 0) {
      className += index % 2 === 0 ? " item-first-row-even" : "";
    } else if (rowIndex === 1) {
      const isFirstColumnEven = halfLength % 2 === 0;

      if (isFirstColumnEven) {
        className +=
          columnIndex % 2 === 0 ? " item-second-row-even-start-even" : "";
      } else {
        className +=
          columnIndex % 2 === 0 ? " item-second-row-even-end-odd" : "";
      }
    }

    return (
      <li
        className={className}
        onClick={handleMouseDown}
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

  const columnCount = () => {
    const screenWidth = window.innerWidth;
    const length = data.length;
  
    if (screenWidth < 1025) {
      return Math.floor(length / 2); 
    }
  
    if (length >= 14 && length < 50) {
      return Math.floor(length / 2) * 20;
    } else if (length >= 50 && length <= 100) {
      return Math.floor(length / 2) * 10;
    }
  
    return Math.floor(length / 2);
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
                ref={isScrolling ? gridRef : null}
                className="masonry-list"
                height={gridSettings.height}
                columnCount={columnCount()}
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
      <Modal
        dataDetail={dataDetail}
        closeModal={closeModal}
        currentImageIndex={currentImageIndex}
        showNextImage={showNextImage}
        showPrevImage={showPrevImage}
      />
    </section>
  );
};

export default Portfolio;
