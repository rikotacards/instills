import { Add, AddReaction, Favorite } from "@mui/icons-material";
import { Box, Chip, Dialog, IconButton, Menu, MenuItem, Popover } from "@mui/material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import React from "react";
import { ReactionEmoji } from "./ReactionEmoji";

export const Reactions: React.FC = () => {
  const [isBig, setBig] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEl = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const enlarge = () => {
    setBig(true);
    setTimeout(() => setBig(false), 500);
  };
  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
     <ReactionEmoji emoji={<Favorite color='error'/>} count={40}/>
     <ReactionEmoji emoji={<Emoji size={20} unified="1f602"/>} count={40}/>

      <IconButton onClick={onOpen} sx={{ color: "white", ml: "auto" }}>
        <AddReaction />
      </IconButton>
      <Popover
        id="basic-menu"
        component="div"
        anchorEl={anchorEl}
        open={openEl}
        anchorOrigin={{horizontal: 'left' , vertical: 'center'}}
        onClose={handleClose}
    
        sx={{ background: "transparent", borderRadius: 0, display: 'flex' }}
      >
        <IconButton>
          <Emoji unified="1f423" />
        </IconButton>
        <IconButton>
          <Emoji unified="1f60d" />
        </IconButton>
        <IconButton>
            <Add/>
        </IconButton>
      </Popover>
      <Dialog PaperProps={{style: {
        background: 'transparent',
        display: 'flex'
      }}}  onClose={onClose} open={open}>
        <EmojiPicker skinTonesDisabled  open reactionsDefaultOpen reactions={["1f602", "1f423"]} />
      </Dialog>
    </Box>
  );
};
