import { useRef, useEffect } from 'react';

const useManualScroll = (gridRef, isScrolling, setIsScrolling, scrollPosition, data) => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const grid = gridRef.current?._outerRef;

    if (!grid) return;

    const handleMouseDown = (e) => {
      if (window.innerWidth < 1025) {
        return;
      } else if (window.innerWidth >= 1025 && data.length < 14) {
        return;
      };

      if (e.target.classList.contains('masonry-list')) {
        isDragging.current = true;
        startX.current = e.pageX - grid.offsetLeft;
        scrollLeft.current = grid.scrollLeft;
        setIsScrolling(false); 
      }
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth < 1025) {
        return;
      } else if (window.innerWidth >= 1025 && data.length < 14) {
        return;
      };

      if (!isDragging.current) return;

      const x = e.pageX - grid.offsetLeft;
      const walk = (x - startX.current) * 2;
      grid.scrollLeft = scrollLeft.current - walk; 
    };

    const handleMouseUp = () => {
      if (window.innerWidth < 1025) {
        return;
      } else if (window.innerWidth >= 1025 && data.length < 14) {
        return;
      };

      isDragging.current = false;
      setIsScrolling(true); 

      scrollPosition.current = grid.scrollLeft;

    };

    const handleMouseLeave = () => {
      if (window.innerWidth < 1025) {
        return;
      } else if (window.innerWidth >= 1025 && data.length < 14) {
        return;
      };

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
  }, [gridRef, setIsScrolling]);

  useEffect(() => {
    const grid = gridRef.current?._outerRef;
    if (grid && isScrolling) {
      grid.scrollLeft = scrollPosition.current;
    }
  }, [isScrolling, gridRef, scrollPosition]);
};

export default useManualScroll;
