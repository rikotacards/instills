import { Add, AddReaction, Close, Favorite } from "@mui/icons-material";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Popover,
  Toolbar,
  Typography,
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
import { useAuthContext } from "../providers/useContexts";
import { SignInPopup } from "./SignInPopup";

interface ReactionsProps {
  postId: string;
  username?: string;
  profileUrl?: string;
}
export const Reactions: React.FC<ReactionsProps> = ({ postId, username, profileUrl }) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuthContext();
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
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isDialogOpen, setDialog] = React.useState(false);
  const onCloseD = () => {
    setDialog(false);
  };
  const onDrawerOpen = () => {
    user ? setDialog(true) : setDrawerOpen(true);
  };
  const onDrawerClose = () => {
    setDrawerOpen(false);
  };
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
      onClick={(e) => e.stopPropagation()}
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

      <IconButton
        onClick={user ? onDrawerOpen : () => setDialog(true)}
        sx={{
          color: "white",
          ml: "auto",
          backdropFilter: "blur(20px)",
          boxShadow: "0px 0px 50px black",
        }}
      >
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
      <Dialog open={isDialogOpen} onClose={onCloseD}>
        <Toolbar>
          <IconButton onClick={onCloseD} sx={{ ml: "auto" }}>
            <Close />
          </IconButton>
        </Toolbar>
        <DialogContent>

        <SignInPopup username={username} profileUrl={profileUrl}/>
        </DialogContent>
      </Dialog>
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={onDrawerClose}
        PaperProps={{
          style: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            overflow: "hidden",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", textAlign: "center" }}>
          <Box sx={{ flex: 1 }} />
          <Typography fontWeight={"bold"}>Leave a reaction</Typography>
          <IconButton
            sx={{ flex: 1, ml: "auto", justifyContent: "flex-end" }}
            onClick={onDrawerClose}
          >
            <Close />
          </IconButton>
        </Toolbar>
        <Box
          sx={{
            backdropFilter: "blur(10px)",
            width: "100%",
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <EmojiPicker
            skinTonesDisabled
            searchDisabled
            open
            style={{ width: "100%" }}
            reactionsDefaultOpen
            onEmojiClick={(e) => {
              onReact(e.unified, false);
              onDrawerClose();
            }}
            onReactionClick={(s) => {
              onReact(s.unified, false);
              onDrawerClose();
            }}
            reactions={[
              "1f64c",
              "1f602",
              "1f601",
              "1f44d",
              "1f525",
              "1f60d",
              "1f622",
              "1f44f",
            ]}
          />
        </Box>
      </Drawer>
    </Box>
  );
};
