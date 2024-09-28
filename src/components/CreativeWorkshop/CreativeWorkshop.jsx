import React from "react";
import "./CreativeWorkshop.css";
import img from "../../assets/png/creative_workshop.png";
import Button from "../button/button";

const CreativeWorkshop = () => {
  return (
    <section className="creative_workshop">
      <div className="workshop">
        <div className="content">
          <div className="content_description">
            <div className="title">
              <span className="creative">Творческая мастерская</span>
              <h1>Tati.b.n.</h1>
            </div>
            <p>
              Художественные картины, роспись стен, графический дизайн на заказ
            </p>
          </div>
          <Button />
        </div>
        <img src={img}/>
      </div>
    </section>
  );
};

export default CreativeWorkshop;
