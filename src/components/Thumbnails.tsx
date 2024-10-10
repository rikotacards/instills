import React from "react";
import { PreparePost } from "../types";
import { Box, IconButton } from "@mui/material";
const thumbnail = { height: "50px", width: "50px" };
import { Add } from "@mui/icons-material";

interface ThumbnailsProps {
  posts: PreparePost[];
  isNarrow: boolean;
  onRefClick: () => void;
  selected: number;
  onSetSelected: (index: number) => void;
}
export const Thumbnails: React.FC<ThumbnailsProps> = ({
  onRefClick,
  selected,
  onSetSelected,
  posts,
  isNarrow,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isNarrow ? "row" : "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          overflowY: "auto",
          flexDirection: isNarrow ? "row" : "column",
        }}
      >
        {posts.map((post, i) => {
          return (
            <Box
              component="img"
              src={post?.imageUrl}
              key={post.caption + i}
              sx={{
                m:0.5,
                ...thumbnail,
                position: "relative",
                objectFit: "cover",
                borderRadius: 1,
                border: i === selected ? "2px solid black" : undefined,
              }}
              onClick={() => onSetSelected(i)}
            />
          );
        })}
      </Box>

      <IconButton
        onClick={onRefClick}
      >
        <Add />
      </IconButton>
    </Box>
  );
};
