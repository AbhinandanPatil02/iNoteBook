import React, { useState,useContext } from 'react'
// import React, { useContext } from 'react'
import  noteContext  from '../context/notes/noteContext';
const Addnote = (props) => {
    const context = useContext(noteContext);
    // destructuring of  notes
  
    const {addnote} = context;


    const [note, setNote] = useState({title:"",description:"",tag:""})
    // const handleclick=(e)=>{
    //     e.preventDefault();
    //     addnote(note.title,note.description,note.tag);
    //     setNote({title:"",description:"",tag:""})

    // }
    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" }); 
        document.getElementById("tag").value = "";
        props.showalert("Added Successfully","Success")
      };
      
    const onChange=(e)=>{
        //...note means whatever text in note is there is remain and [] means whatever in side this bracket can be add or overwrite
        setNote({...note,[e.target.name]:e.target.value})


    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={note.title}  onChange={onChange} className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={note.description} onChange={onChange} className="form-control" id="description" name="description"  minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" value={note.tag} className="form-label">Tag</label>
                        <input type="text" onChange={onChange} className="form-control" id="tag" name="tag" minLength={5} required />
                    </div>
                  
                    <button  disabled={note.title.length<5||note.description.length<5} type="submit"  onClick={handleclick} className="btn btn-primary">Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default Addnote
