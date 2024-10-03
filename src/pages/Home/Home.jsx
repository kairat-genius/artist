import React from "react";
import CreativeWorkshop from "../../components/CreativeWorkshop/CreativeWorkshop";
import About from "../../components/About/About";
import Possibilities from "../../components/Possibilities/Possibilities";
import Services from "../../components/Services/Services";
import Portfolio from "../../components/Portfolio/Portfolio";
import Reviews from "../../components/Reviews/Reviews";
import Cooperate from "../../components/Cooperate/Cooperate";


const Home = () => {
  return (
    <div style={{ maxWidth: "1920px", margin: "0 auto",   position: "relative" }}>
       <CreativeWorkshop />
      <About />
  <Possibilities home={true} />
        <Services />
       {/* <Portfolio home={true} /> */}
       <Reviews />
       <Cooperate />
    </div>
  );
};

export default Home;
