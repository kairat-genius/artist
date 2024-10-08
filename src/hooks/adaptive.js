// src/hooks/useMouseScroll.js
import { useState, useEffect } from "react";

const adaptivePortfolio = () => {
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

      return { gridSettings, setGridSettings };
}
export default adaptivePortfolio;


