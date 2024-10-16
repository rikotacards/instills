import { Avatar, Box, Button, Dialog, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

import { getUser } from "../firebase/profile";
import { EditProfilePage } from "../Pages/EditProfilePage";
import { useIsNarrow } from "../utils/useIsNarrow";
import { useAuthContext } from "../providers/useContexts";
interface ProfileHeaderProps {
  uid?: string;
  postCount: number;
}
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({postCount, uid }) => {
  const [editOpen, setEditOpen] = React.useState(false);
    const {user} = useAuthContext();
    const uidFromAuth = user?.uid
  const onEdit = () => {
    setEditOpen(true);
  };
  const isNarrow = useIsNarrow();

  const onEditClose = () => {
    setEditOpen(false);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["getUser", uid],
    queryFn: () => (uid ? getUser(uid) : undefined),
  });

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
          {uidFromAuth && <EditProfilePage uid={uidFromAuth} onClose={onEditClose} />}
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
        <Box>
          <Typography>0 followers</Typography>
        </Box>
        <Box>
          <Typography>0 following</Typography>
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
            sx={{ m: 0.5 }}
            variant="contained"
            fullWidth
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
        <Button
          size="small"
          sx={{ m: 0.5 }}
          variant="contained"
          fullWidth
          onClick={onEdit}
        >
          Follow
        </Button>
      </Box>
    </Box>
  );
};
