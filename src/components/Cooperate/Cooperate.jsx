import React from "react";
import "./Cooperate.css";

import background1 from "../../assets/cooperate/background_cooperate.png"
import background2 from "../../assets/cooperate/background_cooperate_2.png"

import logo1 from "../../assets/cooperate/1.svg"
import logo2 from "../../assets/cooperate/2.svg"
import logo3 from "../../assets/cooperate/3.svg"
import logo4 from "../../assets/cooperate/4.svg"
import logo5 from "../../assets/cooperate/5.svg"
import logo6 from "../../assets/cooperate/6.svg"
import logo7 from "../../assets/cooperate/7.svg"
import logo8 from "../../assets/cooperate/8.svg"
import logo9 from "../../assets/cooperate/9.svg"


const Cooperate= () => {
  return (
    <section className="cooperate" id="cooperate">
      <div className="cooperate_content">
        <div className="cooperate_background">
        <img src={background1} className="cooperate_img" />
        <img
          src={background2}
          className="cooperate_img2"
        />
      </div>
        <div className="content">
          <div className="cooperate-descriptons">
         
              <h2 className="h2_1">Я сотрудничаю с:</h2>
    
            <p>Около 80% клиентов вернулись ко мне еще раз. Я бережно отношусь к кажому клиентами и выполняют работы точно в срок на самом высоком уровне</p>
          </div>
            <ul className="wrapper">
                <li>
                    <img src={logo1} className="coopetate_logo_1"/>
                </li>
                <li>
                    <img src={logo2} className="coopetate_logo_2"/>
                </li>
                <li>
                    <img src={logo3} className="coopetate_logo_3"/>
                </li>
                <li>
                    <img src={logo4} className="coopetate_logo_4"/>
                </li>
                <li>
                    <img src={logo5} className="coopetate_logo_5"/>
                </li>
                <li>
                    <img src={logo6} className="coopetate_logo_6"/>
                </li>
                <li>
                    <img src={logo7} className="coopetate_logo_7"/>
                </li>
                <li>
                    <img src={logo8} className="coopetate_logo_8"/>
                </li>
                <li>
                    <img src={logo9} className="coopetate_logo_9"/>
                </li>
            
            </ul>

        </div>
      </div>
    </section>
  );
};

export default Cooperate;
