import React, { useState, useEffect } from "react";
import "./Reviews.css";

import background1 from "../../assets/reviews/background_reviews_1.png";
import background2 from "../../assets/reviews/background_reviews_2.png";
import background1_744 from "../../assets/reviews/background_reviews_1-744.png";
import background2_744 from "../../assets/reviews/background_reviews_2-744.png";

const Reviews = () => {
  const [headerText, setHeaderText] = useState("говорят Обо мне");

  const updateHeaderText = () => {
    if (window.innerWidth <= 375) {
      setHeaderText("говорят Обо\n мне"); 
    } else {
      setHeaderText("говорят Обо мне");
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
    <section className="reviews" id="reviews">
      <div className="reviews_content">
        <div className="reviews_background">
          <img src={background1} className="reviews_img" />
          <img src={background2} className="reviews_img2" />

          <img src={background1_744} className="reviews_img-744" />
          <img src={background2_744} className="reviews_img2-744" />
        </div>
        <div className="content">
          <div className="reviews-descriptons">
            <div>
              <h2 className="h2_1">Клиенты</h2>
              <h2 className="h2_2">{headerText.split("\n").map((line, index) => (
                <h2 className="h2_3" key={index}>{line}<br/></h2>
              ))}</h2>
            </div>
          </div>

          <div className="masonry-wrapper">
            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
              >
                <rect
                  x="70"
                  y="70"
                  width="70"
                  height="70"
                  rx="35"
                  transform="rotate(-180 70 70)"
                  fill="#333333"
                />
                <path
                  d="M10.2929 34.2929C9.90237 34.6834 9.90237 35.3166 10.2929 35.7071L16.6569 42.0711C17.0474 42.4616 17.6805 42.4616 18.0711 42.0711C18.4616 41.6805 18.4616 41.0474 18.0711 40.6569L12.4142 35L18.0711 29.3431C18.4616 28.9526 18.4616 28.3195 18.0711 27.9289C17.6805 27.5384 17.0474 27.5384 16.6569 27.9289L10.2929 34.2929ZM58 34L11 34V36L58 36V34Z"
                  fill="white"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
              >
                <rect
                  x="70"
                  y="70"
                  width="70"
                  height="70"
                  rx="35"
                  transform="rotate(-180 70 70)"
                  fill="#333333"
                />
                <path
                  d="M59.7071 35.7071C60.0976 35.3166 60.0976 34.6834 59.7071 34.2929L53.3431 27.9289C52.9526 27.5384 52.3195 27.5384 51.9289 27.9289C51.5384 28.3195 51.5384 28.9526 51.9289 29.3431L57.5858 35L51.9289 40.6569C51.5384 41.0474 51.5384 41.6805 51.9289 42.0711C52.3195 42.4616 52.9526 42.4616 53.3431 42.0711L59.7071 35.7071ZM12 36H59V34H12V36Z"
                  fill="white"
                />
              </svg>
            </div>
            <ul className="wrapper">
              <li className="item_1">
                <img src={`http://placehold.it/263x351`} />
                <div className="card">
                  <p>
                    Все просто супер! Созвонились, все обсудили, Татьяна
                    оперативно прислала макет. После согласования назначили
                    день, все сделано быстро и качественно! Я в восторге! Не
                    могу налюбоваться картиной!!! Спасибо!!! Она просто бомба
                    !!!
                  </p>
                  <span>Юлия</span>
                </div>
              </li>
              <li className="item_2 item-center">
                <img src={`http://placehold.it/357x477`} />
                <div className="card">
                  <p>
                    Договорились о работе, выполнили все быстро! Очень
                    понравилась итоговая работа, благодаря росписи стен, в
                    помещении стало очень уютно! По цвету все идеально подошло в
                    цвет логотипа, качество понравилось! Важно, что мы в студии
                    смогли параллельно работать, так как краска без запаха!
                    Рекомендую!
                  </p>
                  <span>Юлия</span>
                </div>
              </li>
              <li className="item_3">
                <img src={`http://placehold.it/263x351`} />

                <div className="card">
                  <p>
                    Экскурсия очень понравилась, раньше вроде видели все это,
                    ходили мимо, оценивали на уровне - «да это довольно
                    красиво». Сейчас посмотрели под новым углом, осознанно,
                    знаешь куда смотреть и на что обращать внимание
                    уже в самостоятельных прогулках по городу, а главное историю
                    каждого этого дома с Томских открыток!
                  </p>
                  <span>Юлия</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
