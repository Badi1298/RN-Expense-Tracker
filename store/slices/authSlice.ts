import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadAuthToken = createAsyncThunk('auth/fetchFromAsyncStorage', async () => {
    const token = await AsyncStorage.getItem('authToken');

    console.log(token);

    return token; // Return the token or null if not found
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null as string | null,
        isAuthenticated: false,
        status: 'idle',
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAuthToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadAuthToken.fulfilled, (state, action) => {
                state.status = 'succeeded';

                if (action.payload) {
                    state.token = action.payload;
                    state.isAuthenticated = true;
                }
            })
            .addCase(loadAuthToken.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
