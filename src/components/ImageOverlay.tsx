import { Favorite, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Caption } from "./Caption";
import { PostTop } from "./PostTop";
import { SwiperSlide, Swiper } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";

interface ImageOverlayProps {
  children: React.ReactNode;
  onSwiper: any;
  swiperController: any;
  isCaptionOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}
const sampleText =
  'this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to testthis is along piece of text that is designed to test this is along piece of text that is designed to testthis is along piece of text that is designed to testthis is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test the caption box to see if we can type somethign long or not. hopefully it will act as desgiend otherwise I"ll be a bit annoyed.';

const c = [sampleText, "And this is when we went to the fire drill"];
export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  children,
  swiperController,
  onSwiper,
  isCaptionOpen,
  onClose,
  onToggle,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 2,
          display: "flex",
        }}
      >
        <PostTop />
      </Box>

      {children}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)); ",

        }}
      >
        <Swiper
          onSwiper={onSwiper}
          onSlideChange={onClose}
          controller={{ control: swiperController }}
          modules={[Controller, Navigation]}
          style={{ display: "flex" }}
        >
          {c.map((text) => (
            <SwiperSlide >
              <Caption
                isCaptionOpen={isCaptionOpen}
                text={text}
                onToggle={onToggle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
