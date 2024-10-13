import { Avatar, Box, Button, Dialog, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { ImageGallery } from "../components/ImageGallery";
import { useIsNarrow } from "../utils/useIsNarrow";
import { Timeline } from "../components/Timeline";
import profile from "../assets/profile.jpeg";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../firebase/posts";
import { UID } from "../firebase/firebaseConfig";
import { Post } from "../components/Post";
import { EditProfilePage } from "./EditProfilePage";
import VerifiedIcon from "@mui/icons-material/Verified";
export const ProfilePage: React.FC = () => {
  const nav = useNavigate();
  const isNarrow = useIsNarrow();
  const location = useLocation();
  const [editOpen, setEditOpen] = React.useState(false);
  const onEdit = () => {
    setEditOpen(true);
  };
  const onEditClose = () => {
    setEditOpen(false);
  };
  const username = location.pathname.split("/")?.[1];
  const { data, isLoading } = useQuery({
    queryKey: ["getUserPosts", username],
    queryFn: () => getUserPosts(username),
  });
  const posts = data?.map((p) => (
    <Box sx={{ mb: 1 }}>
      <Post 
      postId={p.postId}
      dateAdded={ new Date(p.dateAdded.seconds *1000).toDateString()} captions={p.captions} imageUrls={p.imageUrls} enableTop />
    </Box>
  ));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "flex-start",
        width: "100%",
        mt: 1,
      }}
    >
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar src={profile} sx={{ mr: 1, height: 80, width: 80 }} />
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 1 }} fontWeight={"bold"}>
              Maxwell Hsu
            </Typography>
            {data?.isVerified && <VerifiedIcon color="info" fontSize="small" />}
          </Box>

          <Typography fontWeight={500} variant="body2">
            I made web things, travel a bit much, and strongly prefer books and menus with
            pictures.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Box>
          <Typography>3 posts</Typography>
        </Box>
        <Box>
          <Typography>0 followers</Typography>
        </Box>
        <Box>
          <Typography>0 following</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          p: 0.5,
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          sx={{ m: 0.5 }}
          variant="contained"
          fullWidth
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          size="small"
          sx={{ m: 0.5 }}
          variant="contained"
          fullWidth
          onClick={onEdit}
        >
          Follow
        </Button>
      </Box>
      {isNarrow ? posts : <ImageGallery />}
      <Dialog fullScreen={isNarrow} open={editOpen} onClose={onEditClose}>
        <EditProfilePage onClose={onEditClose} />
      </Dialog>
    </Box>
  );
};
