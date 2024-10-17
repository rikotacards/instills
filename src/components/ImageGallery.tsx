import { ImageList, ImageListItem } from "@mui/material";
import React from "react";

import { IFbPost } from "../types";
interface ImageGalleryProps {
  posts: IFbPost[];
}
export const ImageGallery: React.FC<ImageGalleryProps> = ({ posts }) => {
  return (
    <ImageList sx={{ height: "100%" }} gap={0} cols={3}>
      {posts.map((item, i) => (
        <ImageListItem key={item.imageUrls[0] + i}>
          <img
            src={item.imageUrls[0]}
            style={{
              maxHeight: 300,

              maxWidth: 300,
            }}
            alt={item.captions[0]}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
