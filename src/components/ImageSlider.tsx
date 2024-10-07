import React from "react";
import sample from "../../sample.jpg";
import landscape from "../../landscape.jpg";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Controller, Navigation } from "swiper/modules";
const images = [sample, landscape];
const sliders = images.map((i) => {
  return (
    <SwiperSlide key={i}>
      <Box
        component="img"
        src={i}
        style={{
          objectFit: "cover",
          height: "100%",
          width: "100%",
        }}
      />
    </SwiperSlide>
  );
});
interface ImageSliderProps {
  onSwiper: any;
  swiperController: any;
  onClose: () => void;
}
export const ImageSlider: React.FC<ImageSliderProps> = ({
  onSwiper,
  swiperController,
  onClose,
}) => {
  return (
    <Swiper
      modules={[Navigation, Controller]}
      navigation
      onSliderMove={onClose}
      // onSlideChangeTransitionStart={onClose}
      onSwiper={onSwiper}
      controller={{ control: swiperController }}
      style={{
        position: "relative",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {sliders}
    </Swiper>
  );
};
