import { Chip, IconButton } from '@mui/material';
import React from 'react';
interface ReactionEmojiProps {
    emoji: React.ReactNode;
    count: number
}
export const ReactionEmoji: React.FC<ReactionEmojiProps> = ({emoji}) => {
    const [isBig, setBig] = React.useState(false);

    const enlarge = () => {
        setBig(true);
        setTimeout(() => setBig(false), 500);
      };
    return (
        <Chip
        onClick={enlarge}
        icon={
          <IconButton
          sx={{
            transform: isBig ? "rotate(20deg) scale(2)" : 0,
            transition: "height 0.1s ease-in, width 0.1s ease-in, transform 0.5s ease",
          }}
          >{emoji}</IconButton>
            
        }
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
    )
}