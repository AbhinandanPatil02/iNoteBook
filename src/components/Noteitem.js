// import React from 'react'
import React, { useContext } from 'react'
import  noteContext  from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deletenote}=context;
    const { note ,updatenote} = props;
    return (
        <div className='col-md-3'>
            {/* {note.title};
            {note.description} */}
            <div className="card my-3" >

                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* delete icon */}
                    <i className="fa-solid fa-trash-can mx-2 " onClick={()=>{deletenote(note._id);props.showalert("deleted Successfully","Success")}}></i>


                    
                    {/* edit icon */}
                    {/* if modal is not working then yous following syntax and pass it as an arguments */}
                    {/* data-bs-toggle="modal" data-bs-target="#exampleModal" */}
                    <i className="fa-solid fa-file-pen mx-2"   onClick={()=>{updatenote(note)}}></i>
                </div>
            </div>

        </div>
    )
}

export default Noteitem
