
import React from 'react'

import Notes from './Notes';
import Addnote from './Addnote';

export const Home = (props) => {
  const {showalert}=props

  return (
    <>
  
    <div>
    
     
      <Notes showalert={showalert}/>

    </div>
    </>
  )
}




