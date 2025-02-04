export default function Inputs({
  handleInputChange,
  handleTargetChange,
  inputValue,
  targetValue,
}) {
  return (
    <div>
      <label htmlFor="input">Input: </label>
      <input
        type="text"
        name="input"
        value={inputValue}
        onChange={handleInputChange}
      />

      <br />
      <label htmlFor="target">Target: </label>
      <input
        type="text"
        name="target"
        value={targetValue}
        onChange={(e) => handleTargetChange(e.target.value)}
      />
    </div>
  );
}
