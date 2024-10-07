import { useRef, useEffect } from 'react';

const useManualScroll = (gridRef, isScrolling, setIsScrolling, scrollPosition) => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const grid = gridRef.current?._outerRef;

    if (!grid) return;

    const handleMouseDown = (e) => {
  
      if (e.target.classList.contains('masonry-list')) {
        isDragging.current = true;
        startX.current = e.pageX - grid.offsetLeft;
        scrollLeft.current = grid.scrollLeft;
        setIsScrolling(false); 
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const x = e.pageX - grid.offsetLeft;
      const walk = (x - startX.current) * 2;
      grid.scrollLeft = scrollLeft.current - walk; 
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      setIsScrolling(true); 

      scrollPosition.current = grid.scrollLeft;

    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      setIsScrolling(true);
    };

    // телефоны

    const handleTouchStart = (e) => {
      if (e.target.classList.contains('masonry-list')) {
        isDragging.current = true;
        startX.current = e.touches[0].pageX - grid.offsetLeft;
        scrollLeft.current = grid.scrollLeft;
        setIsScrolling(false);
      }
      
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current) return;

      const x = e.touches[0].pageX - grid.offsetLeft;
      const walk = (x - startX.current) * 4; 
      grid.scrollLeft = scrollLeft.current - walk; 
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      setIsScrolling(true); 


      scrollPosition.current = grid.scrollLeft;
    };


    grid.addEventListener("mousedown", handleMouseDown);
    grid.addEventListener("mousemove", handleMouseMove);
    grid.addEventListener("mouseup", handleMouseUp);
    grid.addEventListener("mouseleave", handleMouseLeave);

    grid.addEventListener("touchstart", handleTouchStart);
    grid.addEventListener("touchmove", handleTouchMove);
    grid.addEventListener("touchend", handleTouchEnd);

    return () => {
      grid.removeEventListener("mousedown", handleMouseDown);
      grid.removeEventListener("mousemove", handleMouseMove);
      grid.removeEventListener("mouseup", handleMouseUp);
      grid.removeEventListener("mouseleave", handleMouseLeave);

      grid.removeEventListener("touchstart", handleTouchStart);
      grid.removeEventListener("touchmove", handleTouchMove);
      grid.removeEventListener("touchend", handleTouchEnd);
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
