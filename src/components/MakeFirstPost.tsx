import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
export const MakeFirstPost: React.FC = () => {
    return (
        <Card variant='outlined' sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', width:'100%'}}>
            <CardContent>
                <Typography fontWeight={'bold'} variant='h6'>Make your first post</Typography>
                <Button startIcon={<AddPhotoAlternateIcon/>} fullWidth variant='contained'>Create</Button>
            </CardContent>
        </Card>
    )
}