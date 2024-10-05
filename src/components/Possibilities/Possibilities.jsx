import React, { useState, useEffect } from "react";
import "./Possibilities.css";

const Possibilities = ({ home, cat }) => {
  const [headerText, setHeaderText] = useState("останетесь довольны");

  const updateHeaderText = () => {
    if (window.innerWidth <= 744) {
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

  const renderCardList = () => {
    switch (cat) {
      case 1:
        return (
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
                заказа без задержек. Заранее озвучиваем время окончания работ
              </p>
            </li>
            <li className="card card-margin">
              <h3>Высокое качество</h3>
              <p>
                Мы используем только лучшие, безопасные для здоровья материалы,
                современные технологии и профессиональное оборудование
              </p>
            </li>
            <li className="card">
              <h3>Опыт работы 7 лет</h3>
              <p>Наша команда выполняет заказы разной степени сложности</p>
            </li>
            <li className="card card-right">
              <h3>Договор и гарантия от 1 года</h3>
              <p>
                Заключаем контракт, который гарантирует вам качество исполнения
              </p>
            </li>
          </ul>
        );
      case 2:
        return (
          <ul className="card-container">
            <li className="card">
              <h3>Высокое качество</h3>
              <p>
                Мы используем только лучшие, безопасные для здоровья материалы,
                грамотно подбираем краску под поверхность на вашем пространстве.
              </p>
            </li>
            <li className="card">
              <h3>Индивидуальность</h3>
              <p>
                Мы бесплатно выезжаем на объект клиента для знакомства с
                проектом. Разрабатываем индивидуальный эскиз с учетом пожеланий.
              </p>
            </li>
            <li className="card card-margin">
              <h3>Гарантия от 1 года</h3>
              <p>Рисунки долговечны, сохраняют форму и цвет</p>
            </li>
            <li className="card">
              <h3>Экспертность</h3>
              <p>
                Все работы соответствуют эскизу, точная реализация заказа.
                Работаем в разных техниках, любыми материалами
              </p>
            </li>
            <li className="card card-right">
              <h3>Креативность</h3>
              <p>
                В макете учитываем все ваши пожелания, а также выполняем все
                работы опираясь на современные тенденции.
              </p>
            </li>
          </ul>
        );
      case 3:
        return (
          <ul className="card-container">
            <li className="card">
              <h3>Высокое качество</h3>
              <p>
                Все материалы премиум класса, художественное масло, холст с
                натяжкой на подрамник от чистого хлопка до 100% льна любых
                размеров под заказ
              </p>
            </li>
            <li className="card">
            <h3>Индивидуальность</h3>
              <p>Все размеры и стили полностью оговариваются с заказчиком</p>
            </li>
            <li className="card card-margin">
              <h3>Долговечность</h3>
              <p>не выцветают и не утрачивают своего первозданного лоска</p>
            </li>
            <li className="card">
              <h3>Сроки</h3>
              <p>С разу оговаривается процесс работы и время реализации</p>
            </li>
            <li className="card card-right">
              <h3>Гарантия</h3>
              <p>От 10 лет</p>
            </li>
          </ul>
        );
      case 4:
        return (
          <ul className="card-container">
            <li className="card">
              <h3>Высокое качество</h3>
              <p>
                Разработка иллюстраций с фирменной идеей в любых стилях.
                Отправляется с высоким разрешением в любом удобном формате для
                печати: PDF, JPEG, PNG, TIFF
              </p>
            </li>
            <li className="card">
              <h3>Экспертность</h3>
              <p>
                Все иллюстрации отрисовываются художником вручную в цифровом
                формате
              </p>
            </li>
            <li className="card card-margin">
              <h3>Оперативность</h3>
              <p>
              Мы всегда соблюдаем сроки и отправляем работы заранее
              </p>
            </li>
            <li className="card">
              <h3>Долговечность</h3>
              <p>
                Картины с печатью на холсте не провиснут и сохранят свою форму и
                яркость цвета даже через много лет
              </p>
            </li>
            <li className="card card-right">
              <h3>Креативность.</h3>
              <p>
                По желанию готовая картина украшается именной красивой
                подарочной упаковкой премиум-класса
              </p>
            </li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <section className={home ? "possibilities" : "possibilities-cat"}>
      <div className="possibilities_content">
        <div className="content">
          <div className="content-descriptons">
            <div>
              <h2 className="h2_1">Вы точно</h2>
              <h2 className="h2_2">
                {headerText.split("\n").map((line, index) => (
                  <h2 className="h2_3" key={index}>
                    {line}
                    <br />
                  </h2>
                ))}
              </h2>
            </div>
            <p>
              Для меня важно нести искусство в современный мир, ведь я не просто
              рисую, я живу этим. Готова реализовать самую смелую задумку
              наилучшим образом на высоком уровне
            </p>
          </div>
          {renderCardList()}
        </div>
      </div>
    </section>
  );
};

export default Possibilities;
