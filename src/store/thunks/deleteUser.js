import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk("users/delete", async (user) => {
  const response = axios.delete(`http://localhost:5000/users/${user.id}`);

  //! DEV ONLY
  await pause(1000);
  return user;
});

//! DEV ONLY

function pause(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
