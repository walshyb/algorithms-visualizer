import { useState, useEffect } from "react";
import TreeFromArray from "../datastructures/Tree";
import Inputs from "../Inputs";
import { cppifyArray } from "../utils";
import useAlgorithmsModule from "../useAlgorithmsModule";

export default function TreeSearch({ strategy, input, target }) {
  const [inputValue, setInputValue] = useState(
    input || [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15],
  );
  const [textValue, setTextValue] = useState(inputValue.toString());
  const [targetValue, setTargetValue] = useState(target || 14);

  // Node highlighting-related state items
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(-1);
  const [updateSelectedNodeCallbackPtr, setUpdateSelectedNodeCallbackPtr] =
    useState(null);
  const [updateSearchResultPtr, setUpdateSearchResultPtr] = useState(null);

  // -1 is initial, 0 is not found, 1 is found
  const [searchResult, setSearchResult] = useState(-1);
  const module = useAlgorithmsModule();

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
      const strategyAlgorithmMap = {
        Binary: module._binary_search_tree,
        "Breadth First": module._breadth_first_search_tree,
        "Depth First": module._depth_first_search_tree,
      };

      // Allocate space for the array. 4 is the size, in bytes, of an integer
      const validArray = cppifyArray(inputValue);
      const inputPtr = await module._malloc(4 * validArray.length);
      await module.HEAP32.set(validArray, inputPtr / 4);

      await strategyAlgorithmMap[strategy](
        targetValue,
        inputPtr,
        validArray.length,
        updateSelectedNodeCallbackPtr,
        updateSearchResultPtr,
      );
    }
  };

  return (
    <section>
      <h2>{strategy} Search</h2>
      <Inputs
        setTextValue={setTextValue}
        setInputValue={setInputValue}
        textValue={textValue}
        setTarget={setTargetValue}
        targetValue={targetValue}
        targetNotFound={searchResult === 0}
      />

      <TreeFromArray array={inputValue} selectedIndex={selectedNodeIndex} />

      <input type="submit" value="Run" onClick={run} />
    </section>
  );
}
