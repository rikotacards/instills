import { Add, Home } from "@mui/icons-material";
import { Avatar, Box, IconButton, Paper, Slide } from "@mui/material";
import React from "react";
import { useScrollDirection } from "../utils/useScrollDirection";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../firebase/profile";
import { useAuthContext } from "../providers/useContexts";
import { useNavigate } from "react-router";
import { useIsNarrow } from "../utils/useIsNarrow";

interface BottomAppBarProps {
  onOpen: () => void;
}
export const BottomAppBar: React.FC<BottomAppBarProps> = ({ onOpen }) => {
  const sd = useScrollDirection();
  const { user } = useAuthContext();
  const nav = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["getUser", user?.uid],
    queryFn: () => getUser(user?.uid || ""),
  });
  const goTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
  };
  const goHome = () => {
    nav("/");
    goTop();
  };
  const isNarrow = useIsNarrow();
  const goProfile = () => nav(`/${data?.username || ""}`);
  if (!user || !isNarrow) {
    return null;
  }
  return (
    <Box sx={{ position: "fixed", bottom: "1%", zIndex: 3, width: "100%" }}>
      <Slide direction="up" in={true}>
        <Box
          sx={{
            width: "100%",
            justifyContent: "space-around",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={goHome}
            sx={{
              color: "white",
              backdropFilter: "blur(10px)",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            <Home />
          </IconButton>
          <IconButton
            onClick={onOpen}
            sx={{
              color: "white",
              backdropFilter: "blur(10px)",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            <Add />
          </IconButton>
          <IconButton onClick={goProfile}>
            <Avatar
              src={data?.profilePhotoUrl}
              sx={{ height: 36, width: 36, boxShadow: "0px 0px 10px black" }}
            />
          </IconButton>
        </Box>
      </Slide>
    </Box>
  );
};
