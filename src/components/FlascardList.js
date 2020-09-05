import React from "react";
import FlasCard from "./Flascard";

export default function FlascardList({ flascards }) {
  return (
    <div className="card-grid">
      {flascards.map((flascard, index) => {
        return <FlasCard flascard={flascard} key={index} />;
      })}
    </div>
  );
}
