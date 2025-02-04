import "./Tree.scss";

export default function TreeFromArray({ array }) {
  const data = createBinaryTreeFromArray(array);

  return Tree({ data: [data] });
}

function Tree({ data }) {
  return (
    <ul className="tree">
      {data.map((node) => (
        <TreeNode key={node.index} node={node} />
      ))}
    </ul>
  );
}

function TreeNode({ node }) {
  return (
    <li>
      <span>{node.value}</span>
      {node.children && <Tree data={node.children} />}
    </li>
  );
}

function createGenericTreeFromArray(array) {
  const data = {};
  const currentChildren = {};

  array.forEach((value, index) => {
    if (!value) return; // allow nulls

    const level = index;
  });
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
