import React from "react";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Controller, Navigation } from "swiper/modules";

interface ImageSliderProps {
  onSwiper: any;
  swiperController: any;
  onClose: () => void;
  imageUrls: string[];
}
export const ImageSlider: React.FC<ImageSliderProps> = ({
  onSwiper,
  swiperController,
  onClose,
  imageUrls,
}) => {
  const sliders = imageUrls.map((i) => {
    return (
      <SwiperSlide key={i}>
        <Box
          component="img"
        
          onContextMenu={(e) => e.preventDefault()}
          src={i}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            pointerEvents: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
            userSelect: 'none',
          
          }}
        />
      </SwiperSlide>
    );
  });
  return (
    <Swiper
      modules={[Navigation, Controller]}
      navigation
      onSliderMove={onClose}
      pagination={true}
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
