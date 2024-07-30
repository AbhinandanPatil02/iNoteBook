// const connecttomongo=require('./db');

// connecttomongo();

const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000



app.use(cors())



// THIS IS KNOWN AS MIDDLE-WERE

//  remeber below lines 
// if we want to access the json file request (by passing the request in thunderboalt )in the console then we have to write the following syntax and in thunderboalt we have to create the header file named as {{{{content-Type  application/json }}}}
app.use(express.json())







//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


// app.use('/api/notes', require('./routes/notes'));



app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`)
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})


connectToMongo();




