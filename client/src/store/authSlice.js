import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: null,
    otp: {
        phone: '',
        hash: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user

            if(action.payload.user === null) {
                state.isAuth = false
            } else {
                state.isAuth = true
            }
        },
        
        setOtp: (state, action) => {
            state.otp.hash = action.payload.hash
            state.otp.phone = action.payload.phone
        },
    }
})

export const { setAuth, setOtp } = authSlice.actions
export default authSlice.reducer