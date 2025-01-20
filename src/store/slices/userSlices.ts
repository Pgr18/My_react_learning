import { createSlice } from "@reduxjs/toolkit";

const NAME = 'user';

interface UserState {
    loading: boolean;
    accessToken?: string | null;
    userName?: string | null;
    role?: string | null;
    userError?: string | null; 
}

const initialState: UserState = {
    loading: false,
    accessToken: '',
    role: '',
    userName: ''
    

}

const userSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase('login', (state ,action) => {
            state.accessToken = action.payload.accessToken;
        })
    }
});