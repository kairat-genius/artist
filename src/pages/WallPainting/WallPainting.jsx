import React from "react";
import Painting from "../../components/WallPainting/Painting/Painting";
import AboutPainting from "../../components/WallPainting/AboutPainting/AboutPainting";
import Possibilities from "../../components/Possibilities/Possibilities";
import Portfolio from "../../components/Portfolio/Portfolio";
import HowIWork from "../../components/HowIWork/HowIWork";

import img from "../../assets/painting/1-background-wall-painting.png";

const WallPainting = () => {
  return (
    <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
      <Painting title="Роспись стен" backgound={img} classBackgound="img" />
      <AboutPainting cat={1} Category="wall_painting"/>
      <Possibilities home={false} cat={2}/>
      <Portfolio home={false} Category="wall_painting" />
      <HowIWork cat={1} />
    </div>
  );
};

export default WallPainting;
