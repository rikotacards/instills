import { Box, Typography } from "@mui/material";
import React from "react";
export const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        p:1,
        width: "100%",
        height: "100%",
   
      }}
    >
      <Typography fontWeight={"bold"}>Welcome to Stills</Typography>
    </Box>
  );
};
