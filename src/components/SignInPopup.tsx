import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { onSignInWithGoogle } from '../hooks/useSignIn';
interface SignInPopupProps {
    username?: string;
    profileUrl?: string;
}
export const SignInPopup: React.FC<SignInPopupProps> = ({
    username, 
    profileUrl
}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar sx={{height:100, width:100}} src={profileUrl}/>
            <Typography fontWeight={'bold'} sx={{p:1}}>See more from {username}</Typography>
            <Button variant='contained' sx={{textTransform: 'capitalize'}} onClick={onSignInWithGoogle}>Login or Sign Up</Button>
        </Box>
    )
}