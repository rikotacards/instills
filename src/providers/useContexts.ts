import React from 'react'
import { PostContext } from './createPostProvider'
export const useCreatePostContext = () => React.useContext(PostContext)
