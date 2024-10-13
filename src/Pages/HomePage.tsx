import React from "react";
import sample from "../../sample.jpg";
import landscape from "../../landscape.jpg";
const imageUrls = [sample, landscape];
import { Box, LinearProgress } from "@mui/material";
import { Post } from "../components/Post";
import asset1 from "../assets/asset1.jpeg";
import asset2 from "../assets/asset2.jpeg";
import { c } from "../components/ImageOverlay";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../firebase/posts";
import { UID } from "../firebase/firebaseConfig";

export const HomePage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserPosts", UID],
    queryFn: () => getUserPosts(UID),
  });
  console.log(data);
  const posts = data?.map((p) => (
    <Box sx={{ mb: 1 }}>
      <Post captions={p.captions} imageUrls={p.imageUrls} enableTop />
    </Box>
  ));
  return (
    <Box sx={{ m: 0 }}>
        {posts}
      <Box sx={{ mb: 1 }}>
        <Post
          enableTop
          captions={[
            "Istanbul, what a tourist trap. Day 1 of visiting istanbul was such a trek! We went to see Haiga Sophia, Topkap palace, and Bastilleca Cistern. Also Istanbul is such a tourist trap.",
            "Finally a lunch break at the top of loti hotel recommend by our guide, it wasnt crowded at all, seems like most tourist missed this spot.",
          ]}
          imageUrls={[asset1, asset2]}
        />
      </Box>
      <Box sx={{ mb: 1 }}>
        <Post captions={c} imageUrls={imageUrls} />
      </Box>
      <Box sx={{ mb: 1 }}>
        <Post
          captions={[
            "Istanbul, what a tourist trap. Day 1 of visiting istanbul was such a trek! We went to see Haiga Sophia, Topkap palace, and Bastilleca Cistern. Also Istanbul is such a tourist trap.",
            "Finally a lunch break at the top of loti hotel recommend by our guide, it wasnt crowded at all, seems like most tourist missed this spot.",
          ]}
          imageUrls={[asset1, asset2]}
        />
      </Box>

      <Post captions={c} imageUrls={imageUrls} />
    </Box>
  );
};
