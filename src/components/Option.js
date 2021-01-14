import React from "react";

export default function Option({ category }) {
  return (
    <option value={category.id}>
      {category.name}
    </option>
  );
}
