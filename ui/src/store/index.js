import { configureStore } from '@reduxjs/toolkit';
import extensionReducer from './extensionSlice';

export default configureStore({
    reducer: {
        extension: extensionReducer,
    },
});
