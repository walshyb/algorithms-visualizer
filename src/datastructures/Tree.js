import "./Tree.scss";

// TODO don't need anymore?
export default function TreeFromArray({ array, selectedIndex }) {
  const data = createBinaryTreeFromArray(array);

  return Tree({ data: [data], selectedIndex });
}

export function Tree({ data, selectedIndex }) {
  return (
    <ul className="tree">
      {data.map((node) => (
        <TreeNode key={node.index} node={node} selectedIndex={selectedIndex} />
      ))}
    </ul>
  );
}

function TreeNode({ node, selectedIndex }) {
  const className = node.index == selectedIndex ? "selected" : "";

  return (
    <li>
      {node.value !== null && (
        <>
          <span className={className}>{node.value}</span>
          {node.children && (
            <Tree data={node.children} selectedIndex={selectedIndex} />
          )}
        </>
      )}
    </li>
  );
}

/**
 * Creates a binary tree from a number array
 *
 * Does not validate, nor account for nulls. Inserts via breadth-first-search
 *
 * @returns an object of structure:
 * {
 *   index: number,
 *   value: number,
 *   children: number[],
 * }
 */
function createBinaryTreeFromArray(array) {
  let data = {};

  array.forEach((value, index) => {
    if (!data.children) {
      data = {
        index,
        value,
        children: [],
      };

      return;
    }

    // bfs
    let stack = [data];
    while (stack.length) {
      let currentChild = stack.shift();

      if (currentChild.children.length < 2) {
        currentChild.children.push({
          index,
          value,
          children: [],
        });
        return;
      }

      currentChild.children.forEach((child) => {
        stack.push(child);
      });
    }
  });

  return data;
}
