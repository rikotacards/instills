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