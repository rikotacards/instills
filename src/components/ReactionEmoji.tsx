import { Box, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
interface ReactionEmojiProps {
  emoji: React.ReactNode;
  count: number;
  onClick: () => void;
  hasReacted?: boolean;
}
export const ReactionEmoji: React.FC<ReactionEmojiProps> = ({
  onClick,
  emoji,
  count,
  hasReacted,
}) => {
  const [isBig, setBig] = React.useState(false);

  const enlarge = () => {
    setBig(true);
    onClick();
    setTimeout(() => setBig(false), 500);
  };
  return (
    <>
    <Chip
      onClick={enlarge}
      variant='outlined'
    
      icon={
        <IconButton
          sx={{
            transform: isBig ? "rotate(20deg) scale(2)" : 0,
            transition:
              "height 0.1s ease-in, width 0.1s ease-in, transform 0.5s ease",
          }}
        >
          {emoji}
        </IconButton>
      }
      size="small"
      sx={{
        backdropFilter: "blur(10px)",
        fontWeight: 600,
        mr: 1,

      }}
      label={count}
    />
    {/* <Box sx={{
      borderColor: 'white',
      backdropFilter: "blur(10px)",
      borderRadius: 10,
      overflow:'hidden',
      display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
       <IconButton
          sx={{
            transform: isBig ? "rotate(20deg) scale(2)" : 0,
            transition:
              "height 0.1s ease-in, width 0.1s ease-in, transform 0.5s ease",
          }}
        >
          {emoji}
        </IconButton>
        <Typography>{count}</Typography>
    </Box> */}
    </>
  );
};
