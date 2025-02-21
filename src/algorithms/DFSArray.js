import { useState, useEffect } from "react";
import Inputs from "../Inputs";
import "./BinarySearchArray.scss";
import { useAlgorithmsModule } from "../useAlgorithmsModule";

export default function DFSArray() {
  const [inputValue, setInputValue] = useState([
    [34, 72, 15, 89, 53],
    [22, 41, 67, 90, 12],
    [77, 83, 56, 31, 68],
    [95, 47, 23, 59, 14],
    [10, 64, 37, 81, 99],
  ]);
  const [targetValue, setTargetValue] = useState(50);
  const [updateIndicesPtr, setUpdateIndiciesPtr] = useState(null);
  const module = useAlgorithmsModule();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [seenIndicies, setSeenIndicies] = useState([]);

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

  useEffect(() => {
    // Create and set pointer to setInputValue function
    // TODO remove some of this defensive checking?
    if (module && module.addFunction && !updateIndicesPtr) {
      console.log("running");
      setUpdateIndiciesPtr(module.addFunction(setSelectedIndex, "viii"));
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
      <h2>DFS Array</h2>

      <Inputs
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        handleTargetChange={setTargetValue}
        targetValue={targetValue}
      />

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
