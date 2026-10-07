const express = require('express')
const app = express();
const router =express.Router()
const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/about',(req,res)=>{
    res.send('About Page')
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});


module.exports = router;


