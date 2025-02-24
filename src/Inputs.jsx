import "./Inputs.scss";

export default function Inputs({
  textValue,
  setTextValue,
  setInputValue,
  targetValue,
  targetNotFound,
  setTarget,
}) {
  const targetClass = targetNotFound ? "not-found" : "";

  const handleTextValueChange = (event) => {
    const textValue = event.target.value;

    setTextValue(textValue);

    // Loop through input and if it's valid,
    // update the value corresponding to the datastructure render

    const newInput = textValue.trim().replace(/,$/, "").split(",");
    let valid = true;

    for (const [index, value] of newInput.entries()) {
      const parsedVal = parseInt(value);

      // TODO: indicate input is invalid
      if (isNaN(parsedVal)) {
        valid = false;
        break;
      }

      newInput[index] = parseInt(value);
    }

    if (valid) setInputValue(newInput);
  };

  return (
    <div className="inputs">
      <div className="input">
        <label htmlFor="input">Input: </label>
        <input
          type="text"
          name="input"
          value={textValue}
          onChange={handleTextValueChange}
        />
      </div>

      <div className="target">
        <label htmlFor="target">Target: </label>
        <input
          type="text"
          name="target"
          value={targetValue}
          className={targetClass}
          onChange={(e) => setTarget(e.target.value)}
        />
      </div>
    </div>
  );
}
