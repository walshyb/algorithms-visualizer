import { useState, useEffect } from "react";
import TreeFromArray from "../datastructures/Tree";
import Inputs from "../Inputs";
import "./BinarySearchTree.scss";

export default function BinarySearchTree({ module }) {
  const [inputValue, setInputValue] = useState([
    8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15,
  ]);
  const [targetValue, setTargetValue] = useState(14);

  const handleInputChange = (inputEvent) => {
    const newInput = inputEvent.target.value.split(", ");

    newInput.forEach((value, index, array) => {
      array[index] = parseInt(value);
    });

    setInputValue(newInput);
  };

  return (
    <div>
      <h2>Binary Search Tree</h2>
      <Inputs
        handleInputChange={setInputValue}
        inputValue={inputValue}
        handleTargetChange={setTargetValue}
        targetValue={targetValue}
      />

      <TreeFromArray array={inputValue} />
    </div>
  );
}
