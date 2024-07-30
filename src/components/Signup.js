// import React from 'react'
import React,{useState} from 'react'
// import {useHistory} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const [credentails, setcredentails] = useState({ name:"" ,email:"",password:"",cpassword:""})
  let navigate =useNavigate();
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentails;
    
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({name,email,password}),
  
      
      });
      const json=await response.json()
      console.log(json)
      if(json.success){
        // Save the auth token and redirect
        localStorage.setItem('token',json.authtoken)
        navigate("/")
        props.showalert("Successfully account created ","success")

      }
      else {
        // alert("Invalid crediatails");
        props.showalert("Invalid Credentials ","danger")
      }



}

const onChange=(e)=>{
    //...credentails means whatever text in note is there is remain and [] means whatever in side this bracket can be add or overwrite
    setcredentails({...credentails,[e.target.name]:e.target.value})


}
  




  return (
    <div className='container'>
      <form onSubmit={handlesubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp"onChange={onChange} />
         
        </div>


        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp"onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

       

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="password"onChange={onChange} minLength={5}required />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name="cpassword"  className="form-control" id="cpassword"onChange={onChange} minLength={5}required />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup
