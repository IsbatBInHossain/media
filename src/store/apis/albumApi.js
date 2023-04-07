import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

//! DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    fetchFn: async (...args) => {
      //! DEV ONLY
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builders) => {
    return {
      deleteALbum: builders.mutation({
        invalidatesTags: (result, error, album) => [
          { type: "Album", id: album.id },
        ],
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
      fetchAlbums: builders.query({
        providesTags: (result, error, user) => {
          const tags = result.map((album) => ({ type: "Album", id: album.id }));
          return [...tags, { type: "UserAlbums", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
      addAlbum: builders.mutation({
        invalidatesTags: (result, error, user) => [
          {
            type: "UserAlbums",
            id: user.id,
          },
        ],
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              title: faker.commerce.productName(),
              userId: user.id,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteALbumMutation,
} = albumsApi;
