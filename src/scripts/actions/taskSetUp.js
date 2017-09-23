import Task from "../dataModel/task";
import { extractNumber } from "../helpers/helper";

class TaskSetup {
 
 
  constructor(){
    this.taskContent = document.querySelector("#taskDescription");
    this.createTaskButton = document.querySelector("#createTask");
    this.parentElement =  document.querySelector("#todoPanel");
  }

  //
  //Attach EventListener to elements
  //
  init(){
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
  // Create Task using the api
  //
  createTask(){
    const text = this.taskContent.value;
    this.removeError(this.taskContent);
    if (text){
      const recentTask = document.querySelector(".taskItem");
      const task = new Task();
      const id = (recentTask && recentTask.id) ? (extractNumber(recentTask.id)+1) : 1;
      const taskData = {id, text};
      task.create(taskData); 
    }
    else{
     this.displayError(this.taskContent);
     }
  }
   //
  //delete Task 
  //
  delete(taskId){
   let id = event.currentTarget.id.match(/\d+/g);
     let task = new Task();
     task.delete(id);
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
       const newValue = document.querySelector(`#UpdatedContent-${id}`);
       this.removeError(newValue);
       tasktext = newValue.value;
       if(!tasktext){
          this.displayError(newValue);
          return;
       }
       let taskData = {id, text: tasktext.replace("-TASKCOMPLETED-", "")};
       task.update(taskData, id, true);
    }else{
      let taskData = {id, text: `${tasktext}-TASKCOMPLETED-`};
      task.update(taskData, id);
    }
    
  }

  displayError(inputElement){
    inputElement.classList.add("shakeIt", "inputError");
    !this.hasError(inputElement) ? inputElement.insertAdjacentHTML("afterend", "<span class='errorText'>Oops! Can't be blank</span>") : '';
  }

  removeError(inputElement){
    inputElement.classList.remove("shakeIt", "inputError");
    this.hasError(inputElement) ? inputElement.nextSibling.remove() : '';
  }

  hasError(inputElement){
     return (inputElement.nextSibling && inputElement.nextSibling.classList && inputElement.nextSibling.classList.contains("errorText")) || false;
  }
}

export default TaskSetup;