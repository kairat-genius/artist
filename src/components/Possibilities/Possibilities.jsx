import React, { useState, useEffect } from "react";
import "./Possibilities.css";


const Possibilities = ({home}) => {
  const [headerText, setHeaderText] = useState("останетесь довольны");

  const updateHeaderText = () => {
    if (window.innerWidth <= 375) {
      setHeaderText("останетесь\n довольны"); 
    } else {
      setHeaderText("останетесь довольны");
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
    <section className={home ? "possibilities" : "possibilities-cat"}>
      <div className="possibilities_content">
        <div className="content">
          <div className="content-descriptons">
            <div>
              <h2 className="h2_1">Вы точно</h2>
              <h2 className="h2_2">{headerText.split("\n").map((line, index) => (
                <h2 className="h2_3" key={index}>{line}<br/></h2>
              ))}</h2>
            </div>
            <p>
            Для меня важно нести искусство в современный мир, ведь я не просто рисую, я живу этим. Готова реализовать самую смелую задумку самым лучшим, образом на высоком уровне  
            </p>
          </div>
          <ul className="card-container">
            <li className="card">
              <h3>Доступно</h3>
              <p>
                Мы не делаем лишних наценок, работаем без посредников, стараемся
                максимально оптимизировать весь расход для получения идеального
                соотношения цены и качества
              </p>
            </li>
            <li className="card">
              <h3>Быстро</h3>
              <p>
                Сжатые сроки от 1 дня, сразу бронируем время на выполнение
                заказа без задержек и переносов. Заранее озвучиваем время
                окончания работ
              </p>
            </li>
            <li className="card card-margin">
              <h3>Высокое качество</h3>
              <p>
                Мы используем только лучшее, безопасные для здоровья материалы,
                современные технологии и профессиональное оборудование
              </p>
            </li>
            <li className="card">
              <h3>Опыт работы 7 лет</h3>
              <p>Наша команда выполняет заказы разной степени сложности...</p>
            </li>
            <li className="card card-right">
              <h3>Договор и гарантия от 1 года</h3>
              <p>
                Заключаем контракт, который гарантирует вам качество
                исполнения...
              </p>
            </li>
          </ul>
         
        </div>
      </div>
    </section>
  );
};

export default Possibilities;
