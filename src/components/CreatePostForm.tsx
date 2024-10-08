import { Box, IconButton } from "@mui/material";
import React from "react";
import { CreatePostInput } from "./CreatePostInput";
import { Add, Photo } from "@mui/icons-material";
import { useCreatePostContext } from "../providers/useContexts";
import { useIsNarrow } from "../utils/useIsNarrow";
import "swiper/css";
import "swiper/css/pagination";
import { CreatePostFormNarrow } from "./CreatePostFormNarrow";

const thumbnail = { height: "50px", width: "50px" };
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
  const onSetSelected = (index: number) => {
    setSelected(index);
  };
  const isNarrow = useIsNarrow();
  const ref = React.useRef<null | HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const array = Array.from(e.target.files);
      for (const file of array) {
        cp.addSlide(file);
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isNarrow ? "column" : "row",
        maxWidth: isNarrow ? "400px" : "100%",
        width: "100%",
        border: "1px solid blue",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isNarrow ? "row" : "column",
          alignItems: "center",
          width: "100%",
          border: "1px solid yellow",
        }}
      >
        {p.map((post, i) => {
          // const previewUrl =
          //   post.imageUrl && URL.createObjectURL(post.imageUrl);
          return post.imageUrl ? (
            <Box
              component="img"
              src={post?.imageUrl}
              key={post.caption + i}
              sx={{
                mr: 0.5,
                mb: 0.5,
                ...thumbnail,
                position: "relative",
                objectFit: "cover",
                border: i === selected ? "2px solid black" : undefined,
              }}
              onClick={() => onSetSelected(i)}
            />
          ) : (
            <Box
              onClick={() => onSetSelected(i)}
              sx={{
                ...thumbnail,
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Photo color="disabled" />
            </Box>
          );
        })}
        {p[0]?.imageUrl && (
          <IconButton
            onClick={() => {
              ref?.current?.click();
            }}
          >
            <Add />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: "flex",width:'100%' }}>
        {isNarrow ? <CreatePostFormNarrow posts={cp.posts}/>: renderedInput[selected]}
      </Box>
      <input
        onChange={onFileChange}
        ref={ref}
        accept="image/*"
        type="file"
        multiple
        style={{ visibility: "hidden", display: "none", height: 0 }}
      />
    </Box>
  );
};
