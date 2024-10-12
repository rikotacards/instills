import React from 'react';
import { Post } from './Post';
import { useCreatePostContext } from '../providers/useContexts';
import { Box } from '@mui/material';

export const PostPreview: React.FC = () => {
    const cp = useCreatePostContext();
    const imageUrls = cp.posts.map((p) => p.imageUrl || '')
    const captions = cp.posts.map((p) => p.caption || '')

    return (
        <Box sx={{pt:1}}>

        <Post captions={captions} imageUrls={imageUrls}/>
        </Box>
    )
}