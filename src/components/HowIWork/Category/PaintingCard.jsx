import React, { useEffect, useRef } from "react";

export const WallPaintingCard = () => {
  return (
    <ul className="row-card">
      <li className="work-card card1">
        <div className="title-container">
          <span className="count">1</span>
          <div className="title-card">Разработка дизайн проекта</div>
        </div>
        <p>
          Мы получаем от вас информацию и пожелания, готовим индивидуальный
          дизайн проект, с внесением необходимых корректировок
        </p>
      </li>
      <li className="work-card card2">
        <div className="title-container">
          <span className="count">2</span>
          <div className="title-card">Согласование сроков и бюджета</div>
        </div>
        <p>
          Выполняем все в удобное для вас время и ваши сроки. Бюджет формируется
          индивидуально под вас
        </p>
      </li>
      <li className="work-card card3">
        <div className="title-container">
          <span className="count">3</span>
          <div className="title-card">Заключение договора.</div>
        </div>
        <p>
          Заключаем Контракт, который гарантирует вам качество исполнения работы
          на оговоренных условиях
        </p>
      </li>
      <li className="work-card card4">
        <div className="title-container">
          <span className="count">4</span>
          <div className="title-card">Реализация проекта</div>
        </div>
        <p>
          Вносится предоплата, закупка материалов, выезд на объект с нанесением
          рисунка.
        </p>
      </li>
      <li className="work-card card5">
        <div className="title-container">
          <span className="count">5</span>
          <div className="title-card">Сдача проекта в срок</div>
        </div>
        <p>Полная отплата и восхищение работой</p>
      </li>
    </ul>
  );
};

export const OilPaintingCard = () => {
  return (
    <ul className="row-card">
      <li className="work-card card1">
        <div className="title-container">
          <span className="count">1</span>
          <div className="title-card">Обсуждение заказа</div>
        </div>
        <p>
          Понять пожелания клиента, тему, композицию, размеры и стиль. Уточнить
          все детали, чтобы соответствовать ожиданиям
        </p>
      </li>
      <li className="work-card card2">
        <div className="title-container">
          <span className="count">2</span>
          <div className="title-card">Сбор референсов</div>
        </div>
        <p>
          Найти примеры, которые помогут лучше понять, что ожидается. Это могут
          быть фотографии, другие картины или отдельные элементы
        </p>
      </li>
      <li className="work-card card3">
        <div className="title-container">
          <span className="count">3</span>
          <div className="title-card">Подготовка холста</div>
        </div>
        <p>
          Выбор нужного размера и типа холста. Натяжка на подрамник и грунтовка
          (если требуется)
        </p>
      </li>
      <li className="work-card card4">
        <span className="count">4</span>
        <div className="title-card">Создание эскиза</div>
        <p>
          Эскиз выполняется на бумаге или в графическом формате. Он помогает
          заложить композиционную структуру
        </p>
      </li>
      <li className="work-card card5">
        <div className="title-container">
          <span className="count">5</span>
          <div className="title-card">Основная работа</div>
        </div>
        <p>
          Пошаговое нанесение слоев краски, работа с цветом, светом и тенью.
          Прорисовка мелких деталей, проработка текстур, улучшение
          композиционных элементов
        </p>
      </li>
      <li className="work-card card1">
        <div className="title-container">
          <span className="count">6</span>
          <div className="title-card">Обсуждение заказа</div>
        </div>
        <p>
          Понять пожелания клиента, тему, композицию, размеры и стиль. Уточнить
          все детали, чтобы соответствовать ожиданиям
        </p>
      </li>
      <li className="work-card card2">
        <div className="title-container">
          <span className="count">7</span>
          <div className="title-card">Сбор референсов</div>
        </div>
        <p>
          Найти примеры, которые помогут лучше понять, что ожидается. Это могут
          быть фотографии, другие картины или отдельные элементы
        </p>
      </li>
      <li className="work-card card3">
        <div className="title-container">
          <span className="count">8</span>
          <div className="title-card">Подготовка холста</div>
        </div>
        <p>
          Выбор нужного размера и типа холста. Натяжка на подрамник и грунтовка
          (если требуется)
        </p>
      </li>
    </ul>
  );
};

export const DigitalIllustrationCard = () => {
  return (
    <ul className="row-card">
      <li className="work-card-digitall card1">
        <span className="count">1</span>
        <div className="title-card">Идея и концепт</div>
        <p>
          Определить цель иллюстрации. Техническое задание. Сделать наброски
          концептов, которые помогут визуализировать идею
        </p>
      </li>
      <li className="work-card-digitall card2">
        <span className="count">2</span>
        <div className="title-card">Перенос идеи на цифровую платформу</div>
        <p>
          Выбераю программу для работы (Photoshop, Illustrator, CorelDRAW,
          Procreate и т.д.). Создаю документ с подходящими размерами и
          разрешением
        </p>
      </li>
      <li className="work-card-digitall card3">
        <span className="count">3</span>
        <div className="title-card">Сбор референсов</div>
        <p>
          Найти примеры, которые помогут лучше понять, что ожидается. Это могут
          быть фотографии, другие картины или отдельные элементы
        </p>
      </li>
      <li className="work-card-digitall card4">
        <span className="count">4</span>
        <div className="title-card">Эскиз (скетч)</div>
        <p>
          Сделать набросок на цифровом холсте. Это поможет определить композицию
          и основные элементы
        </p>
      </li>
      <li className="work-card-digitall card5">
        <span className="count">5</span>
        <div className="title-card">Обработка и корректировки</div>
        <p>
          Просматриваем иллюстрацию на предмет баланса цвета, контраста и
          гармонии. Вносим необходимые корректировки в оттенки, интенсивность и
          яркость
        </p>
      </li>
      <li className="work-card-digitall card2">
        <span className="count">6</span>
        <div className="title-card">Финальная проверка и экспорт</div>
        <p>
          Проверяем иллюстрацию в разных разрешениях для оценки качества.
          Экспортируем конечную работу в нужных форматах (JPEG, PNG, PDF и т.д.)
        </p>
      </li>
    </ul>
  );
};
