import React from "react";
import { Carousel } from "react-bootstrap"
import { useState } from "react";

function LayoutCarousel() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="picture"
          src="images/edit-pic.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Input your personal food intolerances.{" "}</h3>
          <p> Signup and input your specific food intolerances into your
                  profile</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="picture"
          src="https://www.boldbusiness.com/wp-content/uploads/2017/02/Food-scanning-apps-for-nutritional-oversight-e1493732402445.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Scan food ingredient labels based on your food intolerance
                  input.{" "}</h3>
          <p>Once you have created an account and input your food
                  intolerances. Simply take a photo of the ingredients label of
                  the item you want to check. The app will then scan the image
                  for the food intolerances and give you a result.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="col-md-5 order-md-1"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Traveling Abroad?</h3>
          <p>
          The EatSafely application can make you a resturant card to
                  tell wait staff what your specific food intolerances are.
                  Simply select a language and receive a result.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

// render(<ControlledCarousel />);

export default LayoutCarousel;