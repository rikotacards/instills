import { AddPhotoAlternate } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea } from "@mui/material";
import React from "react";
import { useCreatePostContext } from "../providers/useContexts";
import { CreatePostForm } from "./CreatePostForm";
import { PostPreview } from "./PostPreview";
const stepLabels = [
    'Preview', 
    'Post'
]
export const CreatePostNew: React.FC = () => {
  const [step, setStep] = React.useState(0);
  const inc = () => {
    setStep((p) => p + 1);
  };
  const dec = () => {
    setStep((p) => p - 1);
  };

  const cp = useCreatePostContext();
  const ref = React.useRef<null | HTMLInputElement>(null);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      const array = Array.from(e.target.files);
      for (const file of array) {
        console.log("fff", file);
        cp.addSlide(file);
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      {cp.posts.length <= 0 && (
        <Card variant="outlined">
          <CardActionArea
            sx={{
              width: "400px",
              height: "400px",
              display: "flex",
              alignItem: "center",
            }}
            onClick={() => ref?.current?.click()}
          >
            <AddPhotoAlternate color="disabled" />
          </CardActionArea>
          <input
            onChange={onFileChange}
            ref={ref}
            accept="image/*"
            type="file"
            multiple
            style={{ display: "none", height: "100%", width: "100%" }}
          />
        </Card>
      )}
      {step == 0 && <CreatePostForm />}
      {step == 1 && <PostPreview />}
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        {step > 0 && <Button onClick={dec}>Back</Button>}
        {cp.posts.length > 0 && (
          <Button sx={{ ml: "auto" }} onClick={inc}>
            {stepLabels[step]}
          </Button>
        )}
      </Box>
    </Box>
  );
};
