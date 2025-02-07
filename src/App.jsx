import "./App.scss";
import BinarySearchArray from "./algorithms/BinarySearchArray";
import TreeSearch from "./algorithms/TreeSearch";
import React, { useState, useEffect } from "react";
import createModule from "./algorithms.js"; // Ensure correct path

function App() {
  const [module, setModule] = useState(null);

  useEffect(() => {
    async function loadWasm() {
      try {
        const instance = await createModule(); // Initialize Wasm module
        setModule(instance);
        console.log("Wasm module loaded:", instance);
      } catch (error) {
        console.error("Error loading Wasm module:", error);
      }
    }

    loadWasm();
  }, []); // Run once when the component mounts

  return (
    <main>
      {module && <BinarySearchArray module={module} />}
      {module && <TreeSearch module={module} strategy="Binary" target={3} />}
      {module && (
        <TreeSearch
          module={module}
          strategy="Depth First"
          input={[1, 2, 5, 6, 3, 7, 9, 4, 8]}
          target={9}
        />
      )}
      {module && (
        <TreeSearch
          module={module}
          strategy="Breadth First"
          input={[5, 3, 6, 2, 4, null, null, 1]}
          target={1}
        />
      )}
    </main>
  );
}

export default App;
