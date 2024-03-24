import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/Agent";

interface ImageState {
    uploadedImage: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  const initialState: ImageState = {
    uploadedImage: null,
    isLoading: false,
    error: null,
  };
  
  
  export const uploadImage = createAsyncThunk(
    'image/uploadImage',
    async (imageFile: File, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        
        const response = await agent.ImageService.uploadImage(formData);
        
        return response;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );
  
  const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
      clearUploadedImage(state) {
        state.uploadedImage = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(uploadImage.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(uploadImage.fulfilled, (state, action) => {
          state.isLoading = false;
          state.uploadedImage = action.payload;
        })
        .addCase(uploadImage.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message ?? 'Failed to upload image';
        });
    },
  });
  
  export const { clearUploadedImage } = imageSlice.actions;
  export default imageSlice.reducer;