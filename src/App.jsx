import "./App.scss";
import BinarySearchArray from "./algorithms/BinarySearchArray";
import BinarySearchTree from "./algorithms/BinarySearchTree";
import React, { useState, useEffect } from "react";

function App() {
  const [module, setModule] = useState(null);

  useEffect(() => {
    if (window.Module) {
      setModule(window.Module);
    }
  }, []); // Run once when the component mounts

  return (
    <main>
      {module && <BinarySearchArray module={module} />}
      {module && <BinarySearchTree module={module} />}
    </main>
  );
}

export default App;
