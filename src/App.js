import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  FreeMode,
  Thumbs,
} from "swiper";
import "./App.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const App = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const slides = [];
  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide key={i} tag="li">
        <img
          src={`https://picsum.photos/id/${i + 1}/700/500`}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  }
  const slides2 = [];
  for (let i = 0; i < 5; i++) {
    slides2.push(
      <SwiperSlide key={i} tag="li">
        <img
          src={`https://picsum.photos/id/${i + 1}/700/500`}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  }

  return (
    <div className="App">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {slides}
      </Swiper>
    </div>
  );
};

export default App;
