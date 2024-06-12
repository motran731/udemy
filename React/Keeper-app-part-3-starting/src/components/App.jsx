import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(inputNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, inputNote];
    });
    //setInputText("");
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((addNotes, index) => (
        <Note key={1} title="Note title" content="Note content" />
      ))}

      <Footer />
    </div>
  );
}

export default App;
