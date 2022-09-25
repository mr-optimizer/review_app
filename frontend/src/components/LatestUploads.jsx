import React from "react";
import MovieListItem from "./MovieListItem";

export default function LatestUploads() {
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>

      <MovieListItem
        movie={{
          poster:
            "https://images.unsplash.com/photo-1656119651670-ec9610795a3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
          title: "Lorem ipsum dolor sit amet.",
          status: "public",
          genres: ["Action", "Comedy"],
        }}
      />
    </div>
  );
}
