import { configureStore } from '@reduxjs/toolkit'
import auth from './authSlice'
import activate from './activate-slice'

export const store = configureStore({
    reducer: {
        auth, activate
    }
})