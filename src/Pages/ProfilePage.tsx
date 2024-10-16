import {  Box, } from "@mui/material";
import React from "react";
import { useLocation} from "react-router";
import { ImageGallery } from "../components/ImageGallery";
import { useIsNarrow } from "../utils/useIsNarrow";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../firebase/posts";
import { Post } from "../components/Post";
import { getUid } from "../firebase/profile";
import { BrokenPage } from "./BrokenPage";
import { ProfileHeader } from "../components/ProfileHeader";
export const ProfilePage: React.FC = () => {
  const location = useLocation();
  const username = location.pathname.split("/")?.[1];
  const { data: uidData, isLoading: uidLoading } = useQuery({
    queryKey: ["getUid", username],
    queryFn: () => getUid(username),
  });
  const isNarrow = useIsNarrow();

  console.log(uidData)
  const { data, isLoading } = useQuery({
    queryKey: ["getUserPosts", username],
    queryFn: () => getUserPosts(username),
  });

  const posts = data?.map((p) => (
    <Box sx={{ mb: 1 }}>
      <Post
        postId={p.postId}
        dateAdded={new Date(p.dateAdded.seconds * 1000).toDateString()}
        captions={p.captions}
        imageUrls={p.imageUrls}
        enableTop
      />
    </Box>
  ));
  if (!uidLoading && !uidData) {
    return (
      <BrokenPage/>
    );
  }
  if (!uidLoading && uidData) {
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
       <ProfileHeader uid={uidData.uid}/>
        {isNarrow ? posts : <ImageGallery />}
      </Box>
    );
  }
};
