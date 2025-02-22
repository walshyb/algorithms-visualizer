/**
 * @params {number[]} input
 * @params {number} lowIndex
 * @params {number} midIndex
 * @params {number} highIndex
 *
 */
export default function Array({ input, lowIndex, midIndex, highIndex }) {
  return (
    <ul className="array binary-search">
      {input.map((value, index) => {
        let className = "";
        if (index === lowIndex) className = "low";
        else if (index === highIndex) className = "high";
        else if (index === midIndex) className = "mid";

        return (
          <li key={value} className={className}>
            {value}
          </li>
        );
      })}
    </ul>
  );
}
