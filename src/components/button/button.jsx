import React from "react";
import "./button.css";

const Button = () => {
  return (
            <button className="button">
            ОФОРМИТЬ ЗАКАЗ{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 51 50"
              fill="none"
            >
              <path
                d="M29.7484 10.5938L27.5 12.8422L38.0984 23.4359H6.75V26.5609H38.0984L27.5016 37.1562L29.7484 39.4031L43.0297 26.1219L44.1031 24.9984L43.0297 23.875L29.7484 10.5938Z"
                fill="white"
              />
            </svg>
          </button>
  );
};

export default Button;
