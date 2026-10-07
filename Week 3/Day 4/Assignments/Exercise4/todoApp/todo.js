export class TodoList {

    constructor(){
        this.tasks = [];
    }
    addTask(task){
        this.tasks.push({ tasks,completed:false});//{ task: "Study Node.js", completed: false },
    }
    TaskAsComplete(index) {
    if (this.tasks[index]) {
      this.tasks[index].completed = true;
    }
  }
   listAllTasks() {
    console.log("My Tasks:");
    this.tasks.forEach((item, index) => {
      let status = item.completed ? "[Done]" : "[ ]";
      console.log(`${index + 1}. ${status} ${item.task}`);
    });
  }

}

