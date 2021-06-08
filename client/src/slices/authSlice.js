import { createSlice } from '@reduxjs/toolkit'
import *  as api from '../api';
const initialState = {
    authData: {}
}
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
         localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            state.authData = action?.payload;
       },
        SignOut: (state) => {
            localStorage.clear();
            state.authData = null;
        },
        
    }
});

export const { signInSuccess, SignOut } = loginSlice.actions

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch(signInSuccess(data));
        history.push('/');
    } catch (error) {
        console.log(error);
        
    }
    

}
export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch(signInSuccess(data));
        history.push('/');
    } catch (error) {
        console.log(error);
    }
    
}
export default loginSlice.reducer