import React, { useRef } from "react";
import Option from "./Option";

export default function Form({ category, setCards, loading, setLoading }) {
  const categoryRef = useRef();
  const amountRef = useRef();
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=" + amount + "&category=" + category
      );
      const json = await response.json();
      setCards(json);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryRef}>
            {category.map((category) => {
              return (
                <Option
                  key={category.id}
                  category={category}
                />
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
        <div className="btn">
          <button disabled={loading}>Generate</button>
        </div>
      </form>
      {loading && <h3 className="loading-data">Loading questions...</h3>}
    </div>
  );
}
