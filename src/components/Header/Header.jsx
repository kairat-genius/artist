import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import burger_menu from "../../assets/png/burger_menu.png";
import "./Header.css";

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();

  // Функция для переключения видимости модального окна
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const isActive = (hash) => {
    return location.hash === hash;
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalVisible]);



  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          const y = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 300); 
      }
    }
  }, [location]);
  // Функция для обработки клика по ссылке
  const handleLinkClick = () => {
    if (modalVisible) {
      toggleModal(); // Закрываем меню
    }
  };

  return (
    <>
      {!modalVisible && (
        <header>
          <a href="/">
            <img className="logo" src="/logo.png" alt="Logo" />
          </a>
          <nav>
            <a href="/#about" onClick={handleLinkClick} className={isActive("#about") ? "active" : ""}>
              <span>Обо мне</span>
            </a>
            <a href="/#services" onClick={handleLinkClick} className={isActive("#services") ? "active" : ""}>
              <span>Услуги</span>
            </a>
            <a href="/#cooperate" onClick={handleLinkClick} className={isActive("#cooperate") ? "active" : ""}>
              <span>Клиенты</span>
            </a>
            <a href="/#reviews" onClick={handleLinkClick} className={isActive("#reviews") ? "active" : ""}>
              <span>Отзывы</span>
            </a>
            <a href="/#gallery" onClick={handleLinkClick} className={isActive("#gallery") ? "active" : ""}>
              <span>Галерея</span>
            </a>
            <a href="/#to-order" onClick={handleLinkClick} className={isActive("#to-order") ? "active" : ""}>
              <span>Заказать</span>
            </a>
          </nav>
          <div className="number">
            <a href="tel:+79381630733" style={{ textDecoration: "none", color: "inherit" }}>
              <span>+7 938 163 07 33</span>
            </a>
          </div>

          <label htmlFor="menu" className="menu-label" onClick={toggleModal}>
            <img src={burger_menu} alt="Menu" />
          </label>
        </header>
      )}

      {modalVisible && (
        <div className="modal-overlay" onClick={toggleModal}></div>
      )}
      <div className={`modal ${modalVisible ? "show" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <div className="navbar">
            <a href="/">
              <img className="logo" src="/modal_logo.png" alt="Logo" />
            </a>
            <nav>
              <a href="/#about" onClick={handleLinkClick} className={isActive("#about") ? "active" : ""}>
                Обо мне
              </a>
              <a href="/#services" onClick={handleLinkClick} className={isActive("#services") ? "active" : ""}>
                Услуги
              </a>
              <a href="/#cooperate" onClick={handleLinkClick} className={isActive("#cooperate") ? "active" : ""}>
                Клиенты
              </a>
              <a href="/#reviews" onClick={handleLinkClick} className={isActive("#reviews") ? "active" : ""}>
                Отзывы
              </a>
              <a href="/#gallery" onClick={handleLinkClick} className={isActive("#gallery") ? "active" : ""}>
                Галерея
              </a>
              <a href="/#to-order" onClick={handleLinkClick} className={isActive("#to-order") ? "active" : ""}>
                Заказать
              </a>
            </nav>
          </div>
          <div className="number">
            <a href="tel:+79381630733" style={{ textDecoration: "none", color: "inherit" }}>
              <span>+7 938 163 07 33</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
