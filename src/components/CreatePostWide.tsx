import { Box } from '@mui/material';
import React from 'react';
import { CreatePostForm } from './CreatePostForm';

export const CreatePostWide: React.FC = () => {
    return (
        <Box sx={{p:1}}>
            <CreatePostForm/>
        </Box>
    )
}