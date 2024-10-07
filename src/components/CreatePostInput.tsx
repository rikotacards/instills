import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useCreatePostContext } from "../providers/useContexts";
import { useIsNarrow } from "../utils/useIsNarrow";
interface CreatePostInputProps {
  index: number;
  captionFromContext: string;
  imageUrl?: string;
}
export const CreatePostInput: React.FC<CreatePostInputProps> = ({
  captionFromContext,
  index,
  imageUrl,
}) => {
  const [imagePath, setImagePath] = React.useState<undefined | string>(
    imageUrl
  );
  console.log('imagepath', imagePath)
  const onImageFileChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length === 0 || !e.target?.files) {
      // if you cancel when choosing photos
      return;
    } else {
      cp.onImageChange(i, e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImagePath(imageUrl);
    }
  };
  const onClickUpload = () => {
    ref?.current?.click();
  };

  const [caption, setCaption] = React.useState(captionFromContext);
  const cp = useCreatePostContext();
  const ref = React.useRef<null | HTMLInputElement>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };
  const isNarrow = useIsNarrow();
  const onBlur = () => {
    // save
    cp.onUpdateCaption(index, caption);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: isNarrow ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     
       {!imageUrl ? <Card sx={{ width: "100%", height: "100%", m: 1 }} variant="outlined">
          <CardActionArea
            sx={{ width: "100%", height: "100%" }}
            onClick={onClickUpload}
          >
            <AddPhotoAlternateIcon color="disabled" />
          </CardActionArea>
        </Card> :
        
    
   
        <Box
          onClick={onClickUpload}
          component="img"
          src={imagePath}
          sx={{
            position: "relative",
            maxWidth: "400px",
            height: "500px",
            maxHeight: "500px",
            objectFit: "cover",
          }}
        />}
      
      <input
        onChange={(e) => onImageFileChange(index, e)}
        ref={ref}
        accept="image/*"
        type="file"
        style={{ display: "none", height: "100%", width: "100%" }}
      />
      <OutlinedInput
        value={caption}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
        multiline
        placeholder="Write your caption"
        sx={{ height: "100%", alignItems: "flex-start", m: 1 }}
      />

      <Box>
        <IconButton onClick={() => cp.removeSlide(index)}>
          <Close />
        </IconButton>
      </Box>
    </Box>
  );
};
