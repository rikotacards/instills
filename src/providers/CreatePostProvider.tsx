import React from 'react';
import { PreparePost } from '../types';

interface IPostContext {
    posts: PreparePost[],
    addSlide: (file?: File) => void;
    removeSlide: (index: number) => void;
    onUpdateCaption: (i: number, caption: string) => void;
    onImageChange: (i: number, imageFile: File) => void;
    onReset: () => void;
}

export const PostContext = React.createContext({} as IPostContext)
interface CreatePostProviderProps {
    children: React.ReactNode;
}
export const CreatePostProvider: React.FC<CreatePostProviderProps>= ({children}) => {
    const [posts, setPosts] = React.useState([] as PreparePost[])
    
    const addSlide = (file?: File) => {
        
        const imageUrl = file && URL.createObjectURL(file);
        setPosts((p) => [...p, {imageFile: file, caption:'', imageUrl}])
    }
  
    const onUpdateCaption = (i: number, caption: string)=> {
        const newPost = {...posts[i], caption}
        const pre = posts.slice(0,i);
        const post = posts.slice(i+1);
        setPosts([...pre, newPost, ...post])
        
    }
    const removeSlide = (index: number) => {
        const updatedSlides = []
        if(posts.length == 1){
            return;
        }
        for(let i = 0; i < posts.length; i++){
            if(i === index){
                continue;
            }
            updatedSlides.push(posts[i])
        }
        setPosts(updatedSlides)
    }
    const onImageChange = (i: number, imageFile: File) => {
        const imageUrl = imageFile && URL.createObjectURL(imageFile)
        const updated = {...posts[i], imageUrl}
        setPosts((p) => {
            // ask if this part is considered mutating the state
            const pre = p.slice(0,i)
            const post = p.slice(i+1)
            return [...pre, updated, ...post]
        })
    }
    console.log('CHECK MUTE', posts)
    const onReset = () => {
        setPosts([])
    }
    const value = {
        posts,
        addSlide,
        removeSlide,
        onUpdateCaption,
        onImageChange,
        onReset
    }
    console.log('P', posts)
    
    
    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}