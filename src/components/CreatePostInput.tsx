import {   Edit } from "@mui/icons-material";
import {
  Box,
  Button,

  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  InputBase,
  OutlinedInput,
  TextField,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
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
  const [open, setOpen] = React.useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [imagePath, setImagePath] = React.useState<undefined | string>(
    imageUrl
  );
  console.log("imagepath", imagePath);
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
  const onRemove = (i: number) => {
    cp.removeSlide(i);
  };
  const onYes = (i: number) => {
    onRemove(i);
    onClose();
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
      {
        <Box sx={{ position: "relative", display: "flex" }}>
          <Box
            onClick={onClickUpload}
            component="img"
            src={imagePath}
            sx={{
              position: "relative",
              maxWidth: "400px",
              height: "500px",
              width: "100%",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
          {isNarrow && (
            

            <InputBase
              value={caption}
              // variant="outlined"
              onChange={onChange}
              onBlur={onBlur}
              multiline
              fullWidth
              // slotProps={{
              //   input: {
              //     startAdornment: (
              //       <InputAdornment position="start">
              //         <Edit sx={{color:'white'}} />
              //       </InputAdornment>
              //     ),
              //   },
              // }}
              inputProps={{ style: { color: "white", margin: 0 } }}
              placeholder="Write your caption"
              sx={{
                bottom:0,
                p:2,
                position: "absolute",
                background:
                `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0,  ${true ? 0.8 : 0.6})) `,
              }}
            />
        
          )}
          
          <Box sx={{ position: "absolute", top: 0, right: 0, p: 1 }}>
            <IconButton
              sx={{  backdropFilter: "blur(10px)", color: "white", background:'rgba(0,0,0,0.5)' }}
              onClick={onOpen}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      }

      {!isNarrow && (
        <OutlinedInput
          value={caption}
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          multiline
          placeholder="Write your caption"
          sx={{
            height: "100%",
            alignItems: "flex-start",
            m: 0,
            flexBasis: 1,
            display: "flex",
            minWidth: 200,
          }}
        />
      )}
      <input
        onChange={(e) => onImageFileChange(index, e)}
        ref={ref}
        accept="image/*"
        type="file"
        style={{
          display: 'none',
          position: "absolute",
          top: 0,
          border: "5px solid red",
          height: "50px",
          width: "100%",
        }}
      />
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          Are you sure you want to remove this image?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onYes(index)}>Yes</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
