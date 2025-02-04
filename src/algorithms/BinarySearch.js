import { useState, useEffect } from "react";
import "./BinarySearch.scss";

export default function BinarySearch({ module }) {
  const [inputValue, setInputValue] = useState([
    2, 4, 9, 10, 20, 50, 100, 500, 600, 800, 1000, 9000,
  ]);
  const [targetValue, setTargetValue] = useState(50);
  const [lowIndexCallbackPtr, setLowIndexCallbackPtr] = useState(null);
  const [highIndexCallbackPtr, setHighIndexCallbackPtr] = useState(null);
  const [midIndexCallbackPtr, setMidIndexCallbackPtr] = useState(null);
  const [lowIndex, setLowIndex] = useState(undefined);
  const [highIndex, setHighIndex] = useState(undefined);
  const [midIndex, setMidIndex] = useState(undefined);

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
    if (module) {
      const lowPtr = module.addFunction(setLowIndex, "vi");
      setLowIndexCallbackPtr(lowPtr);
      console.log(lowPtr);

      const highPtr = module.addFunction(setHighIndex, "vi");
      setHighIndexCallbackPtr(highPtr);

      const midPtr = module.addFunction(setMidIndex, "vi");
      setMidIndexCallbackPtr(midPtr);
    }
  }, [module]); // Run once when the component mounts

  // On 'run' click, call binary search
  const run = () => {
    if (module) {
      // Allocate space for the array. 4 is the size, in bytes, of an integer
      const inputPtr = window._malloc(4 * inputValue.length);
      module.HEAP32.set(inputValue, inputPtr / 4);

      module._binary_search(
        targetValue,
        inputPtr,
        inputValue.length,
        lowIndexCallbackPtr,
        highIndexCallbackPtr,
        midIndexCallbackPtr,
      );
      module._free(inputPtr);
    }
  };

  return (
    <div className="binary-search">
      <h2>Binary Search Array</h2>

      <label htmlFor="input">Input: </label>
      <input
        type="text"
        name="input"
        value={inputValue}
        onChange={handleInputChange}
      />

      <br />
      <label htmlFor="target">Target: </label>
      <input
        type="text"
        name="target"
        value={targetValue}
        onChange={(e) => setTargetValue(e.target.value)}
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
