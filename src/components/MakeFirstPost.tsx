import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useIsNarrow } from '../utils/useIsNarrow';
interface MakeFirstPostProps {
    onCreate: () => void;
}
export const MakeFirstPost: React.FC<MakeFirstPostProps> = ({onCreate}) => {
    const isNarrow = useIsNarrow();
    const narrowText = 'Click the + icon at the bottom to create your first post';
    const wideText = 'Click the + Create on the left side bar to create your first post.'
    return (
        <Card variant='outlined' sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', width:'100%'}}>
            <CardContent>
            <Typography fontWeight={'bold'} variant='h6'>{'Make your first post'}</Typography>

                <Typography fontWeight={'bold'} variant='body2'>{isNarrow  ?narrowText: wideText}</Typography>
               <Typography></Typography>
            </CardContent>
        </Card>
    )
}