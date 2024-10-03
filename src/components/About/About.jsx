import React, { useEffect, useState, useRef } from "react";
import "./About.css";
import img from "../../assets/png/videobanner.png";
import background1 from "../../assets/png/background_about.png";
import background2 from "../../assets/png/background_about2.png";
import background3 from "../../assets/png/background_about3.png";
import background_744 from "../../assets/png/about_744.png";
import banner_744 from "../../assets/painting/about/img-744-cat.png";
import { getVideos } from "../../api/Videos/getVideos";

const About = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fetch videos from API
    getVideos(setVideos);
  }, []);

  // Function to handle video end and switch to the next one
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % videos.length;
      return nextIndex;
    });
  };

  

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  return (
    <section className="about-me-section" id="about">
      <div className="about-me-content">
        <div className="about-me-image">
          {/* Check if videos are loaded and display the first video */}
          {videos.length > 0 && (
            <video
              className="about-me-video"
              ref={videoRef}
              src={videos[currentVideoIndex].file}
              autoPlay
              muted
              loop={false} // We will handle the loop manually
              playsInline
              onEnded={handleVideoEnd}
            />
          )}
          <img src={img} alt="About Me Image" className="img" loading="lazy"/>
          <img src={banner_744} alt="About Me Image" className="img-banner-744" loading="lazy"/>

          <div className="background">
            <img src={background1} alt="Background 1" className="background-1" loading="lazy"/>
            <img src={background2} alt="Background 2" className="background-2" loading="lazy"/>
          </div>
        </div>
      </div>
      <div className="about-me-text">
        <div>
          <h2 className="h2_1">Обо мне</h2>
          <h2 className="h2_2">В деталях</h2>
        </div>

        <p>
          Всю свою жизнь я увлекаюсь творчеством в разных направлениях. Занимала первые
          места во всероссийских и международных конкурсах, для меня важен как процесс, так и
          конечный результат. Каждый мой новый заказ это целая история, которую я проживаю и
          воплощаю в реальность.
        </p>
      </div>

      <img src={background3} alt="Background 3" className="background-3" />
      <img src={background_744} alt="Background 744" className="background-744" />
    </section>
  );
};

export default About;
