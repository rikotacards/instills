import React from "react";
import { ImageOverlay } from "./ImageOverlay";
import { ImageSlider } from "./ImageSlider";
import { Box } from "@mui/material";

export const Post: React.FC = () => {
  const [firstSwiper, setFirstSwiper] = React.useState(null);
  const [secondSwiper, setSecondSwiper] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => {
    console.log('closing')
    setIsOpen(false);
  };
  const onToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "400px",
        height: "500px",
        maxHeight: "500px",
      }}
    >
      <ImageOverlay
        onClose={onClose}
        isCaptionOpen={isOpen}
        onSwiper={setFirstSwiper}
        swiperController={secondSwiper}
        onToggle={onToggle}
      >
        <ImageSlider
          onClose={onClose}
          onSwiper={setSecondSwiper}
          swiperController={firstSwiper}
        />
      </ImageOverlay>
    </Box>
  );
};
