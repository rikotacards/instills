import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React from "react";
import { Caption } from "./Caption";
import { PostTop } from "./PostTop";
import { SwiperSlide, Swiper } from "swiper/react";
import { Controller, Navigation, EffectFade } from "swiper/modules";
import 'swiper/css/effect-fade';
import { EmojiEmotions, Favorite } from "@mui/icons-material";

interface ImageOverlayProps {
  children: React.ReactNode;
  onSwiper: any;
  swiperController: any;
  isCaptionOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  captions: string[];
}
const sampleText =
  'this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to testthis is along piece of text that is designed to test this is along piece of text that is designed to testthis is along piece of text that is designed to testthis is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test this is along piece of text that is designed to test the caption box to see if we can type somethign long or not. hopefully it will act as desgiend otherwise I"ll be a bit annoyed.';

export const c = [sampleText, "And this is when we went to the fire drill"];
export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  children,
  swiperController,
  onSwiper,
  isCaptionOpen,
  onClose,
  onToggle,
  captions,
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const onDialogOpen = () => {
    setOpen(true);
  };
  const onDialogClose = () => {
    setOpen(false);
  };
  const [currPage, setCurrPage] = React.useState(1)

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 2,
          display: "flex",
        }}
      >
        <PostTop onMoreClick={onDialogOpen} />
      </Box>

      {children}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 1,
          p:2,
          background:
            `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0,  ${isCaptionOpen ? 0.8 : 0.6})) `,
        }}
      >
        <Box sx={{mb:1, display: 'flex', width:'100%', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Chip icon={<Favorite color='error'/>} size='small' sx={{color: 'white', fontWeight: 600, mr:1}} label={40}/>
          <Chip  size='small' sx={{color: 'white', fontWeight: 600, mr:1}} label={'😂 23'}/>
          <IconButton size="small" sx={{color: 'white'}}><EmojiEmotions fontSize="small"/></IconButton>
        </Box>
        <Swiper
          onSwiper={onSwiper}
          onSlideChange={onClose}
          effect={'fade'}
          fadeEffect ={{ crossFade: true }}
          onSlideNextTransitionEnd={() => setCurrPage((p) => p+1)}
          onSlidePrevTransitionEnd={() => setCurrPage(p => p-1)}
          controller={{ control: swiperController }}
          modules={[Controller, Navigation, EffectFade]}
          style={{ display: "flex" }}
        >
          {captions.map((text) => (
            <SwiperSlide>
              <Caption
                isCaptionOpen={isCaptionOpen}
                text={text}
                onToggle={onToggle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Box sx={{width:'100%', display: 'flex', justifyContent: 'flex-end'}}>

        <Chip   sx={{mt:0.5, ml:'auto', color: 'white', backdropFilter: 'blur(5px)'}} size='small' label={<Typography color='grey' variant='caption'>{currPage}/{captions.length}</Typography>}/>
        </Box>

      </Box>
      <Dialog onClose={onDialogClose} open={isOpen}>
        <DialogContent>

        <Button color='error'>Delete</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
