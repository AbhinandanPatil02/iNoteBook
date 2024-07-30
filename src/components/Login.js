import React,{useState} from 'react'
// import {useHistory} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentails, setcredentails] = useState({email:"",password:""})
    let navigate =useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({email:credentails.email,password:credentails.password}),
      
          
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken)
            props.showalert("Successfully Logged-in ","success")
            navigate("/")

        }
          else {
            props.showalert("Invalid Credentials ","danger")
          }



    }

    const onChange=(e)=>{
        //...credentails means whatever text in note is there is remain and [] means whatever in side this bracket can be add or overwrite
        setcredentails({...credentails,[e.target.name]:e.target.value})
    
    
    }
    return (
           <div className='mt-3'>
            <h2>Login to continue</h2>
            <form  onSubmit={handlesubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email"  onChange={onChange} value={credentails.email} className="form-control" name="email" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credentails.password} name="password" className="form-control" id="password" />
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Import CSS file for styling

// const Login = (props) => {
//     const [credentials, setCredentials] = useState({ email: "", password: "" });
//     let navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch("http://localhost:5000/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: credentials.email, password: credentials.password }),
//         });
//         const json = await response.json();
//         console.log(json);
//         if (json.success) {
//             // Save the auth token and redirect
//             localStorage.setItem('token', json.authtoken);
//             props.showalert("Successfully Logged-in ", "success");
//             navigate("/");
//         } else {
//             props.showalert("Invalid Credentials ", "danger");
//         }
//     };

//     const onChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="login-container">
//             <div className="login-card">
//                 <h2>Login to continue</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email address</label>
//                         <input type="email" onChange={onChange} value={credentials.email} className="form-control" name="email" id="email" aria-describedby="emailHelp" />
//                         <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input type="password" onChange={onChange} value={credentials.password} name="password" className="form-control" id="password" />
//                     </div>
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;
