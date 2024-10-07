import { ImageList, ImageListItem } from "@mui/material";
import React from "react";
import sample from "../../sample.jpg";
import landscape from "../../landscape.jpg";
export const ImageGallery: React.FC = () => {
  return (
    <ImageList sx={{height:'100%'}} gap={0} cols={3}>
      {[sample, landscape, sample, landscape, sample, landscape].map((item) => (
        <ImageListItem key={item}>
          <img
            src={item}
            style={{maxHeight: 300,

                maxWidth:300
            }}

            alt={item}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
