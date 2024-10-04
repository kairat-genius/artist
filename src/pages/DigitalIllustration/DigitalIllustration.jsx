import React from "react";
import Painting from "../../components/WallPainting/Painting/Painting";
import AboutPainting from "../../components/WallPainting/AboutPainting/AboutPainting";
import Possibilities from "../../components/Possibilities/Possibilities";
import Portfolio from "../../components/Portfolio/Portfolioss";
import HowIWork from "../../components/HowIWork/HowIWork";

import img2 from "../../assets/painting/1-backgound-digital-illustration.png";

const DigitalIllustration = () => {
  return (
    <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
      <Painting
        title="цифровая иллюстра ция"
        backgound={img2}
        classBackgound="img2"
        classTitle="title-cat"
      />
     <AboutPainting cat={3} Category="digital_illustration"/>
      <Possibilities home={false} />
      <Portfolio home={false} Category="digital_illustration"/>
      <HowIWork cat={3} />
    </div>
  );
};

export default DigitalIllustration;
