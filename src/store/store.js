import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteALbumMutation,
} from "./apis/albumApi";
export {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useDeletePhotoMutation,
} from "./apis/photosApi";
