import React, { useState } from "react";

function Test() {
  const [checkedItems, setCheckedItems] = useState({});

  const checkboxData = [
    { id: "option1", label: "Option 1" },
    { id: "option2", label: "Option 2" },
    { id: "option3", label: "Option 3" },
    { id: "option4", label: "Option 4" },
  ];

  const handleChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const checkCheckedCheckboxes = () => {
    const checked = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    console.log("Checked checkboxes:", checked);
  };

  return (
    <div>
      <form>
        {checkboxData.map((checkbox) => (
          <label key={checkbox.id}>
            <input
              type="checkbox"
              id={checkbox.id}
              checked={checkedItems[checkbox.id] || false}
              onChange={handleChange}
            />
            {checkbox.label}
          </label>
        ))}
      </form>
      <button onClick={checkCheckedCheckboxes}>Check Checked Checkboxes</button>
    </div>
  );
}

export default Test;
