import { useState, useEffect } from "react";
import createModule from "./algorithms.js"; // Ensure correct path

export default function useAlgorithmsModule() {
  const [module, setModule] = useState(null);

  useEffect(() => {
    async function loadWasm() {
      try {
        const instance = await createModule(); // Initialize Wasm module
        window.module = instance;
        setModule(instance);
        console.log("Wasm module loaded:", instance);
      } catch (error) {
        console.error("Error loading Wasm module:", error);
      }
    }

    loadWasm();
  }, []); // Run once when the component mounts

  return module;
}
