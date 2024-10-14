import { Add, AddReaction, Favorite } from "@mui/icons-material";
import {
  Box,
  Chip,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Popover,
} from "@mui/material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import React from "react";
import { ReactionEmoji } from "./ReactionEmoji";
import { addReaction, deleteReaction, getReactions } from "../firebase/posts";
import { UID } from "../firebase/firebaseConfig";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getReactionsCounts } from "../utils/getReactionsCounts";

interface ReactionsProps {
  postId: string;
}
export const Reactions: React.FC<ReactionsProps> = ({ postId }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const mutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getReactions", postId],
      }),
    mutationFn: (unicode: string) => {
      return addReaction({
        uid: UID,
        unicode,
        postId,
      });
    },
  });
  const deleteMutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getReactions", postId],
      }),
    mutationFn: ({
      uid,
      postId,
      unicode,
    }: {
      uid: string;
      postId: string;
      unicode: string;
    }) => {
      return deleteReaction({
        uid: uid || UID,
        postId,
        unicode,
      });
    },
  });
  const openEl = Boolean(anchorEl);
  const { data, isLoading } = useQuery({
    queryKey: ["getReactions", postId],
    queryFn: () => getReactions(postId),
  });
  console.log("reaction data", data);
  const reactionsTransformed = getReactionsCounts(data || {});
  const onReact = async (unicode: string, hasReacted: boolean) => {
    try {
      if (hasReacted) {
        deleteMutation.mutate({ uid: UID, postId, unicode });
      } else {
        mutation.mutate(unicode);
      }
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
    const hasReacted = !!data?.[r.unicode]?.[UID];
    if (r.unicode === "like") {
      return;
    }
    if (r.count === 0) {
      return;
    }
    return (
      <ReactionEmoji
        key={r.unicode}
        hasReacted={hasReacted}
        emoji={<Emoji size={20} unified={r.unicode.toLowerCase()} />}
        onClick={() => onReact(r.unicode, hasReacted)}
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
      onClick={e => e.stopPropagation()}
    >
      <Box
        sx={{
          overflowX: "scroll",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "50px",
        }}
      >
        <ReactionEmoji
          emoji={<Favorite color="error" />}
          onClick={() => onReact("like", !!data?.["like"]?.[UID])}
          count={likes || 0}
        />

        {reactionEmojis}
      </Box>

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
        <EmojiPicker
          skinTonesDisabled
          searchDisabled
          open
          
          reactionsDefaultOpen
          onEmojiClick={(e) => {
            onReact(e.unified, false);
            onClose();
          }}
          onReactionClick={(s) => {
            onReact(s.unified, false);
            onClose();
          }}
          reactions={["1f602", "1f423"]}
        />
      </Popover>
      <Modal
        sx={{

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClose={onClose}
        open={open}
      >
        <EmojiPicker
          skinTonesDisabled
          searchDisabled
          open
          
          reactionsDefaultOpen
          onEmojiClick={(e) => {
            onReact(e.unified, false);
            onClose();
          }}
          onReactionClick={(s) => {
            onReact(s.unified, false);
            onClose();
          }}
          reactions={["1f602", "1f423"]}
        />
      </Modal>
    </Box>
  );
};
