import { TodoList } from './todo.js';

const myTodo = new TodoList();

myTodo.addTask("Study Node.js");//Study Node.js       → true
myTodo.addTask("Do Homework");
myTodo.addTask("Practice coding");

myTodo.TaskAsComplete(0);//index 0 → Study Node.js
myTodo.TaskAsComplete(2);

myTodo.listAllTasks();
