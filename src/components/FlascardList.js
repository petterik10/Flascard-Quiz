import React from "react";
import FlasCard from "./Flascard";

export default function FlascardList({ loading, flascards }) {
  return (
    <div className="card-grid">
      {!loading &&
        flascards.map((flascard, index) => {
          return <FlasCard flascard={flascard} key={flascard.id} />;
        })}
    </div>
  );
}
