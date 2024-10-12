import { Box } from "@mui/material";
import React from "react";
import { CreatePostInput } from "./CreatePostInput";
import { useCreatePostContext } from "../providers/useContexts";
import { useIsNarrow } from "../utils/useIsNarrow";
import "swiper/css";
import "swiper/css/pagination";
import { CreatePostFormNarrow } from "./CreatePostFormNarrow";
import { Thumbnails } from "./Thumbnails";
import Swiper from "swiper";

export const CreatePostForm: React.FC = () => {
  const cp = useCreatePostContext();
  const p = cp.posts;
  const renderedInput = p.map((p, i) => (
    <CreatePostInput
      key={i + p.caption + p?.imageUrl}
      index={i}
      imageUrl={p?.imageUrl}
      captionFromContext={p.caption}
    />
  ));
  const [selected, setSelected] = React.useState(0);
  const [enableSlide, setEnable] = React.useState(true);
  const onSetSelected = (index: number) => {
    setSelected(index);
    setEnable(false)
    swiper?.slideTo(index);

  };

  const onNextSlide = () => {
   console.log('nnnnext')
    setSelected((s) => {
      if(s >= cp.posts.length-1){
        return s
      }
      return s+1
    })
  }
 
  const onPrevSlide = () => {


    setSelected((s) => {
      if(s  === 0){
        return s
      }
      return s-1
    })
  }
  const isNarrow = useIsNarrow();
  const ref = React.useRef<null | HTMLInputElement>(null);
  const [swiper, setSwiper] = React.useState<Swiper>();
  const onSwiper = (swiper: Swiper) => {
    setSwiper(swiper);
  };
  const slideToEnd = () => {
    swiper?.slideTo(cp.posts.length+1)
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('filechange')
    if (e.target.files) {
      const array = Array.from(e.target.files);
      for (const file of array) {
        cp.addSlide(file);
      }
      setSelected(cp.posts.length)
      swiper?.slideTo(cp.posts.length)
    }
  };
  const onRefClick = () => {
    ref?.current?.click();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isNarrow ? "column" : "row",
        maxWidth: isNarrow ? "400px" : "100%",
        width: "100%",
      }}
    >
      <Thumbnails
        onRefClick={onRefClick}
        isNarrow={isNarrow}
        posts={p}
        selected={selected}
        onSetSelected={onSetSelected}
      />

      <Box sx={{ display: "flex", width: "100%", p:0.5 }}>
        {isNarrow ? (
          <CreatePostFormNarrow
          onNextSlide={onNextSlide}
          onPrevSlide={onPrevSlide}
          slideToEnd={slideToEnd}
          onSwiper={onSwiper} 
          selected={selected}
          enableSlide={enableSlide}
          posts={cp.posts} />
        ) : (
          renderedInput[selected]
        )}
      </Box>
      <input
        onChange={onFileChange}
        ref={ref}
        accept="image/*"
        type="file"
        multiple
        style={{ display: "none", height: 0 }}
      />
    </Box>
  );
};
