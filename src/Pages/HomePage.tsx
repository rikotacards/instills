import React from "react";
import sample from "../../sample.jpg";
import landscape from "../../landscape.jpg";
const imageUrls = [sample, landscape];
import { Box } from "@mui/material";
import { Post } from "../components/Post";
import asset1 from "../assets/asset1.jpeg";
import asset2 from "../assets/asset2.jpeg";
import { c } from "../components/ImageOverlay";
export const HomePage: React.FC = () => {
  return (
    <Box sx={{ m: 0 }}>
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
