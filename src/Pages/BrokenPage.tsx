import { Box, Typography } from "@mui/material";
import React from "react";
export const BrokenPage: React.FC = () => {
  return (
    <Box>
      <Typography fontWeight={"bold"}>
        Sorry, this page isn't available
      </Typography>
      <Typography>
        The link you followed may be broken, or the page may have been removed.
        Go back to Instagram.
      </Typography>
    </Box>
  );
};
