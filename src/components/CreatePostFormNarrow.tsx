import { Box, IconButton } from "@mui/material";
import React from "react";
import { CreatePostInput } from "./CreatePostInput";
import { Add, Photo } from "@mui/icons-material";
import { useCreatePostContext } from "../providers/useContexts";
import { useIsNarrow } from "../utils/useIsNarrow";
const thumbnail = { height: "50px", width: "50px" };
export const CreatePostFormNarrow: React.FC = () => {
  const cp = useCreatePostContext();
  const p = cp.posts;
  const renderedInput = p.map((p, i) => (
    <CreatePostInput
      key={i + p.caption + p.imageUrl}
      index={i}
      imageUrl={p.imageUrl}
      captionFromContext={p.caption}
    />
  ));
  const [selected, setSelected] = React.useState(0);
  const onSetSelected = (index: number) => {
    setSelected(index);
  };
  const isNarrow = useIsNarrow();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isNarrow ? "column" : "row",
        maxWidth: isNarrow ? "400px" : undefined,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isNarrow ? "row" : "column",
          alignItems: "center",
        }}
      >
        {p[0].imageUrl &&
          p.map((post, i) => {
            // const previewUrl =
            //   post.imageUrl && URL.createObjectURL(post.imageUrl);
            return post.imageUrl ? (
              <Box
                component="img"
                src={post.imageUrl}
                key={post.caption + i}
                sx={{
                  mr: 0.5,
                  mb: 0.5,
                  ...thumbnail,
                }}
                onClick={() => onSetSelected(i)}
              />
            ) : (
              <Box
                onClick={() => onSetSelected(i)}
                sx={{ ...thumbnail, alignContent: "center" }}
              >
                <Photo color="disabled" />
              </Box>
            );
          })}
        {p[0].imageUrl && (
          <IconButton
            onClick={() => {
              cp.addSlide();
              setSelected((p) => p + 1);
            }}
          >
            <Add />
          </IconButton>
        )}
      </Box>
      {renderedInput[selected] || renderedInput[renderedInput.length - 1]}
    </Box>
  );
};
