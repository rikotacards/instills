import { AddPhotoAlternate } from '@mui/icons-material';
import { Card, CardActionArea } from '@mui/material';
import React from 'react';
interface UploadAreaProps {
    onUpload: (file: File) => void;
}
export const UploadArea: React.FC<UploadAreaProps> =({onUpload} ) => {
    const ref = React.useRef<null | HTMLInputElement>(null);
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        if (e.target.files) {
          const array = Array.from(e.target.files);
          for (const file of array) {
            onUpload(file);
          }
        }
      };
    return (
        <Card
        variant="outlined"
        sx={{
          width: "100%",
          height: "100%",
          maxWidth:'400px'
        }}
      >
        <CardActionArea
          sx={{
            width: "100%",
            minWidth: '200px',
            minHeight: '200px',
            height: "100%",
            display: "flex",
            alignItem: "center",
          }}
          onClick={() => ref?.current?.click()}
        >
          <AddPhotoAlternate color="disabled" />
        </CardActionArea>
        <input
          onChange={onFileChange}
          ref={ref}
          accept="image/*"
          type="file"
          multiple
          style={{ display: "none", height: "100%", width: "100%" }}
        />
      </Card>
    )
}