export interface PreparePost {
    imageUrl?: string;
    imageFile?: File;
    caption: string;
}
export interface IPost {
    imageUrls: string[]
    captions: string[]
}