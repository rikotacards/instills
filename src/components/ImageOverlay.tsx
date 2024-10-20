import {
  Box,

  Dialog,

  Typography,
} from "@mui/material";
import React from "react";
import { Caption } from "./Caption";
import { SwiperSlide, Swiper } from "swiper/react";
import { Controller, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import profile from "../assets/profile.jpeg";
import "./ImageOverlay.css";
import { Reactions } from "./Reactions";
import { PostOptions } from "./PostOptions";
import { PostHeader } from "./PostHeader";
import { ReactionOverlay } from "./ReactionOverlay";
import { addReaction } from "../firebase/posts";
import { UID } from "../firebase/firebaseConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../firebase/profile";
interface ImageOverlayProps {
  children: React.ReactNode;
  onSwiper: any;
  swiperController: any;
  isCaptionOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  captions: string[];
  enableTop?: boolean;
  dateAdded?: string;
  postId: string;
  isYourPost?: boolean;
  total: number;
  uid: string;
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  children,
  swiperController,
  onSwiper,
  isYourPost,
  isCaptionOpen,
  onClose,
  onToggle,
  captions,
  enableTop,
  dateAdded,
  postId,
  total,
  uid
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["getUserForPost", uid],
    queryFn: () => getUser(uid || ""),
  });
  console.log(data)
  const onDialogOpen = () => {
    setOpen(true);
  };
  const onDialogClose = () => {
    setOpen(false);
  };
  const [openReaction, setReaction] = React.useState(false);
  const mutation = useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getReactions", postId],
      }),
    mutationFn: (unicode: string) => {
      return addReaction({
        uid: UID,
        unicode,
        postId,
      });
    },
  });
  const onOpenReaction = () => {
    setReaction(true);
    mutation.mutate('like')
    setTimeout(() => setReaction(false), 500);
  };
 
  const [currPage, setCurrPage] = React.useState(1);
  const onNext = () => {
    if(currPage < total){
      setCurrPage((p) => p+1)
    }
  }
  const onPrev = () => {
    if(currPage > 1){
      setCurrPage(p => p-1)
    }
  }
  const captionSlider = (
    <Box sx={{ m: 2, 


    }}>
      <PostHeader
        onDialogOpen={onDialogOpen}
        dateAdded={dateAdded}
        profile={profile}
        isYourPost={!!isYourPost}
        curr={currPage}
        total={total}
        uid={uid}
        profileUrl={data?.profilePhotoUrl}
        isLoading={isLoading}
        username={data?.username}
      />

      <Swiper
        onSwiper={onSwiper}
        onSlideChange={onClose}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        onSlideNextTransitionEnd={onNext}
        onSlidePrevTransitionEnd={onPrev}
        controller={{ control: swiperController }}
        modules={[Controller, Navigation, EffectFade]}
        style={{ display: "flex", zIndex: 1, marginTop: 0, 
          borderRadius: 4,
          padding:4,
          paddingTop:0
        }}
      >
        {captions.map((text, i) => (
          <SwiperSlide key={text + i}>
            <Caption
              isCaptionOpen={isCaptionOpen}
              text={text}
              onToggle={onToggle}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
      onClick={(e) => {
        if (e.detail == 2) {
          onOpenReaction()
        }
        if(e.detail ==1){
          onToggle()
        }
       
      }}
    >
      <ReactionOverlay openReaction={openReaction}/>
      <Box
        className={enableTop ? isCaptionOpen ?'forNow' : "top" : undefined}
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",

        }}
      >
        {!enableTop && (
          <PostHeader
            dateAdded={dateAdded}
            profile={profile}
            onDialogOpen={onDialogOpen}
            isYourPost={!!isYourPost}
            profileUrl={data?.profilePhotoUrl}
            isLoading={isLoading}
            username={data?.username}
          />
        )}
        {enableTop && captionSlider}
      </Box>

      {children}

      <Box
        className={enableTop ? undefined: "bottom"}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 1,
          p: 2,
        }}
      >
        {!enableTop && (
          <>
            <Box display={"flex"} sx={{ color: "white" }}>
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{ color: "white" }}
              >
                Maxwelldhsu
              </Typography>
              <Typography
                variant="caption"
                fontWeight={300}
                sx={{ color: "white", ml: 1 }}
              >
                Oct 12 2024
              </Typography>
            </Box>

            <Swiper
              onSwiper={onSwiper}
              onSlideChange={onClose}
              effect={"fade"}
              fadeEffect={{ crossFade: true }}
              onSlideNextTransitionEnd={() => setCurrPage((p) => p + 1)}
              onSlidePrevTransitionEnd={() => setCurrPage((p) => p - 1)}
              controller={{ control: swiperController }}
              modules={[Controller, Navigation, EffectFade]}
              style={{ display: "flex", zIndex: 10 }}
            >
              {captions.map((text, i) => (
                <SwiperSlide key={text + i}>
                  <Caption
                    isCaptionOpen={isCaptionOpen}
                    text={text}
                    onToggle={onToggle}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
        {/* <Box
          sx={{ 
            position: 'absolute',
            bottom:16,
            right:16,
            width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Chip
            sx={{
              mt: 0.5,
              ml: "auto",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
            size="small"
            label={
              <Typography variant="caption">
                {currPage}/{captions.length}
              </Typography>
            }
          />
        </Box> */}

        <Reactions username={data?.username} profileUrl={data?.profilePhotoUrl} postId={postId} />
      </Box>
      <Dialog onClose={onDialogClose} open={isOpen}>
        <PostOptions postId={postId} onClose={onDialogClose} />
      </Dialog>
    </Box>
  );
};
