import { Box, Typography } from '@mui/material';
import React from 'react';
import { CreateUsername } from '../components/ClaimUsername';

export const SignUpPage: React.FC = () => {
    return (
        <Box sx={{m:1}}>
            <Typography>Welcome to Stills!</Typography>
         
            <CreateUsername/>
        </Box>
    )
}