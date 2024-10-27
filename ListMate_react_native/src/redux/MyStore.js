import { configureStore } from '@reduxjs/toolkit'
import MySlice from './MySlice'

export const store = configureStore({
    reducer: {
        MySlice: MySlice
    },
})