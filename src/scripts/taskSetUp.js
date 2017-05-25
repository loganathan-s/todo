import Task from "./taskModel";

class TaskSetUp{
 
  constructor(){
    this.taskContent = document.querySelector("#taskDescription");
    this.createTaskButton = document.querySelector("#createTask");
    this.parentElement =  document.querySelector("#todoPanel");
  }

  //
  //Attach EventListener to elements
  //
  init(){
    this.taskContent.addEventListener("keyup", this.toggleCreateTaskButton.bind(this));
    this.createTaskButton.addEventListener("click", this.createTask.bind(this));
    this.displayAllTasks();
  }

  //
  // Display All tasks when user loads the page
  //
   displayAllTasks(){
     let task = new Task();
     task.index();
   }

  //
  // Enable/Disable the Create Task button based on user inputs
  // 
  toggleCreateTaskButton(){
    this.createTaskButton.classList.remove("disableClick");
    if (this.taskContent.value){
      this.createTaskButton.removeAttribute("disabled");
    }else{
      this.createTaskButton.setAttribute("disabled", "true");
    }
  }

  //
  // Create Task using the api
  //
  createTask(){
     const task = new Task();
     const id = new Date().getTime();
     const text = this.taskContent.value;
     if (text){
       const taskData = {id, text};
       task.create(taskData); 
     }
     else{
      alert("Oops! Task is empty, Please Enter one.");
      this.createTaskButton.classList.add("disableClick");
     }
  }

  //
  // Reset the task input after creating the task
  //
  resetForm(){
    this.taskContent.value = "";
    this.createTaskButton.setAttribute("disabled", true);
  }

  toggleUpdateForm(id){
    document.querySelector(`#taskUpdateForm-${id}`).classList.toggle("hide");
    document.querySelector(`#taskDetail-${id}`).classList.toggle("hide");
  }

  //
  // Update the Task Text with delimter to keep the persistent data of whether the task is complete/incomplete. This can be even done by simply updating the localstorage, but updating backend is the best approach
  //
  markCompleteOrIncomplte(event){
    const task = new Task();
    const id = event.currentTarget.id.match(/\d+/g);
    const taskElement = document.querySelector(`#task-${id}`);
    let tasktext = document.querySelector(`#taskText${id}`).textContent;
    if(event.currentTarget.classList.contains("updateTask")){
       tasktext = document.querySelector(`#UpdatedContent-${id}`).value;
       var taskData = {id, text: tasktext};
       task.update(taskData, id, true);
    }else{
      var taskData = {id, text: `${tasktext}-TASKCOMPLETED-`};
      task.update(taskData, id);
    }
    
  }
}

export default TaskSetUp;


