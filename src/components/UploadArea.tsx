import { AddPhotoAlternate } from "@mui/icons-material";
import { Card, CardActionArea } from "@mui/material";
import React from "react";
interface UploadAreaProps {
  onUpload: (file: File) => void;
  inc: () => void;
}
export const UploadArea: React.FC<UploadAreaProps> = ({ onUpload, inc }) => {
  const ref = React.useRef<null | HTMLInputElement>(null);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      const array = Array.from(e.target.files);
      for (const file of array) {
        onUpload(file);
      }
      inc();
    }
  };
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: "400px",
        zIndex: 0,
      }}
    >
      <CardActionArea
        sx={{
          width: "100%",
          minWidth: "200px",
          minHeight: "200px",
          height: "100%",
          display: "flex",
          alignItem: "center",
          zIndex: 0
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
  );
};
