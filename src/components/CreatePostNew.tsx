import { AddPhotoAlternate } from "@mui/icons-material";
import { Box, Button, Card, CardActionArea } from "@mui/material";
import React from "react";
import { useCreatePostContext } from "../providers/useContexts";
import { CreatePostForm } from "./CreatePostForm";
import { PostPreview } from "./PostPreview";
import { useIsNarrow } from "../utils/useIsNarrow";
import { UploadArea } from "./UploadArea";
const stepLabels = ["Preview", "Post"];

export const CreatePostNew: React.FC = () => {
  const [step, setStep] = React.useState(0);
  const inc = () => {
    setStep((p) => p + 1);
  };
  const dec = () => {
    setStep((p) => p - 1);
  };

  const cp = useCreatePostContext();
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        height: "100%",
        
      }}
    >
      {cp.posts.length <= 0 && step == 0 && (
        <UploadArea onUpload={cp.addSlide}/>
      )}
      {cp.posts.length>= 1 && step === 1 && <CreatePostForm />}
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
