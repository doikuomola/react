import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "./apiCalls";

export const getTours = createAsyncThunk(
  "/tours",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getTours();
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const createTour = createAsyncThunk(
  "/tour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.createTour(updatedTourData);
      toast.success("Tour added successfully", {
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

export const getTour = createAsyncThunk(
  "/tour/:id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.getTour(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateTour = createAsyncThunk(
  "/tours/:id",
  async ({ updatedTourData, id, toast, navigate }, { rejectWithValue }) => {
    try {
      const res = await api.updateTour(updatedTourData, id);
      toast.success("Tour updated successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/dashboard");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteTour = createAsyncThunk(
  "/tours/:id",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const res = await api.deleteTour(id);
      toast.success("Tour deleted successfully");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "/tours/userTours/:id",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.getToursByUser(userId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTour.pending]: (state, action) => {
      state.loading = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tours = state.tours.filter((item) => item._id !== id);
        state.userTours = state.userTours.filter((item) => item._id !== id);
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tourSlice.reducer;
