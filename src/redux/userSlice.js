import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "David",
    email: "doikuomola@gmail.com",
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    remove: (state) => (state = {}),
  },
});

// Action creators are generated for each case reducer function
export const { update, remove } = userSlice.actions;

export default userSlice.reducer;
