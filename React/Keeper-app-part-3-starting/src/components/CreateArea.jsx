import React, { useState } from "react";

function CreateArea(props) {
  //const [headingNote, setHeadingNote] = useState("")
  const [inputNote, setInputNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;

    setInputNote((prevValue) => {
      if (inputName === "title") {
        return {
          title: newValue,
          content: prevValue.content,
        };
      } else if (inputName === "content") {
        return {
          title: prevValue.title,
          content: newValue,
        };
      }
    });
  }

  function handleClick(event) {
    props.onAdd(inputNote);
    setInputNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }
  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={inputNote.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={inputNote.content}
        />
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
