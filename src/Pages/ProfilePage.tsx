import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
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
  console.log('uidData', uidData)
  const { data, isLoading } = useQuery({
    queryKey: ["getUserPosts", uidData?.uid],
    queryFn: () => getUserPosts(uidData?.uid || ''),
  });
  const posts = data?.map((p) => (
    <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Post
        postId={p.postId}
        dateAdded={new Date(p.dateAdded.seconds * 1000).toDateString()}
        captions={p.captions}
        imageUrls={p.imageUrls}
        uid={p.uid}
        enableTop
      />
    </Box>
  ));
  if (!uidLoading && !uidData) {
    return <BrokenPage />;
  }

  if (!uidLoading && uidData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 1,
          padding: isNarrow ? undefined : "0px 20%",
          textAlign: 'center'
        }}
      >
        {(uidLoading || !uidData || isLoading) && <CircularProgress />}
        {!uidLoading && uidData && !isLoading && data && (
          <>
            <ProfileHeader postCount={posts?.length || 0} uid={uidData.uid} />
            {isNarrow ? posts : <ImageGallery posts={data} />}
            {data.length === 0 && <Typography fontWeight={'bold'}>No posts</Typography>}
          </>
        )}
      </Box>
    );
  }
};
