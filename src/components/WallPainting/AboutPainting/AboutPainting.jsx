import React, { useEffect, useState, useRef } from "react";
import "./AboutPainting.css";
import img from "../../../assets/png/videobanner.png";
import img744 from "../../../assets/painting/about/img-744-cat.png";
import background1 from "../../../assets/painting/about/1.png";
import background2 from "../../../assets/painting/about/2.png";
import background_cat2 from "../../../assets/painting/about/background-cat2.png";
import background_cat3 from "../../../assets/painting/about/background-cat3.png";
import background3 from "../../../assets/painting/about/background.png";
import { getVideos } from "../../../api/Videos/getVideos";

const AboutPainting = ({ cat, Category }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    getVideos(setVideos, Category);
  }, []);

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
    <section className="painting-me-section">
      <div className={`painting-me-text cattext${cat}`}>
        <div>
          <h2 className="h2_1">Подробно</h2>
          {cat === 1 ? (
            <h2 className="h2_2">о росписи</h2>
          ) : cat === 2 ? (
            <>
              <h2 className="h2_2">о картинах</h2>
              <h2 className="h2_2">маслом</h2>
            </>
          ) : cat === 3 ? (
            <>
              <h2 className="h2_2">0 цифровой</h2>
              <h2 className="h2_2">иллюстрации</h2>
            </>
          ) : null}
        </div>
        {cat === 1 ? (
          <p>
            Я вместе со своей командой, занимаемся росписью стен, превращая
            обычные поверхности в настоящие произведения искусства. Вместо
            обычных обоев и стандартных декоров, роспись стен позволяет создать
            неповторимый интерьер, который отражает настроение помещений.
            <br />
            <br /> Работая с вами, мы тщательно учитываем все ваши пожелания и
            создаем уникальные дизайны. Наши работы уже реализованы в
            ресторанах, барах, бизнес-центрах, аквапарках, квартирах, загородных
            домах, магазинах и мн. др.
          </p>
        ) : cat === 2 ? (
          <p>
            Мое путешествие в мир творчества началось с традиционной живописи
            маслом. Это удивительный материал, который позволяет передавать
            глубину эмоций и создавать изысканные произведения искусства,
            которые будут радовать вас на протяжении многих лет. В каждой моей
            картине вы найдете не только мастерство исполнения, но и частичку
            моей души.
            <br />
            <br />
            Такими работами вы можете украсить любое помещение, внести изюминку
            в интерьер. Работы пишутся любой сложности, с многочисленными
            жанрами и стилями от абстрактного искусства до реализма портретной
            живописи. Возможны репродукции классических или современных картин
            по фотографии.
          </p>
        ) : cat === 3 ? (
          <p>
            В цифровой эпохе я также нашла свою нишу – создаю яркие и
            современные цифровые иллюстрации. Использую передовые технологии и
            программы, чтобы выполнить самые смелые и креативные идеи. Мои
            цифровые произведения могут стать украшением вашего сайта, блога,
            социальных сетей, баннеров и плакатов. <br />
            <br />
            Вы так же можете заказать цифровой портрет по фотографии с печатью
            на холсте любых размеров.
          </p>
        ) : null}
      </div>
      <div className={`painting-me-content cats${cat}`}>
        <div className="painting-me-image">
          {videos.length > 0 && (
            <video
              className="painting-me-video"
              ref={videoRef}
              src={videos[currentVideoIndex].file}
              autoPlay
              muted
              loop={false}
              playsInline
              onEnded={handleVideoEnd}
              controls
            />
          )}
          <img src={img} alt="About Me Image" className="img" />
          <img src={img744} alt="About Me Image-744" className="img744" />
          <div className="background">
            <img
              src={background1}
              alt="Background 1"
              className="background-1"
            />
            <img
              src={background2}
              alt="Background 2"
              className="background-2"
            />
          </div>
        </div>
      </div>

      <img
        src={
          cat === 2
            ? background_cat2
            : cat === 3
            ? background_cat3
            : background3
        }
        alt="Background"
        className={`painting-background-${cat}`}
      />
    </section>
  );
};

export default AboutPainting;
