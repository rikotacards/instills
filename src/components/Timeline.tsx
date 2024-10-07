import { Box } from '@mui/material'
import React from 'react'
import sample from "../../sample.jpg";
import landscape from "../../landscape.jpg";
import { Post } from './Post';
export const Timeline: React.FC = () => (
    <Box>
        {[sample, landscape].map((i) => <Box sx={{mb:1}}>
            <Post captions={['hi']} imageUrls={[i]}/></Box>)}
    </Box>
)