import "./App.scss";
import BinarySearchArray from "./algorithms/BinarySearchArray";
import BinarySearchTree from "./algorithms/BinarySearchTree";
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
      {module && <BinarySearchTree module={module} />}
    </main>
  );
}

export default App;
