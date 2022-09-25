import React from "react";
import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <AppInfoBox title="Total Uploads" subTitle="100" />
      <AppInfoBox title="Total Reviews" subTitle="1,500" />
      <AppInfoBox title="Total Users" subTitle="200" />

      <LatestUploads />
    </div>
  );
}
