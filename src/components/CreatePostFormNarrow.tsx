import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PreparePost } from '../types';
import { CreatePostInput } from './CreatePostInput';
interface CreatePostFormNarrowProps {
    posts: PreparePost[];
}
export const CreatePostFormNarrow: React.FC<CreatePostFormNarrowProps> = ({posts}) => {
    const renderedInput = posts.map((p, i) => (
        <SwiperSlide style={{display:'flex', width: "100%" }} key={p.caption + i}>
          <CreatePostInput
            key={i + p.caption + p?.imageUrl}
            index={i}
            imageUrl={p?.imageUrl}
            captionFromContext={p.caption}
          />
        </SwiperSlide>
      ));
    return (
        <Swiper style={{width:'100%'}}>
            {renderedInput}
        </Swiper>
    )
}