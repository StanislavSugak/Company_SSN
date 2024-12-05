import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        personal: {},
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;