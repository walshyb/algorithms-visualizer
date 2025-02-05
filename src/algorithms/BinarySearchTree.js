import { useState, useEffect } from "react";
import TreeFromArray from "../datastructures/Tree";
import Inputs from "../Inputs";
import "./BinarySearchTree.scss";

export default function BinarySearchTree({ module }) {
  const [inputValue, setInputValue] = useState([
    8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15,
  ]);
  const [targetValue, setTargetValue] = useState(14);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(-1);
  const [callbackPtr, setCallbackPtr] = useState(null);

  // TODO actually allow change and validate
  const handleInputChange = (inputEvent) => {
    const newInput = inputEvent.target.value.split(", ");

    newInput.forEach((value, index, array) => {
      array[index] = parseInt(value);
    });

    setInputValue(newInput);
  };

  useEffect(() => {
    // Create and set pointer to setInputValue function
    if (module) {
      // TODO: use ccall
      setCallbackPtr(module.addFunction(setSelectedNodeIndex, "vi"));
    }
  }, [module]); // Run once when the component mounts

  // On 'run' click, call binary search
  const run = async () => {
    if (module) {
      // Allocate space for the array. 4 is the size, in bytes, of an integer
      const inputPtr = await module._malloc(4 * inputValue.length);
      await module.HEAP32.set(inputValue, inputPtr / 4);

      await module._binary_search_tree(
        targetValue,
        inputPtr,
        inputValue.length,
        callbackPtr,
      );
    }
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

      <TreeFromArray array={inputValue} selectedIndex={selectedNodeIndex} />

      <input
        type="submit"
        value="Run"
        onClick={() => {
          run();
        }}
      />
    </div>
  );
}
