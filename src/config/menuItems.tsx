import { IMenuItems } from "../types"
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

export const sidebar: IMenuItems[] = [
    {
      icon: <HomeIcon />,
      label: "home",
      path: "/",
    },
    {
      icon: <AddIcon />,
      label: "create",
      path: "/create",
    },
    
  ];