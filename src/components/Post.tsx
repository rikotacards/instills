import React from "react";
import { ImageOverlay } from "./ImageOverlay";
import { ImageSlider } from "./ImageSlider";
import { Box } from "@mui/material";
import { IPost } from "../types";
import { useAuthContext } from "../providers/useContexts";

export const Post: React.FC<IPost & { enableTop?: boolean }> = (props) => {
  const { imageUrls, captions, enableTop, dateAdded, postId } = props;
  const [firstSwiper, setFirstSwiper] = React.useState(null);
  const [secondSwiper, setSecondSwiper] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuthContext();
  const onClose = () => {
    setIsOpen(false);
  };
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const isYourPost = user?.uid === props.uid;
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "400px",
        width: "100%",
        height: "600px",
        maxHeight: "600px",
        overflow: "hidden",
      }}
    >
      <ImageOverlay
        onClose={onClose}
        isCaptionOpen={isOpen}
        onSwiper={setFirstSwiper}
        swiperController={secondSwiper}
        onToggle={onToggle}
        captions={captions}
        enableTop={enableTop}
        dateAdded={dateAdded}
        postId={postId}
        isYourPost={isYourPost}
        total={imageUrls.length}
        uid={props.uid}

      >
        <ImageSlider
          imageUrls={imageUrls}
          onClose={onClose}
          onSwiper={setSecondSwiper}
          swiperController={firstSwiper}
        />
      </ImageOverlay>
    </Box>
  );
};
