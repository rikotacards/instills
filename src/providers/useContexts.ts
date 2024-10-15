import React from 'react'
import { PostContext } from './createPostProvider'
import { AuthContext } from './AuthProvider'
export const useCreatePostContext = () => React.useContext(PostContext)
export const useAuthContext = () => React.useContext(AuthContext)
