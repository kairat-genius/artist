import React, { useState } from "react";
import "./Footer.css";
import img from "../../assets/footer/footer.png";
import img_744 from "../../assets/footer/footer-744.png";
import Button from "../button/button";
import { postContactRequest } from "../../api/Contact/postContact";

const Footer = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rateLimitError, setRateLimitError] = useState("");

  const validatePhone = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, ''); 
    return cleanedPhone.length >= 10 && cleanedPhone.length <= 15;
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);

    if (phoneError) {
      setPhoneError("");
    }
  };

  const handleCheckboxChange = (e) => {
    setCheckboxChecked(e.target.checked);

    if (e.target.checked) {
      setCheckboxError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkboxChecked) {
      setCheckboxError("Необходимо принять условия соглашения");
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError("Некорректный формат номера. Пример: +79381630733");
      return;
    }

    // Проверка имени
    if (!name.trim()) {
      setNameError("Имя обязательно для заполнения.");
      return;
    }

    setPhoneError(""); 
    setNameError("");
    setCheckboxError("");

    postContactRequest({ phone, name })
      .then(() => {
        setFormSubmitted(true);
        setSuccessMessage("Спасибо! Мы свяжемся с вами в ближайшее время.");
        setPhone(""); 
        setName("");  
        setCheckboxChecked(false); 
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          setRateLimitError("Превышен лимит запросов. Попробуйте позже.");
        } else {
          setFormSubmitted(false);
        }
      });
  };

  return (
    <section className="footer" id="to-order">
      <div className="footer_content">
        <img className="img-744" src={img_744} />
        <div className="content">
          <div className="footer-descriptons">
            <div>
              <h2 className="h2_1">Давайте обсудим</h2>
              <h2 className="h2_2">ваш проект</h2>
            </div>
            <p>
              Оставьте ваши контакты, мы свяжемся с вами в ближайшее время,
              чтобы ответить на ваши вопросы.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact">
            <div className="contact-content">
              <div className="label-input">
                <div className="input-contact">
                  <label htmlFor="number">Укажите ваш телефон:</label>
                  <input
                    id="number"
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+79381630733"
                  />
                  {phoneError && <p className="error-text">{phoneError}</p>}
                </div>
                <div className="input-contact">
                  <label htmlFor="name">Как вас зовут?</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван"
                  />
                  {nameError && <p className="error-text">{nameError}</p>}
                </div>
              </div>
              {checkboxError && <p className="error-text">{checkboxError}</p>}
              <div className="agreements">
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={checkboxChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="checkbox">
                  Я принимаю условия пользовательского соглашения
                </label>
              </div>
            </div>

            <Button type="submit" />
          </form>
          {successMessage && <p className="success-text">{successMessage}</p>}
          {rateLimitError && <p className="error-text">{rateLimitError}</p>}

          <img className="footer-img" src={img} />
        </div>
      </div>
      <footer>
        <ul className="social">
          <li>
            <a href="https://www.instagram.com/tati_b_n?">Запрещенограмм</a>
          </li>
          <li>
            <a href="https://t.me/tati_b_n">Телеграмм</a>
          </li>
          <li>
            <a href="https://wa.me/+79381630733">Вотсап</a>
          </li>
          <li>
            <a>+79381630733</a>
          </li>
        </ul>
        <span className="big_text">TATI.B.N</span>
      </footer>
    </section>
  );
};

export default Footer;
