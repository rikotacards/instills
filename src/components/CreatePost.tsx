import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { CreatePostProvider } from "../providers/createPostProvider";
import { CreatePostNew } from "./CreatePostNew";
interface CreatePostProps {
  onClose: () => void;
}
export const CreatePost: React.FC<CreatePostProps> = ({ onClose }) => {
  const [step, setStep] = React.useState(0);
  const inc = () => {
    setStep((p) => p + 1);
  };
  const dec = () => {
    if (step === 0) {
      return;
    }
    setStep((p) => p - 1);
  };
  return (
    <Box>
      <CreatePostProvider>
        <Toolbar
          disableGutters
          sx={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
            {/* <IconButton>
              <Close onClick={onClose} />
            </IconButton> */}
          </Box>
          <Typography
            fontWeight={"bold"}
            sx={{ pl: 0, display: "flex", flex: 1, justifyContent: "center" }}
          >
            Create
          </Typography>
          <Box
            sx={{ display: "flex", flex: 1, justifyContent: "flex-end", mr: 1 }}
          >
<IconButton>
              <Close onClick={onClose} />
            </IconButton>          </Box>
        </Toolbar>
        <CreatePostNew />
      </CreatePostProvider>
    </Box>
  );
};
