import { Avatar, Box, Button, Dialog, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

import { getUser } from "../firebase/profile";
import { EditProfilePage } from "../Pages/EditProfilePage";
import { useIsNarrow } from "../utils/useIsNarrow";
import { useAuthContext } from "../providers/useContexts";
import { Followers } from "./Followers";
import { getFollowedBy, getFollowers, onFollow } from "../firebase/followers";
interface ProfileHeaderProps {
  uid?: string;
  postCount: number;
}
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  postCount,
  uid,
}) => {
  const [editOpen, setEditOpen] = React.useState(false);
  const { user } = useAuthContext();
  const uidFromAuth = user?.uid;
  const onEdit = () => {
    setEditOpen(true);
  };
  const isNarrow = useIsNarrow();
  const queryClient = useQueryClient();

  const { data: dataFollowers, isLoading: isLoadingFollowers } = useQuery({
    queryKey: ["getFollowers", uid],
    queryFn: () => (uid ? getFollowers(uid) : undefined),
  });
  const { data: dataFollowedBy, isLoading: isLoadingFollowedBy } = useQuery({
    queryKey: ["getFollowedBy", uid],
    queryFn: () => (uid ? getFollowedBy(uid) : undefined),
  });
//   const followedByCount = dataFollowedBy ? Object.keys(dataFollowedBy?.followers).length : 0

//   const followerCount = dataFollowers ? Object.keys(dataFollowers?.followers).length : 0
  const mutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getFollowers"],
      }),
    mutationFn: (args: { followingUid: string; uid: string }) => {
      return onFollow({
        followingUid: args.followingUid,
        uid: args.uid,
      });
    },
  });
  const onFollowUser = () => {
    if(!uidFromAuth || !uid){
        return;
    }
    mutation.mutate({followingUid: uid, uid: uidFromAuth})
  }
  const onEditClose = () => {
    setEditOpen(false);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["getUser", uid],
    queryFn: () => (uid ? getUser(uid) : undefined),
  });

  const [selectedC, setSelectedC] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setSelectedC("");
    setOpen(false);
  };

  const onFollowersClick = () => {
    setSelectedC("followers");
    onOpen();
  };
  const onFollowingClick = () => {
    setSelectedC("following");
    onOpen();
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          src={data?.profilePhotoUrl}
          sx={{ mr: 1, height: 80, width: 80 }}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 1 }} fontWeight={"bold"}>
              {data?.name}
            </Typography>
            {data?.isVerified && <VerifiedIcon color="info" fontSize="small" />}
          </Box>

          <Typography fontWeight={500} variant="body2">
            {data?.bio}
          </Typography>
        </Box>
        <Dialog fullScreen={isNarrow} open={editOpen} onClose={onEditClose}>
          {uidFromAuth && (
            <EditProfilePage uid={uidFromAuth} onClose={onEditClose} />
          )}
        </Dialog>
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
          <Typography>{postCount} posts</Typography>
        </Box>
        <Box onClick={onFollowersClick}>
          <Typography>{0} followers</Typography>
        </Box>
        <Box onClick={onFollowingClick}>
          <Typography>{0} following</Typography>
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
        {uidFromAuth && (
          <Button
            size="small"
            sx={{ m: 0.5, textTransform: "capitalize" }}
            variant="contained"
            fullWidth
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
        <Button
          size="small"
          sx={{ m: 0.5, textTransform: "capitalize" }}
          variant="contained"
          fullWidth
          onClick={onFollowUser}
        >
          Follow
        </Button>
      </Box>
      <Dialog fullScreen={isNarrow} open={open} onClose={onClose}>
        {selectedC === "followers" && uid && <Followers uid={uid} onClose={onClose} />}
      </Dialog>
    </Box>
  );
};
