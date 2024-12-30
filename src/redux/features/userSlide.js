import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null, // Store user data
};

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
        userChangeIsLoggedIn: (state, action) => {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user || state.user, // Store user data if logged in
            };
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const { reset, userChangeIsLoggedIn, setUser, clearUser } = userSlide.actions;

export default userSlide.reducer;
