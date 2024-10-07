import React from 'react';
import sample from "../../sample.jpg";
import landscape from "../../landscape.jpg";
const imageUrls = [sample, landscape]
import { Box } from '@mui/material';
import { Post } from '../components/Post';
import { c } from '../components/ImageOverlay';
export const HomePage: React.FC = () => {
    return(
        <Box sx={{mt:1}}>
            <Post captions={c} imageUrls={imageUrls} /> 
            <br/>
            <Post captions={c} imageUrls={imageUrls} /> 
        </Box>
    )
}