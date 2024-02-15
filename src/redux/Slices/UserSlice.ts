import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/Agent";
import { User } from "../../models/User";
import { LoginForm } from "../../models/login";
import { RegisterForm } from "../../models/Register";
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "../Store";
import axios from "axios";


interface UserState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: string | null;
  }
const initialState: UserState = {
    user: null,
    isLoggedIn: false,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null
  };
  
  export const loginUser = createAsyncThunk<User, LoginForm, { rejectValue: string }>(
    'user/login',
    async (loginDetails: any, { rejectWithValue }: any) => {
      try {
        return await agent.AuthService.login(loginDetails);

      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const registerUser = createAsyncThunk<User, RegisterForm, { rejectValue: string }>(
    'user/register',
    async (registerDetails, { rejectWithValue }) => {
      try {
        return await agent.AuthService.register(registerDetails);
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, { getState, rejectWithValue }) => {
        try {
            
          const state = getState() as RootState;

            
            const token = state.user.token; 
            console.log(token);

            if (!token) {
                throw new Error('No token found');
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const userData = await agent.AuthService.getUser();
            console.log(userData);
            return userData;
        } catch (error:any) {
            return rejectWithValue(error.message);
        }
    }
);
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('token');
      },
    },
    extraReducers: (builder) => {
      builder
        // Handling login
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.user = action.payload;
          state.token = action.payload.Token;
          localStorage.setItem('token', action.payload.Token);
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        })

        
        // Handling registration
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          state.token = action.payload.Token;
          localStorage.setItem('token', action.payload.Token);
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        })


        // Handling fetchUserData
        .addCase(fetchUserData.pending, (state) => {
         state.isLoading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = true;
           state.user = action.payload;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
           state.isLoading = false;
           
          state.error = action.payload as string;
         });
    },
  });
  
  export const { logout } = userSlice.actions;
  export default userSlice.reducer;