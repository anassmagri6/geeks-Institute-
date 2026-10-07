const express = require('express');
const app = express();

app.use(express.json());

const data = [
    { id: 1, title: 'hello', content: 'this is a test' },
    { id: 2, title: 'world', content: 'this my test' },
    { id: 3, title: 'nice', content: 'we are here' }
];

app.get('/posts', (req, res) => {
    res.json(data);
});

app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = data.find(function(p) {
        return p.id === id;
    });

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
});
app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    const newPost = {
        id: data.length + 1,
        title: title,
        content: content
    };
    data.push(newPost);

    res.status(201).json(newPost);
});
app.put('/posts/:id', (req, res) =>{
   const id = parseInt(req.params.id);
   const {title, content} = req.body;

   const put = data.find(function(p){
    p.id===id;
   });

   if (!data){
    return res.status(404).json({ message: 'Post not found' });
   }

put.title = title || put.title;
put.content = content || put.content;

res.json(post);
});

app.delete('/posts/:id', (req, res) =>{
    const id = parseInt(req,params,id)
    const postIndex = data.findIndex(function(p){
        p.id===id
    });

    if (postIndex===-1){
     return res.status(404).json({ message: 'Post not found' });
    }

    data.splice(postIndex,1);
    res.status(200).json({ message: 'Post deleted successfully' });
});


app.use((req, res, next) => {
res.status(404).json({ message: 'Invalid route / Route not found' });    
});

app.use((err, req, res, next) =>{
    console.error(err,stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
