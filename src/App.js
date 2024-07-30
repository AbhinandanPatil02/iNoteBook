import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home'; // Import Home as a named import
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [alert, setalert] = useState(null)
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setalert(null);

    }, 1500);

  }
  return (
    <>
    <NoteState>
    
      <Router>
        <Navbar showalert={showalert} />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showalert={showalert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<Signup  showalert={showalert}/>} />
          <Route exact path="/login" element={<Login  showalert={showalert} />} />
        </Routes>
        </div>
      </Router>
      

      </NoteState>
    </>
  );
}

export default App;
