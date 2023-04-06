import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:5000/users");
  //! DEV ONLY
  await pause(1000);
  return response.data;
});

//! DEV ONLY

function pause(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
