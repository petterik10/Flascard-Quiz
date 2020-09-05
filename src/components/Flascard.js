import React from "react";

export default function Flascard({ flascard }) {
  return (
    <div
      className="card"
    >
      <div className="card-inner">
        <div className="front">
          {flascard.question}
          <div className="flascard-options">
            {flascard.options.map((option, index) => {
              return (
                <div className="flascard-option" key={option}>
                  {" "}
                  {option}{" "}
                </div>
              );
            })}
          </div>
        </div>
        <div className="back">{flascard.answer}</div>
      </div>
    </div>
  );
}

