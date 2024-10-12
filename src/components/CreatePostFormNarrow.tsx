import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PreparePost } from "../types";
import { CreatePostInput } from "./CreatePostInput";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface CreatePostFormNarrowProps {
  posts: PreparePost[];
  onSwiper: (swiper: any) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  slideToEnd: () => void;
  selected: number;
  enableSlide: boolean;
}
export const CreatePostFormNarrow: React.FC<CreatePostFormNarrowProps> = ({
  posts,
  onSwiper,
  onNextSlide,
  onPrevSlide,
  enableSlide
}) => {
  const renderedInput = posts.map((p, i) => (
    <SwiperSlide style={{ display: "flex", width: "100%" }} key={p.caption + i}>
      <CreatePostInput
        key={i + p.caption + p?.imageUrl}
        index={i}
        imageUrl={p?.imageUrl}
        captionFromContext={p.caption}
      />
    </SwiperSlide>
  ));
  return (
    <Swiper
      onSwiper={onSwiper}
      onTouchEnd={(s) =>{
        console.log('hi'); 
        console.log(s.touches.diff)
         return s.touches.diff < 0 ? onNextSlide() : onPrevSlide()}}
     
      modules={[Pagination]}
      style={{ width: "100%", borderRadius:8 }}
    >
      {renderedInput}
    </Swiper>
  );
};
