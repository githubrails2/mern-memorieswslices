import { createSlice } from '@reduxjs/toolkit'
import * as api from '../api';
const initialState = {
    posts: []
}
const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
      fetchSuccess: (state, action) => {
         state.posts = action.payload;
      },
        createSuccess: ({ posts }, action) => {
            posts = [...posts,action.payload]
      },
    updateSuccess:({ posts }, action) => {
      posts.map(post => (post._id === action.payload._id ? action.payload : post));
      },
      deleteSuccess: ({ posts }, action) => {
        posts.filter(post => post._id !== action.payload);
      }
    }
});

export const { fetchSuccess, createSuccess, updateSuccess, deleteSuccess } = postSlice.actions

export const selectPosts = state => state.slice.posts;

export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
      dispatch(fetchSuccess(data));
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
  
      dispatch(createSuccess(data));
      dispatch(getPosts());
    } catch (error) {
      console.log(error.message);
    }
};
export const updatePost = (id, post) => async (dispatch) => {
  
    try {
      const { data } = await api.updatePost(id, post);
      dispatch(updateSuccess(data));
      dispatch(getPosts());
    } catch (error) {
      
    }
}
export const deletePost = (id) => async dispatch => {
  try {
    await api.deletePost(id);
    dispatch(deleteSuccess(id));
    dispatch(getPosts());
  } catch (error) {
    
  }
}
export const likePost = (id) => async dispatch => {
  try {
    const { data } = await api.likePost(id);
    dispatch(updateSuccess(data));
    dispatch(getPosts());
  } catch (error) {
    
  }
  }
export default postSlice.reducer