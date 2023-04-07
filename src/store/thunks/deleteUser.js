import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk("users/delete", async (user) => {
  const response = axios.delete(`http://localhost:5000/users/${user.id}`);

  return user;
});
