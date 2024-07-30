import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

// This syntax you have to write in the same fassion as it is whenever you use context API

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []
  const [notes, setNotes] = useState(notesinitial)

    //get all note
    const getnotes = async() => {
     
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
  
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem('token')
          "auth-token": localStorage.getItem('token')
        },
      });
      // const json = response.json();
      const json=await response.json();
      // console.log(json);
      setNotes(json)
    }

  //Add a note
  const addnote = async(title, description, tag) => {
    //To do API call
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({title,description,tag}),
    });

    const note=await response.json();
    setNotes(notes.concat(note))
    // const json = response.json();
    // console.log("adding a new note")
    // const note = json
   
    // setNotes(notes.concat(note))

  }

  //Delete a note
  const deletenote = async(id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      // body: JSON.stringify({title,description,tag}),
    });
    // const json = response.json();
    // console.log(json)




    // console.log("Dleting the note with id " + id)
    const newnote = notes.filter((note) => { return note._id !== id })



    setNotes(newnote)
  }

  


const editnote = async (id, title, description, tag) => {
  // API call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT", // Assuming your API endpoint for updating notes is using the PUT method

    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },

    body: JSON.stringify({ title, description, tag }),
  });


  const json=await response.json();
  console.log(json)
  // const updatedNote = await response.json();
  console.log(json)

  let newnotes=JSON.parse(JSON.stringify(notes))
  

  for (let index = 0; index < newnotes.length; index++) {
    const element = newnotes[index];
    if(element._id===id){
      newnotes[index].title=title;
      newnotes[index].description=description;
      newnotes[index].tag=tag;
      break;
    }
    
  }
  setNotes(newnotes);

}

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote,getnotes }}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState;




















//edit a note
  // const editnote = async (id, title, description, tag) => {
  //   // API call
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: "PUT",

  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem('token')

  //     },

  //     body: JSON.stringify({title,description,tag}),
  //   });
  //   const json = response.json();





  //   //Logic to edit in the client
  //   for (let index = 0; index < notes.length; index++) {
  //     const element = notes[index];
  //     if (element._id === id) {
  //       element.title = title;
  //       element.description = description;
  //       element.tag = tag;
  //     }
  //   }

  // }
  //edit a note