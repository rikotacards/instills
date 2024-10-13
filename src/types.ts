import { Timestamp } from "firebase/firestore";

export interface PreparePost {
    imageUrl?: string;
    imageFile?: File;
    caption: string;
}
export interface IPost {
    imageUrls: string[]
    captions: string[]
}

export interface IMenuItems {
    icon: React.ReactNode;
    label: string;
    path: string;
  }

export interface IFbPost {
    captions: string[];
    imageUrls: string[];
    uid: string;
    dateAdded: Timestamp;
    postId: string;
}