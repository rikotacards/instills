import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { FollowersRow } from "./FollowersRow";
import { Close } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getFollowers, getFollowing } from "../firebase/followers";
interface FollowersProps {
  onClose: () => void;
  uid: string;
}
export const Followings: React.FC<FollowersProps> = ({uid, onClose }) => {

  const { data, isLoading } = useQuery({
    queryKey: ["getFollowing", uid],
    queryFn: () => (uid ? getFollowing(uid) : undefined),
  });
  const followerUids = data?.following ? Object.keys(data.following) : []
  return (
    <Box>
      <Toolbar sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography>Following</Typography>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Toolbar>

      {followerUids.length ? (
        followerUids.map((uid) => {
          return <FollowersRow onClose={onClose} uid={uid} />;
        })
      ) : (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography fontWeight={"bold"}>Not following anyone</Typography>
        </Box>
      )}
    </Box>
  );
};
