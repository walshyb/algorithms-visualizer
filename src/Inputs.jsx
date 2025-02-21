import "./Inputs.scss";

export default function Inputs({
  handleInputChange,
  handleTargetChange,
  inputValue,
  targetValue,
  targetNotFound,
}) {
  const targetClass = targetNotFound ? "not-found" : "";

  return (
    <div className="inputs">
      <div className="input">
        <label htmlFor="input">Input: </label>
        <input
          type="text"
          name="input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="target">
        <label htmlFor="target">Target: </label>
        <input
          type="text"
          name="target"
          value={targetValue}
          className={targetClass}
          onChange={(e) => handleTargetChange(e.target.value)}
        />
      </div>
    </div>
  );
}
