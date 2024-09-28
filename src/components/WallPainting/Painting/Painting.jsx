import React from "react";
import "./Painting.css";
import Button from "../../button/button";

const Painting = ({title, backgound, classBackgound, classTitle }) => {
  return (
    <section className="painting">
     <div className={`painting-content${classTitle ? classTitle : ''}`}>
        
        <div className="content">
         <div className="title">
            <h1 className={classTitle}>{title}</h1>
            </div>

          <Button/>
        </div>
        <img className={classBackgound} src={backgound} />
      </div>
    </section>
  );
};

export default Painting;
