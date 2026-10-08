import express from 'express';
const app = express();

app.use(Server.json());
const PORT = 5000;




app.get('/api/hello', (req, res) =>{
    res.send('Hello From Express');
});
app.post("/api/world", (req, res) =>{
    const post = req.body.post;
    res.send('I received your POST request. This is what you sent me: ${post}');

});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






