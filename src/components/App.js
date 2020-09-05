import React, { useState, useEffect, useRef } from "react";
import FlasCardList from "./FlascardList";
import he from "he";

function App() {
  const [flasCard, setFlasCard] = useState([]);
  const categoryRef = useRef();
  const amountRef = useRef();
  const [category, setCategory] = useState([
    {
      id: 9,
      name: "Entertainment: Japanise Anime & Manga",
    },
  ]);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((res) => {
        setCategory(res.trivia_categories);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;
    fetch(
      "https://opentdb.com/api.php?amount=" + amount + "&category=" + category
    )
      .then((res) => res.json())
      .then((res) => {
        setExpand(true);
        setFlasCard(
          res.results.map((elem, i) => {
            const correctAnswer = he.decode(elem.correct_answer);
            const options = [
              ...elem.incorrect_answers.map((elem) => {
                return he.decode(elem);
              }),
              correctAnswer,
            ];
            return {
              id: `${i} - ${Date.now()}`,
              question: he.decode(elem.question),
              answer: he.decode(elem.correct_answer),
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }

  return (
    <>
      <div className="container">
        <h1>Flascard-Quiz</h1>
        <h4>Generate questions of specified category</h4>
        <form
          className="header"
          onSubmit={handleSubmit}
          style={{ marginTop: expand ? "0" : "5px" }}
        >
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" ref={categoryRef}>
              {category.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {" "}
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Number of Questions</label>
            <input
              type="number"
              id="amount"
              min="1"
              max="50"
              step="1"
              defaultValue={10}
              ref={amountRef}
            ></input>
          </div>
          <div className={expand ? "btn2 form-group" : "btn form-group"}>
            <button>Generate</button>
          </div>
        </form>
        <div className="container">
          <FlasCardList flascards={flasCard} />
        </div>
      </div>
    </>
  );
}

export default App;
