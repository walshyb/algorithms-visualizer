import Array from "./Array";

/**
 * @params {number} rowIndex
 * @params {number} colIndex
 * @params {number[][]} input
 * @params {number} [lowIndex]
 * @params {number} [midIndex]
 * @params {number} [highIndex]
 * @params {number} [selectedIndex]
 *
 */
export default function Array2D({ rowIndex, colIndex, input, selectedIndex }) {
  return (
    <div className="array2d">
      {input.map((array) => (
        <Array input={array} />
      ))}
    </div>
  );
}
