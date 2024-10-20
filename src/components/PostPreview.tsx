import React from 'react';
import { Post } from './Post';
import { useAuthContext, useCreatePostContext } from '../providers/useContexts';
import { Box } from '@mui/material';

export const PostPreview: React.FC = () => {
    const cp = useCreatePostContext();
    const {user} = useAuthContext();
    const imageUrls = cp.posts.map((p) => p.imageUrl || '')
    const captions = cp.posts.map((p) => p.caption || '')
    const today = new Date().toDateString()
    return (
        <Box sx={{pt:0}}>

        <Post 
        uid={user.uid}
        enableTop
        dateAdded={today}
        captions={captions} imageUrls={imageUrls}/>
        </Box>
    )
}