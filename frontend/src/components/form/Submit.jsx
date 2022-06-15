import React from "react";

export default function Submit({ value }) {
  return (
    <input
      type="submit"
      value={value}
      className=" w-full rounded bg-white text-secondary hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer p-1"
    />
  );
}
