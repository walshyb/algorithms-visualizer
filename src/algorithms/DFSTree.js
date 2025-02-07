import { useState, useEffect } from "react";
import TreeFromArray from "../datastructures/Tree";
import Inputs from "../Inputs";
import { cppifyArray } from "../utils";
import "./BinarySearchTree.scss";

export default function DFSTree({ module }) {
  const [inputValue, setInputValue] = useState([5, 3, 6, 2, 4, null, null, 1]);
  const [targetValue, setTargetValue] = useState(14);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(-1);
  const [updateSelectedNodeCallbackPtr, setUpdateSelectedNodeCallbackPtr] =
    useState(null);
  const [updateSearchResultPtr, setUpdateSearchResultPtr] = useState(null);
  const [searchResult, setSearchResult] = useState(-1);

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
      setUpdateSelectedNodeCallbackPtr(
        module.addFunction(setSelectedNodeIndex, "vi"),
      );
      setUpdateSearchResultPtr(module.addFunction(setSearchResult, "vi"));
    }
  }, [module]); // Run once when the component mounts

  // On 'run' click, call binary search
  const run = async () => {
    if (module) {
      // Allocate space for the array. 4 is the size, in bytes, of an integer
      const validArray = cppifyArray(inputValue);
      const inputPtr = await module._malloc(4 * validArray.length);
      await module.HEAP32.set(validArray, inputPtr / 4);

      await module._depth_first_search_tree(
        targetValue,
        inputPtr,
        validArray.length,
        updateSelectedNodeCallbackPtr,
        updateSearchResultPtr,
      );
    }
  };

  return (
    <div>
      <h2>Depth First Search</h2>
      <Inputs
        handleInputChange={setInputValue}
        inputValue={inputValue}
        handleTargetChange={setTargetValue}
        targetValue={targetValue}
        targetNotFound={searchResult === 0}
      />

      <TreeFromArray array={inputValue} selectedIndex={selectedNodeIndex} />

      <input type="submit" value="Run" onClick={run} />
    </div>
  );
}
