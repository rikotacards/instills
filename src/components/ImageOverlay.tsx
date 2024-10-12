import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Caption } from "./Caption";
import { PostTop } from "./PostTop";
import { SwiperSlide, Swiper } from "swiper/react";
import { Controller, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import profile from '../assets/profile.jpeg'
import { AddReaction,  Favorite } from "@mui/icons-material";
import './ImageOverlay.css'
interface ImageOverlayProps {
  children: React.ReactNode;
  onSwiper: any;
  swiperController: any;
  isCaptionOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  captions: string[];
  enableTop?: boolean
}
const sampleText =
  'Went to view this apartment today, the floors were okay, but made of wood. nothing too bad.';

export const c = [sampleText, "Where the magic happens"];
export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  children,
  swiperController,
  onSwiper,
  isCaptionOpen,
  onClose,
  onToggle,
  captions,
  enableTop
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isBig, setBig] = React.useState(false)
  const onDialogOpen = () => {
    setOpen(true);
  };
  const onDialogClose = () => {
    setOpen(false);
  };
  const enlarge = () => {
    setBig(true)
    setTimeout(() => setBig(false), 500)
  }
  const [currPage, setCurrPage] = React.useState(1);

  const captionSlider =  <Box sx={{m:2}}>
  <Box display={'flex'} sx={{color:'white', alignItems: 'center'}}>
    <Avatar sx={{height:30, width:30, mr:1}} src={profile}/>
  <Typography variant='body2' fontWeight={700} sx={{color: 'white'}}>Maxwelldhsu</Typography>
  <Typography variant='caption' fontWeight={300} sx={{color: 'white',ml:1}}>Oct 12 2024</Typography>
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
    style={{ display: "flex", zIndex:1 , marginTop: 8}}
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

  return (
    <Box

      sx={{
        position: "relative",
        height: "100%",
        
      }}
    >
      <Box
        className={enableTop ? 'top': undefined}
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 2,
          display: "flex",
          flexDirection: 'column',
        }}
      >
 

      {!enableTop &&   <PostTop onMoreClick={onDialogOpen} />}
        {enableTop && captionSlider}
        </Box>

      {children}

      <Box
      className={'bottom'}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 1,
          p: 2,
          // background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0,  ${isCaptionOpen ? 0.9 : 0.9})) `,
        }}
      >
      {!enableTop &&
          <>
        <Box display={'flex'} sx={{color:'white'}}>
        <Typography variant='body2' fontWeight={700} sx={{color: 'white'}}>Maxwelldhsu</Typography>
        <Typography variant='caption' fontWeight={300} sx={{color: 'white',ml:1}}>Oct 12 2024</Typography>
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
          style={{ display: "flex", zIndex:10 }}
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
        }
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
      
         <Box
          sx={{
            mt:1,
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Chip
          onClick={enlarge}
            icon={<Favorite 
              sx={{
                height: isBig ? 40 : 'default',
                width: isBig ? 40 : 'default',
                transform: isBig ? 'rotate(20deg)': 0,
                transition: 'height 0.1s ease-in, width 0.1s ease-in'
              }}
              
              color="error" />}
            size="small"
            sx={{
              // backdropFilter: "blur(10px)",
              color: "white",
              fontWeight: 600,
              // boxShadow: "0px 0px 1px black",
              mr: 1,
            }}
            // variant='outlined'
            label={40}
          />
          <Chip
            size="small"
            sx={{
              color: "white",
              fontWeight: 600,
              mr: 1,
              // backdropFilter: "blur(10px)",
            }}
            label={"😂 23"}
          />
          <IconButton size="small" sx={{ color: "white", ml: "auto" }}>
            <AddReaction fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Dialog onClose={onDialogClose} open={isOpen}>
        <DialogContent>
          <Button color="error">Delete</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
