import React from "react";
import Slider from "react-slick";

function SimpleSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
      };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3 style={{ backgroundColor: "powderblue" }}>1</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "pink" }}>2</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "powderblue" }}>3</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "pink" }}>4</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "powderblue" }}>5</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "pink" }}>6</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "powderblue" }}>7</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "pink" }}>8</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "powderblue" }}>9</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "pink" }}>10</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "powderblue" }}>11</h3>
        </div>
        <div>
          <h3 style={{ backgroundColor: "pink" }}>12</h3>
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
