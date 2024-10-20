import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { uploadFile } from "../firebase/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../firebase/profile";
import { useNavigate } from "react-router";
import { useAuthContext } from "../providers/useContexts";

export const UploadProfilePhoto: React.FC = () => {
  const [imagePath, setImagePath] = React.useState<undefined | string>("");
  const ref = React.useRef<null | HTMLInputElement>(null);
  const {user} = useAuthContext()
  const uid = user?.uid
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const goHome = () => {
    nav('/')
  }
  const mutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getUser"],
      }),
    mutationFn: (args: { profilePhotoUrl: string; uid: string }) => {
      return updateProfile({
       profilePhotoUrl: args.profilePhotoUrl,
        uid: args.uid,
      });
    },
  });
  const onImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0 || !e.target?.files) {
      // if you cancel when choosing photos
      return;
    } else {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImagePath(imageUrl);
      const profilePhotoUrl = await uploadFile({
        file: e.target.files[0],
        postId: "profilePhoto",
        path: "profile",
      });
      await mutation.mutate({ uid: user?.uid||'', profilePhotoUrl });
    }
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar sx={{m:1, height:150, width:150}} src={imagePath} />
      
      <Button
      fullWidth
      onClick={() => ref?.current?.click()} 
      variant={imagePath? 'outlined' :'contained'}>Upload profile photo</Button>
      <Button
      fullWidth
      variant={imagePath? 'contained' : undefined}
      sx={{mt:1}} onClick={goHome}>{imagePath ? 'Get started': 'Skip'}</Button>
      <input
        onChange={(e) => onImageFileChange(e)}
        accept="image/*"
        type="file"
        ref={ref}
        style={{ display: "none" }}
      />
    </Box>
  );
};
