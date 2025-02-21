import { useState, useEffect } from "react";
import Inputs from "../Inputs";
import "./BinarySearchArray.scss";
import useAlgorithmsModule from "../useAlgorithmsModule";

export default function BinarySearch() {
  const [inputValue, setInputValue] = useState([
    2, 4, 9, 10, 20, 50, 100, 500, 600, 800, 1000, 9000,
  ]);
  const [targetValue, setTargetValue] = useState(50);
  const [updateIndicesPtr, setUpdateIndiciesPtr] = useState(null);
  const [lowIndex, setLowIndex] = useState(undefined);
  const [highIndex, setHighIndex] = useState(undefined);
  const [midIndex, setMidIndex] = useState(undefined);
  const module = useAlgorithmsModule();

  /**
   * Update input on change event
   */
  const handleInputChange = (inputEvent) => {
    const newInput = inputEvent.target.value.split(", ");
    newInput.forEach((value, index, array) => {
      array[index] = parseInt(value);
    });
    setInputValue(newInput);
  };

  function updateIndices(low, high, mid) {
    setLowIndex(low);
    setHighIndex(high);
    setMidIndex(mid);
  }

  useEffect(() => {
    // Create and set pointer to setInputValue function
    // TODO remove some of this defensive checking?
    if (module && module.addFunction && !updateIndicesPtr) {
      console.log("running");
      setUpdateIndiciesPtr(module.addFunction(updateIndices, "viii"));
    }
  }, [module]); // Run once when the component mounts

  // On 'run' click, call binary search
  const run = async () => {
    if (module && updateIndicesPtr) {
      // Allocate space for the array. 4 is the size, in bytes, of an integer
      const inputPtr = await module._malloc(4 * inputValue.length);
      await module.HEAP32.set(inputValue, inputPtr / 4);
      console.log(inputPtr);

      await module._binary_search_array(
        targetValue,
        inputPtr,
        inputValue.length,
        updateIndicesPtr,
      );
    }
  };

  return (
    <div className="binary-search">
      <h2>Binary Search Array</h2>

      <Inputs
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        handleTargetChange={setTargetValue}
        targetValue={targetValue}
      />

      <ul className="array binary-search">
        {inputValue.map((value, index) => {
          let className = "";
          if (index === lowIndex) className = "low";
          else if (index === highIndex) className = "high";
          else if (index === midIndex) className = "mid";

          return (
            <li key={value} className={className}>
              {value}
            </li>
          );
        })}
      </ul>

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
