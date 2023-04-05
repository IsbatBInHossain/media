import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: [
    {
      data: [],
    },
  ],
  reducers: {},
});

export const userReducer = usersSlice.reducer;
