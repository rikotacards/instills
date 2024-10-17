import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { FollowersRow } from "./FollowersRow";
import { Close } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../firebase/followers";
interface FollowersProps {
  onClose: () => void;
  uid: string;
}
export const Followers: React.FC<FollowersProps> = ({uid, onClose }) => {
  const followers = [] as string[];

  const { data, isLoading } = useQuery({
    queryKey: ["getFollowers", uid],
    queryFn: () => (uid ? getFollowers(uid) : undefined),
  });
  console.log(data)
  const followerUids = data?.followers ? Object.keys(data.followers) : []
  return (
    <Box>
      <Toolbar sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography>Followers</Typography>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Toolbar>

      {followerUids.length ? (
        followerUids.map((uid) => {
          return <FollowersRow uid={uid} />;
        })
      ) : (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography fontWeight={"bold"}>No followers</Typography>
        </Box>
      )}
    </Box>
  );
};
