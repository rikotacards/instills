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
import { useIsNarrow } from "../utils/useIsNarrow";
interface HomePageProps {
  uid: string;
  onCreate: () => void;
}
export const HomePage: React.FC<HomePageProps> = ({onCreate, uid}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserPosts", uid],
    queryFn: () => getUserPosts(uid),
  });
  const isNarrow = useIsNarrow();

  const posts = data?.map((p) => (
    <Box sx={{ mb: 1 }}>
      <Post
        postId={p.postId}
        captions={p.captions}
        imageUrls={p.imageUrls}
        enableTop
        uid={p.uid}
        dateAdded={new Date(p.dateAdded.seconds * 1000).toDateString()}
      />
    </Box>
  ));
  return (
    <Box sx={{ m: 0, padding: isNarrow ? undefined : "0px 20%" }}>
      <Box sx={{ m: 1 }}>{posts?.length === 0 && 
        <MakeFirstPost onCreate={onCreate} />}
        </Box>
      {posts}
    </Box>
  );
};
