import "./App.scss";
import BinarySearchArray from "./algorithms/BinarySearchArray";
import TreeSearch from "./algorithms/TreeSearch";
import DFSArray from "./algorithms/DFSArray";

function App() {
  return (
    <main>
      <p>
        Welcome to my algorithm visualizer! This is a small project I am
        creating to get some more hands on practice with C++ datastructures and
        Wasm modules.
      </p>

      <p>
        This is still a work in progress, but feel free to view{" "}
        <a
          href="https://github.com/walshyb/algorithms-visualizer?tab=readme-ov-file#roadmap"
          target="_blank"
          rel="noopener"
        >
          the roadmap
        </a>
        ,{" "}
        <a
          href="https://github.com/walshyb/algorithms-visualizer/issues"
          target="_blank"
          rel="noopener"
        >
          create an issue
        </a>{" "}
        if you notice anything weird, or check out some of{" "}
        <a href="https://bwal.sh" target="_blank" rel="noopener">
          my other projects
        </a>
      </p>

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

      {module && (
        <DFSArray
          strategy="Breadth First"
          input={[5, 3, 6, 2, 4, null, null, 1]}
          target={1}
        />
      )}
    </main>
  );
}

export default App;
