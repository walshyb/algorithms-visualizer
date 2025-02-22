/**
 * @params {number[]} input
 * @params {number} [lowIndex]
 * @params {number} [midIndex]
 * @params {number} [highIndex]
 * @params {number} [selectedIndex]
 *
 */
export default function Array({
  input,
  lowIndex,
  midIndex,
  highIndex,
  selectedIndex,
}) {
  return (
    <ul className="array binary-search">
      {input.map((value, index) => {
        let className = "";
        if (index === lowIndex) className = "low";
        else if (index === highIndex) className = "high";
        else if (index === midIndex) className = "mid";
        else if (index === selectedIndex) className = "selected";

        return (
          <li key={value} className={className}>
            {value}
          </li>
        );
      })}
    </ul>
  );
}
