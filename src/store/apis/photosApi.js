import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//! DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builders) => {
    return {
      deletePhoto: builders.mutation({
        invalidatesTags: (result, error, photo) => [
          { type: "Photo", id: photo.id },
        ],
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
      addPhoto: builders.mutation({
        invalidatesTags: (result, error, album) => [
          { type: "AlbumPhotos", id: album.id },
        ],
        query: (album) => {
          return {
            url: "/photos",
            method: "POST",
            body: {
              url: faker.image.abstract(150, 150, true),
              albumId: album.id,
            },
          };
        },
      }),
      fetchPhotos: builders.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => ({ type: "Photo", id: photo.id }));
          return [...tags, { type: "AlbumPhotos", id: album.id }];
        },
        query: (album) => {
          return {
            url: "/photos",
            method: "GET",
            params: {
              albumId: album.id,
            },
          };
        },
      }),
    };
  },
});

export const {
  useAddPhotoMutation,
  useFetchPhotosQuery,
  useDeletePhotoMutation,
} = photosApi;
