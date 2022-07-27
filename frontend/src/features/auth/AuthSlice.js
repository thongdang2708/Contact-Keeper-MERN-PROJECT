
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "./AuthService";

let userData = JSON.parse(localStorage.getItem("user"));


const initialState = {
    user: userData ? userData : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
};

//Register

export const registerUser = createAsyncThunk("/auth/register",
    async (user, thunkAPI) => {
        try {

            return await AuthService.register(user);

        } catch (error) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Login

export const loginUser = createAsyncThunk("/auth/login",
    async (user, thunkAPI) => {
        try {

            return await AuthService.login(user);

        } catch (error) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Log out

export const logoutUser = createAsyncThunk("/auth/logout",
        async (user, thunkAPI) => {
            await AuthService.logOut();
        }
);


export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetForAll: (state) => initialState,
        resetForLogin: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
            })
    }
});

export const {resetForAll, resetForLogin} = AuthSlice.actions;

export default AuthSlice.reducer;