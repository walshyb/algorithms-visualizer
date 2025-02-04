import "./App.scss";
import BinarySearch from "./algorithms/BinarySearch";
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
      <BinarySearch module={module} />
    </main>
  );
}

export default App;
