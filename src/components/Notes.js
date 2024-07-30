
import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import {useNavigate} from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate =useNavigate();
  // destructuring of  notes
  const { notes, getnotes , editnote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes()
    }
    else{
      navigate("/login");
      // <navigate to="/login" replace />
    }
  }, [])


  
  
  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setNote] = useState({ id:"",   etitle:"",edescription:"",etag:""})
  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,  etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    
  }

  const handleclick=(e)=>{
    // console.log("Updating the note" , note)
    editnote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click();
    ;props.showalert("updated Successfully","Success")
    // addnote(note.title,note.description,note.tag);

}
const onChange=(e)=>{
    //...note means whatever text in note is there is remain and [] means whatever in side this bracket can be add or overwrite
    setNote({...note,[e.target.name]:e.target.value})


}


  return (
    <>
      <Addnote showalert={props.showalert} />


      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" value={note.etitle}  onChange={onChange} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"  minLength={5} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" value={note.edescription} onChange={onChange} className="form-control" id="edescription" name="edescription" minLength={5}  required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" onChange={onChange} className="form-control" value={note.etag} id="etag" name="etag" />
                </div>

               
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleclick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {/* <div className="container"> */}
        {notes.length===0 && 'No notes to display'}
        {notes.map((note) => {
          return <Noteitem key={note._id} showalert={props.showalert} updatenote={updatenote} note={note} />;
          
        })}
         {/* </div> */}

      </div>
    </>
  )
}

export default Notes
