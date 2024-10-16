import React from "react";
import { Box } from "@mui/material";
import { Post } from "../components/Post";

import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../firebase/posts";
import { UID } from "../firebase/firebaseConfig";
import { MakeFirstPost } from "../components/MakeFirstPost";
import { CreateUsername } from "../components/CreateUsername";
import { useAuthContext } from "../providers/useContexts";
import { getUser } from "../firebase/profile";

export const HomePage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserPosts", UID],
    queryFn: () => getUserPosts(UID),
  });
  const { user } = useAuthContext();
  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryKey: ["getUser", user?.uid],
    queryFn: () => getUser(user?.uid || ""),
  });
  const hasUsername = !!userData?.username;

  const posts = data?.map((p) => (
    <Box sx={{ mb: 1 }}>
      <Post
        postId={p.postId}
        captions={p.captions}
        imageUrls={p.imageUrls}
        enableTop
      />
    </Box>
  ));
  return (
    <Box sx={{ m: 0 }}>
      <Box sx={{ m: 1 }}>
        {!userIsLoading && !hasUsername && <CreateUsername />}
        <MakeFirstPost />
      </Box>
      {posts}
    </Box>
  );
};
