import "./App.scss";
import BinarySearchArray from "./algorithms/BinarySearchArray";
import TreeSearch from "./algorithms/TreeSearch";

function App() {
  return (
    <main>
      {module && <BinarySearchArray />}
      {module && <TreeSearch strategy="Binary" target={3} />}
      {module && (
        <TreeSearch
          strategy="Depth First"
          input={[1, 2, 5, 6, 3, 7, 9, 4, 8]}
          target={9}
        />
      )}
      {module && (
        <TreeSearch
          strategy="Breadth First"
          input={[5, 3, 6, 2, 4, null, null, 1]}
          target={1}
        />
      )}
    </main>
  );
}

export default App;
