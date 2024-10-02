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

  return (
    <>
      {!modalVisible && (
        <header>
          <a href="/">
            <img className="logo" src="/logo.png" alt="Logo" />
          </a>
          <nav>
            <a href="/#about" className={isActive("#about") ? "active" : ""}>
              <span>Обо мне</span>
            </a>
            <a
              href="/#services"
              className={isActive("#services") ? "active" : ""}
            >
              <span>Услуги</span>
            </a>
            <a
              href="/#cooperate"
              className={isActive("#cooperate") ? "active" : ""}
            >
              <span>Клиенты</span>
            </a>
            <a
              href="/#reviews"
              className={isActive("#reviews") ? "active" : ""}
            >
              <span>Отзывы</span>
            </a>
            <a
              href="/#gallery"
              className={isActive("#gallery") ? "active" : ""}
            >
              <span>Галерея</span>
            </a>
            <a
              href="/#to-order"
              className={isActive("#to-order") ? "active" : ""}
            >
              <span>Заказать</span>
            </a>
          </nav>
          <div className="number">
            <span>+7(926)542 86 59</span>
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
              <a href="/#about" className={isActive("#about") ? "active" : ""}>
                Обо мне
              </a>
              <a
                href="/#services"
                className={isActive("#services") ? "active" : ""}
              >
                Услуги
              </a>
              <a
                href="/#cooperate"
                className={isActive("#cooperate") ? "active" : ""}
              >
                Клиенты
              </a>
              <a
                href="/#reviews"
                className={isActive("#reviews") ? "active" : ""}
              >
                Отзывы
              </a>
              <a
                href="/#gallery"
                className={isActive("#gallery") ? "active" : ""}
              >
                Галерея
              </a>
              <a
                href="/#to-order"
                className={isActive("#to-order") ? "active" : ""}
              >
                Заказать
              </a>
            </nav>
          </div>
          <div className="number">
            <span>+7(926)542 86 59</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
