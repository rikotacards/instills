import React from 'react';
import { Post } from './Post';
import { useCreatePostContext } from '../providers/useContexts';

export const PostPreview: React.FC = () => {
    const cp = useCreatePostContext();
    const imageUrls = cp.posts.map((p) => p.imageUrl || '')
    const captions = cp.posts.map((p) => p.caption || '')

    return (
        <Post captions={captions} imageUrls={imageUrls}/>
    )
}