import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { IFbPost, PreparePost } from "../types";
import { db } from "./firebaseConfig";

interface IUploadFile {
    file?: File, 
    postId: string;
}
const uploadFile = async ({file, postId}: IUploadFile) => {
    if(!file){
        return;
    }
    const url = `https://api.cloudinary.com/v1_1/rikotacards/upload`;
    const fd = new FormData();
    fd.append('upload_preset', 'public');
    fd.append('tags', 'browser_upload'); // Optional - add tags for image admin in Cloudinary
    fd.append('file', file);
    fd.append('folder', `posts/${postId}`);

  
   const res = await fetch(url, {
      method: 'POST',
      body: fd,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data scuces', data.secure_url)
        // File uploaded successfully
        const url = data.secure_url;
        
        // Create a thumbnail of the uploaded image, with 150px width
        const tokens = url.split('/');
        tokens.splice(-3, 0, 'w_150,c_scale');
        const img = new Image();
        img.src = tokens.join('/');
        img.alt = data.public_id;
       return url
      })
      .catch((error) => {
        console.error('Error uploading the file:', error);
      });
    return res
};

const handleUpload = async (files: (File|undefined)[], postId: string) => {
  try {
    const uploadPromise = files.map((f) => uploadFile({file: f, postId}));
    const fileUrls = await Promise.all(uploadPromise);
    return fileUrls;
  } catch (e) {
    alert(e);
  }
};

export const addPost = async (args: PreparePost[], uid: string) => {
    // create docRef first, because we need the 
    // docID before hand
    try {
    const docRef = doc(collection(db, "posts"));
    const files = args.map((p) => {if(p.imageFile){
        return p.imageFile
    }})
    const imageUrls =  await handleUpload(files, docRef.id)
    const captions = args.map((p) => p.caption)
    await setDoc(docRef, {
        captions,
        imageUrls,
        dateAdded: serverTimestamp(),
        uid
    })
  } catch (e) {
    console.error(e)
    alert(e);
  }
};

export const deletePost = async(postId: string) => {
    try {
        await deleteDoc(doc(db, "posts", postId))
    }catch(e){
        alert(e)
    }
}

export const getUserPosts = async(userId: string) => {
    try {
        const q = query(collection(db, "posts"), where('uid', '==', userId), orderBy('dateAdded', 'desc'));
        const res: IFbPost[] = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            res.push({ ...doc.data(), postId: doc.id } as IFbPost)
        });
        return res
    } catch(e){
        console.error(e);
        alert(e)
    }
}