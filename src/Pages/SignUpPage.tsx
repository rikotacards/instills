import { Box, Typography } from "@mui/material";
import React from "react";
import { CreateUsername } from "../components/CreateUsername";
import { UploadProfilePhoto } from "../components/UploadProfilePhoto";

export const SignUpPage: React.FC = () => {
  const [steps, setSteps] = React.useState(0);
  const onNext = () => {
    setSteps((s) => s + 1);
  };
  const progress = [<CreateUsername onNext={onNext} />, <UploadProfilePhoto />];
  return (
    <Box sx={{ m: 2 }}>
        {progress[steps]}
    </Box>
  );
};
