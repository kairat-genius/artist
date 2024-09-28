import React from "react";
import "./Footer.css";
import img from "../../assets/footer/footer.png"
import img_744 from "../../assets/footer/footer-744.png"
import Button from "../button/button";

const Footer = () => {
  return (
    <section className="footer" id="to-order">
      <div className="footer_content">
      <img className="img-744" src={img_744}/>
        <div className="content">
          <div className="footer-descriptons">
            <div>
              <h2 className="h2_1">Давайте обсудим</h2>
              <h2 className="h2_2">ваш проект</h2>
            </div>
            <p>
              Оставьте ваши контакты, мы свяжемся с вами в ближайшее время,
              чтобы ответить на ваши вопросы
            </p>
          </div>

          <div className="contact">
            <div className="contact-content">
            <div className="label-input">
              <div className="input-contact">
              <label htmlFor="number">Укажите ваш телефон:</label>
              <input id="number" type="text" placeholder="+7-(926)-454-85-62" />
              </div>
              <div className="input-contact">
              <label htmlFor="name">Как вас зовут?</label>
              <input id="name" type="text" placeholder="Иван" />
              </div>
            </div>
            <div className="agreements">
              <input id="checkbox" type="checkbox" />
              <label htmlFor="checkbox">Я принимаю условия пользовательского соглашения</label>
            </div>
            </div>
            <Button/>
          </div>
          <img className="footer-img" src={img}/>
  
        </div>
      </div>
      <footer>
        <ul className="social">
          <li>
            <a>Запрещенограмм</a>
          </li>
          <li>
            <a>Телеграмм</a>
          </li>
          <li>
            <a>Вотсап</a>
          </li>
          <li>
            <a>+7(926)245 35 25</a>
          </li>
        </ul>
       <span className="big_text">TATI.B.N</span>
      </footer>
    </section>
    
  );
};

export default Footer;
