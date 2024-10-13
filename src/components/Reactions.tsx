import { Add, AddReaction, Favorite } from "@mui/icons-material";
import {
  Box,
  Chip,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import React from "react";
import { ReactionEmoji } from "./ReactionEmoji";
import { addReaction, getReactions } from "../firebase/posts";
import { UID } from "../firebase/firebaseConfig";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReactionsCounts } from "../utils/getReactionsCounts";

interface ReactionsProps {
  postId: string;
}
export const Reactions: React.FC<ReactionsProps> = ({ postId }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const mutation = useMutation({
    onSuccess: () => queryClient.invalidateQueries(
      {
        queryKey:["getReactions", postId]
      }
    ),
    mutationFn: (unicode: string) => {
      return addReaction({
        uid: UID,
        unicode,
        postId,
      })
    },
  })
  const openEl = Boolean(anchorEl);
  const { data, isLoading } = useQuery({
    queryKey: ["getReactions", postId],
    queryFn: () => getReactions(postId),
  });
  console.log("reaction data", data);
  const reactionsTransformed = getReactionsCounts(data || {});
  const onReact = async (unicode: string) => {
    try {
      mutation.mutate(unicode)
    } catch (e) {
      alert(e);
    }
  };
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
  const likes =
    data && data?.["like"] ? Object.keys(data?.["like"])?.length : 0;
  const reactionEmojis = reactionsTransformed.map((r) => {
    if (r.unicode === "like") {
      return;
    }
    return (
      <ReactionEmoji
        emoji={<Emoji size={20} unified={r.unicode} />}
        onClick={() => onReact(r.unicode)}
        count={r.count}
      />
    );
  });
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
      <ReactionEmoji
        emoji={<Favorite color="error" />}
        onClick={() => onReact("like")}
        count={likes || 0}
      />

      {reactionEmojis}

      <IconButton onClick={onOpen} sx={{ color: "white", ml: "auto" }}>
        <AddReaction />
      </IconButton>
      <Popover
        id="basic-menu"
        component="div"
        anchorEl={anchorEl}
        open={openEl}
        anchorOrigin={{ horizontal: "left", vertical: "center" }}
        onClose={handleClose}
        sx={{ background: "transparent", borderRadius: 0, display: "flex" }}
      >
        <IconButton>
          <Emoji unified="1f423" />
        </IconButton>
        <IconButton>
          <Emoji unified="1f60d" />
        </IconButton>
        <IconButton>
          <Add />
        </IconButton>
      </Popover>
      <Dialog
        PaperProps={{
          style: {
            background: "transparent",
            display: "flex",
          },
        }}
        onClose={onClose}
        open={open}
      >
        <EmojiPicker
          skinTonesDisabled
          open
          reactionsDefaultOpen
          reactions={["1f602", "1f423"]}
        />
      </Dialog>
    </Box>
  );
};
