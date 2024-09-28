import React from "react";
import "./HowIWork.css";

import cat_1 from "../../assets/painting/now-i-work/cat-1.png";
import cat_2_1 from "../../assets/painting/now-i-work/cat-2-1.png";
import cat_2_2 from "../../assets/painting/now-i-work/cat-2-2.png";
import cat_3 from "../../assets/painting/now-i-work/cat-3.png";

import {
  WallPaintingCard,
  OilPaintingCard,
  DigitalIllustrationCard,
} from "./Category/PaintingCard";
const HowIWork = ({ cat }) => {
  return (
    <section className={`how-i-work cat${cat}`}>
      {cat === 1 ? (
        <img src={cat_1} className="backgroundss1" />
      ) : cat === 2 ? (
        <>
          <img src={cat_2_1} className="backgroundss2-1" />
          <img src={cat_2_2} className="backgroundss2-2" />
        </>
      ) : (
        <img src={cat_3} className="backgroundss3" />
      )}

      <div className={`content${cat} `}>
        <div className="content_description">
          <h2>Как я работаю</h2>
        </div>
        {cat === 1 ? (
          <WallPaintingCard />
        ) : cat === 2 ? (
          <OilPaintingCard />
        ) : (
          <DigitalIllustrationCard />
        )}
      </div>
    </section>
  );
};

export default HowIWork;
