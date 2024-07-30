express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');


var jwt = require('jsonwebtoken');

// creating the token for the user this should be created for database to not check the user password instead of this we provide the token that helps database to verify the user whether it is correct or not

const JWT_SECRET = 'abhiisgood$boy';

// ROUTE 1 : Create the user using : POST "/api/auth/createuser".No login required
router.post('/createuser', [
    //here in array we provide the validations 
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    let success=false;
    // if there are errors then return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // check whether the user with the same email exists already

    try {
        let user = await User.findOne({  email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "User with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            // password:req.body.password,
            password: secpass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);

        success=true
       
        res.json({success, authtoken });

        // res.json(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurred");
    }
});

//  ROUTE 2 : Authentication a user using : POST "/api/auth/login" no login required
router.post('/login', [
    //here in array we provide the validations 
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req); // Capture validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        // compare the password
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            success=false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
      
        success=true;
        res.json({success, authtoken });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


//  ROUTE 3: get logged in user details a user using : POST "/api/auth/getuser" no login required


router.post('/getuser',fetchuser, async (req, res) => {
try {

    userid=req.user.id;
    const user=await User.findById(userid).select("-password");
    res.send(user);
    
} catch (error) {
    console.error(error.message);
    // below .select is used to select all the details and the -password indicates the expext password select the remaing things
    res.status(500).send("Internal server error");
}
})

module.exports = router;









































// express=require('express');
// const User=require('../models/User');
// const router=express.Router();
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');

// var jwt = require('jsonwebtoken');


// // creating the tocken for the user this should be created for database to not check the user password instead of this we provide the tocken that helps data base to verifiy the user wheather it is correct or not

// const JWT_SECRET='abhiisgood$boy';





// // Create the user using : POST "/api/auth/createuser".No login requier 
// router.post('/createuser',[
//     //here in array we provides the validataions 
//     body('name','Enter a valid name').isLength({min:3}),
//     body('email','Enter a valid Email').isEmail(),
//     body('password','Password must be atleast 5 characters').isLength({min:5}),
   
// ], async   (req,res)=>{
//     // if there are errors then return bad request and the errors
//    const errors=validationResult(req);
//    if(!errors.isEmpty()){
//     return res.status(400).json({errors : errors.array()});
//    }
//     // check weather the user with the same email exist already


//     try{

    
//     let user= await User.findOne({email:req.body.email});
//     if(user){
//         return res.status(400).json({error:"User with this email already exists"})

//     }

//     const salt= await bcrypt.genSalt(10);
//     const secpass=await bcrypt.hash (req.body.password,salt  ) 
//     user= await  User.create({
//     name:req.body.name,
//     email:req.body.email,
//     // password:req.body.password,
//     password:secpass,

//    });



//    const data={
//     user:{
//         id:user.id
//     }
//    }


  
//    const authtoken=jwt.sign(data,JWT_SECRET);
//    res.json({authtoken});



// //    const jwtdata=jwt.sign(data,JWT_SECRET);
// //    console.log(jwtdata)


   
// //    .then(user=>res.json(user))
// //    .catch(err=>{console.log(err)
// //    res.json({error:'Please enter a unique value for email',message:err.message})})
//     res.json(user)




// } catch(error){
//     console.error(error.message);
//     res.status(500).send("some error occured");
// }

//  // above res.json(user) is written so no need to write below commented line

// //  res.send(req.body);


// // Authentication a user using : POST "/api/auth/login" no login required
// router.post('/login',[
//     //here in array we provides the validataions 

//     body('email','Enter a valid Email').isEmail(),
//     body('password','Password cannot be blank').exists(),
 
   
// ], async   (req,res)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors : errors.array()});
//        }


//     const {email,password}=req.body;
//     try {
//         let user=User.findOne({email});
//         if(!user){
//             return res.status(400).json({error:"Please try to login with correct crediantials"});
//         }
//         // compare the password
//         const passwordcompare=bcrypt.compare(password,user.password);
//         if(!passwordcompare){
//             return res.status(400).json({error:"Please try to login with correct crediantials"});

//         }

        
//    const data={
//     user:{
//         id:user.id
//     }
//    }


  
//    const authtoken=jwt.sign(data,JWT_SECRET);
//    res.json({authtoken});
        
//     }
//     catch(error){
//         console.error(error.message);
//         res.status(500).send("Internal server error");
//     }

// });





// })

// module.exports=router
