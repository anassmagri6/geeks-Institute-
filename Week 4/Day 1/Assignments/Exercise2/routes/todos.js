const express = require('express');
const router = express.Router();
const todos = [];

router.get('/', (req, res) => {        //get
    res.json(todos);
});

router.post('/', (req, res) => {         //add
const { title } = req.body;
const newTodo = {
    id : todos.length + 1,
    title,
    completed: false
};
newTodo.push(todos);
res.status(201).json(todos);
});

router.push('/', (req, res) => {       //update
const { id } = req.params;
const { title, completed } = req.body;
const todo = todos.find(function(p){
    p.id===parseInt(id);
});
if(!todo){
    return res.status(404).json({message:"Todo not found"});
}
if (title!==undefined) todo.title=title;
if (completed!==undefined) todo.completed=completed;
res.json(todos);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
todos=todos.filter(function(p){
    p.id!==parseInt(id);
    res.json({message:"Todo deleted"});
});
});                                              //Delete 
module.exports = router;











