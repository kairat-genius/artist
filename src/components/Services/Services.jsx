import React, { useState, useEffect } from "react";
import "./Services.css";

import img1 from "../../assets/services/1.png";
import img2 from "../../assets/services/2.png";
import img3 from "../../assets/services/3.png";

import background_services from "../../assets/services/background_services.png";
import background_services_flower from "../../assets/services/img.png";

const Services = () => {
  const [headerText, setHeaderText] = useState("Креативный подход");

  const updateHeaderText = () => {
    if (window.innerWidth <= 600) {
      setHeaderText("Креативный\n подход"); 
    } else {
      setHeaderText("Креативный подход");
    }
  };

  useEffect(() => {
    updateHeaderText(); 

    const handleResize = () => {
      updateHeaderText(); 
    };

    window.addEventListener("resize", handleResize); 
    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);
  return (
    <section className="services" id="services">
      <div className="services_background">
        <img src={background_services} className="background_img" />
        <img
          src={background_services_flower}
          className="background_img_flower"
        />
      </div>
      <div className="services_content">
        <div className="content">
          <div className="content-descriptons">
            <div>
              <h2 className="h2_1">мои Услуги</h2>
              <h2 className="h2_2">{headerText.split("\n").map((line, index) => (
                <h2 className="h2_3" key={index}>{line}<br/></h2>
              ))}</h2>
            </div>
            <p>Готова реализовать самую смелую задумку самым лучшим, образом на высоком уровне  </p>
          </div>
          <ul className="card-container">
            <li className="card">
              <a href="/oil-painting" className="card-content">
                <img src={img1} className="services-card-img" />
                <div className="services-card-text">
                  <h3>Картины маслом</h3>
                  <p>
                    Удивительный материал, который позволяет передавать глубину
                    эмоций и создавать изысканные произведения искусства
                  </p>
                </div>
              </a>
              <a href="/oil-painting" className="detailed">
                <span>ПОДРОБНЕЕ</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="28"
                  viewBox="0 0 36 28"
                  fill="none"
                >
                  <path
                    d="M0 14.5H34M34 14.5L24.5 1M34 14.5L24.5 27"
                    stroke="#FF1979"
                    strokeWidth="3"
                  />
                </svg>
              </a>
            </li>
            <li className="card">
            <a href="/wall-painting" className="card-content">
                <img src={img2} className="services-card-img" />
                <div className="services-card-text">
                  <h3>Росписи стен</h3>
                  <p>
                  Я вместе со своей командой, занимаемся росписью стен, превращая обычные поверхности
                  в настоящие произведения искусства
                  </p>
                </div>
              </a>
              <a href="/wall-painting" className="detailed">
                <span>ПОДРОБНЕЕ</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="28"
                  viewBox="0 0 36 28"
                  fill="none"
                >
                  <path
                    d="M0 14.5H34M34 14.5L24.5 1M34 14.5L24.5 27"
                    stroke="#FF1979"
                    strokeWidth="3"
                  />
                </svg>
              </a>
            </li>
            <li className="card">
              <a href="/digital-illustration" className="card-content">
                <img src={img3} className="services-card-img" />
                <div className="services-card-text">
                  <h3>Графический дизайн</h3>
                  <p>
                  В цифровой эпохе я также нашла свою нишу – создаю яркие и современные цифровые иллюстрации
                  </p>
                </div>
              </a>
              <a href="/digital-illustration" className="detailed">
                <span>ПОДРОБНЕЕ</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="28"
                  viewBox="0 0 36 28"
                  fill="none"
                >
                  <path
                    d="M0 14.5H34M34 14.5L24.5 1M34 14.5L24.5 27"
                    stroke="#FF1979"
                    strokeWidth="3"
                  />
                </svg>
              </a >
            </li>
          </ul>
        </div>
          </div>
    </section>
  );
};

export default Services;
