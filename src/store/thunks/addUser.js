import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:5000/users", {
    name: faker.name.fullName(),
  });
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
