import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./apiCalls";

export const login = createAsyncThunk(
  "/auth/signin",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.signin(formValue);
      toast.success("Login successful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "/auth/googleSignIn",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.googleSignIn(result);
      toast.success("Google Sign In successful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "/auth/signin",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.signup(formValue);
      toast.success("Registered successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogOut: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    },
    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogOut } = authSlice.actions;

export default authSlice.reducer;
