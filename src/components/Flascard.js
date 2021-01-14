import React, { useState } from "react";

export default function Flascard({ flascard }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerAndOptions = () => {
    setShowAnswer((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <div className="card">
      <p className="question"> {flascard.question}</p>
      {!showAnswer ? (
        <div className="flascard-options">
          {flascard.options.map((option, index) => {
            return (
              <div className="flascard-option" key={option}>
                <span className="number">{index + 1}.</span>
                {option}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="answer">
          {flascard.answer}
        </div>
      )}
      <div onClick={handleAnswerAndOptions}>
        <button className="answer-button">
          {showAnswer ? "Show options" : "Show answer"}
        </button>
      </div>
    </div>
  );
}

