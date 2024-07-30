

import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


import {Link } from 'react-router-dom';




const Navbar=(props)=>{
    let navigate =useNavigate();
    const handlelogout=()=>{
        localStorage.removeItem('token')
        navigate("/login")
        props.showalert(" Logout Successfully ","success")

    }

    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname)
      
    // }, [location]);
    
        return (
            <div>
                 {/* bg-body-tertiary */}
                 {/* navbar navbar-expand-lg bg-body-tertiary  */}
                 {/* style={{ color: 'white' } } */}
                 {/* navbar navbar-expand-lg bg-dark */}
                <nav className=" navbar navbar-expand-lg bg-secondary" >
                    <div className="container-fluid ">
                        <Link className="navbar-brand "  style={{ color: 'white' } } to="/">iNotebook</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname==="/"? "active":""} text-light`} style={{ color: 'grey' } } aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item"><Link className={`  text-light nav-link ${location.pathname==="/about"? "active":""}`} style={{ color: 'grey' } } to="/about">About</Link></li>
                             
                             
                            </ul>


                            {  !localStorage.getItem('token')?<form className="d-flex" role="search">
                        
                   
                         <Link className="btn btn-outline-light mx-2 btn-secondar" to="/login" role="button">Login</Link>
                         <Link className="btn btn-outline-light mx-2 btn-secondar" to="/signup" role="button">Sign-Up</Link>
                         
                     </form>:  <button onClick={handlelogout}  className='btn btn-light'>Log-out</button>}
                            
                        </div>
                    </div>
                </nav>
            </div>
        )
}

export default Navbar



































// import React from 'react'
// //rafce

// import {
//     BrowserRouter as Router,
//     Link
//   } from "react-router-dom";
// const Navbar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/">Navbar</Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className="nav-Link active" aria-current="page" to="/">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-Link mx-3 " to="/about">About</Link>
//                         </li>


//                     </ul>
//                     <form className="d-flex" role="search">
//                         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                         <button className="btn btn-outline-success" type="submit">Search</button>
//                     </form>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar