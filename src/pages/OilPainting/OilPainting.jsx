import React from "react";
import Painting from "../../components/WallPainting/Painting/Painting";
import AboutPainting from "../../components/WallPainting/AboutPainting/AboutPainting";
import Possibilities from "../../components/Possibilities/Possibilities";
import Portfolio from "../../components/Portfolio/Portfolio";
import HowIWork from "../../components/HowIWork/HowIWork"

import img1 from "../../assets/painting/1-background-oil-painting.png";

const OilPainting = () => {
  return (
    <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
      <Painting title="Картина маслом" backgound={img1} classBackgound="img1"/>
     <AboutPainting cat={2} Category="oil_painting"/>
     <Possibilities home={false} />
   <Portfolio home={false} Category="oil_painting"/>
  <HowIWork cat={2}/> 
    </div>
  );
};

export default OilPainting;
