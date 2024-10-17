import { Avatar, Box, Button, Dialog, Divider, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

import { getUser } from "../firebase/profile";
import { EditProfilePage } from "../Pages/EditProfilePage";
import { useIsNarrow } from "../utils/useIsNarrow";
import { useAuthContext } from "../providers/useContexts";
import { Followers } from "./Followers";
import {
  getFollowing,
  getFollowers,
  onFollow,
  onUnfollow,
} from "../firebase/followers";
import { Followings } from "./Followings";
interface ProfileHeaderProps {
  uid: string;
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
    queryKey: ["getFollowers", { uid }],
    queryFn: () => getFollowers(uid),
  });
  const { data: dataFollowing, isLoading: isLoadingFollowing } = useQuery({
    queryKey: ["getFollowing", { uid }],
    queryFn: () => getFollowing(uid),
  });
  const followingCount = dataFollowing?.following
    ? Object.keys(dataFollowing.following).length
    : 0;
  const followerCount = dataFollowers?.followers
    ? Object.keys(dataFollowers.followers).length
    : 0;
  const isFollowing = uidFromAuth
    ? dataFollowers?.followers?.[uidFromAuth]
    : false;
  const isYourProfile = uidFromAuth === uid;
  const mutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getFollowers", { uid }],
        exact: true,
      }),
    mutationFn: (args: { otherUid: string; uid: string }) => {
      return onFollow({
        otherUid: args.otherUid,
        uid: args.uid,
      });
    },
  });
  const onFollowUser = () => {
    if (!uidFromAuth || !uid) {
      return;
    }
    mutation.mutate({ otherUid: uid, uid: uidFromAuth });
  };
  const unfollowMutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getFollowers", { uid }],
        exact: true,
      }),
    mutationFn: (args: { otherUid: string; uid: string }) => {
      return onUnfollow({
        otherUid: args.otherUid,
        uid: args.uid,
      });
    },
  });
  const onUnfollowUser = () => {
    if (!uidFromAuth || !uid) {
      return;
    }
    unfollowMutation.mutate({ otherUid: uid, uid: uidFromAuth });
  };
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
    if (!uidFromAuth) {
      return;
    }
    setSelectedC("followers");
    onOpen();
  };
  const onFollowingClick = () => {
    if (!uidFromAuth) {
      return;
    }
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
        <Box sx={{ cursor: "pointer" }} onClick={onFollowersClick}>
          <Typography>{followerCount} followers</Typography>
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={onFollowingClick}>
          <Typography>{followingCount} following</Typography>
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
        {isYourProfile && (
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
        {uidFromAuth && !isYourProfile && (
          <Button
            size="small"
            sx={{ m: 0.5, textTransform: "capitalize" }}
            variant="contained"
            fullWidth
            onClick={isFollowing ? onUnfollowUser : onFollowUser}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Box>
      <Dialog fullScreen={isNarrow} open={open} onClose={onClose}>
        {selectedC === "following" && uid && (
          <Followings uid={uid} onClose={onClose} />
        )}

        {selectedC === "followers" && uid && (
          <Followers uid={uid} onClose={onClose} />
        )}
      </Dialog>
      <Divider/>
    </Box>
  );
};
