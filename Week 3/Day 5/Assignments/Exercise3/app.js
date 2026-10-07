const express = require('express');
const app = express();
const PORT = 5000;
const {fetchPosts} = require('./data/dataService');


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});
app.get('/api/posts', async (req, res) => {
try{
    const posts = await fetchPosts();
    console.log('Data successfully retrieved and sent as a response.');
    res.json(posts);
}catch{
res.status(500).json({ message: 'Error retrieving posts' });    
}
});