import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';

import postSlice from '../slices/postSlice';

export default configureStore({
    reducer: {
        slice: postSlice,
        auth: authSlice,
       
    }
})