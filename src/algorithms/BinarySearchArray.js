import { useState, useEffect } from "react";
import Inputs from "../Inputs";
import useAlgorithmsModule from "../useAlgorithmsModule";
import Array from "../datastructures/Array";

export default function BinarySearch() {
  const [inputValue, setInputValue] = useState([
    2, 4, 9, 10, 20, 50, 100, 500, 600, 800, 1000, 9000,
  ]);
  const [textValue, setTextValue] = useState(inputValue.toString());
  const [targetValue, setTargetValue] = useState(1000);
  const [updateIndicesPtr, setUpdateIndiciesPtr] = useState(null);
  const [lowIndex, setLowIndex] = useState(undefined);
  const [highIndex, setHighIndex] = useState(undefined);
  const [midIndex, setMidIndex] = useState(undefined);
  const module = useAlgorithmsModule();

  function updateIndices(low, high, mid) {
    setLowIndex(low);
    setHighIndex(high);
    setMidIndex(mid);
  }

  useEffect(() => {
    // Create and set pointer to setInputValue function
    // TODO remove some of this defensive checking?
    if (module && module.addFunction && !updateIndicesPtr) {
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
    <section className="binary-search">
      <h2>Binary Search Array</h2>

      <Inputs
        setTextValue={setTextValue}
        setInputValue={setInputValue}
        textValue={textValue}
        setTarget={setTargetValue}
        targetValue={targetValue}
      />

      <Array
        input={inputValue}
        lowIndex={lowIndex}
        midIndex={midIndex}
        highIndex={highIndex}
      />

      <input
        type="submit"
        value="Run"
        onClick={() => {
          run();
        }}
      />
    </section>
  );
}
