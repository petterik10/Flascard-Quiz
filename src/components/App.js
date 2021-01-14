import React, { useState, useEffect } from "react";
import FlasCardList from "./FlascardList";
import Form from "./Form";
import Header from "./Header";
import he from "he";

function App() {
  const [flasCard, setFlasCard] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [category, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const json = await response.json();
        setCategories(json.trivia_categories);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  // const setLoadingToTrue = () => {
  //   setLoading(true);
  // };

  const setCards = (newCards) => {
    setLoading(false);
    setFlasCard(
      newCards.results.map((elem, i) => {
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
  };

  return (
    <>
      <div className="container">
        <Header />
        <Form
          category={category}
          loading={isLoading}
          setCards={setCards}
          setLoading={setLoading}
          // setLoadingToTrue={setLoadingToTrue}
        />
        <FlasCardList loading={isLoading} flascards={flasCard} />
      </div>
    </>
  );
}

export default App;
