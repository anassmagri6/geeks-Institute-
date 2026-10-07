const express = require('express');
const router = require('./routes/todos');
const app = express();
const PORT =  3000;
    

app.use(express.json());

app.use('/todos', router);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});



