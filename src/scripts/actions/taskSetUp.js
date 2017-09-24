import Task from "../dataModel/task";
import { extractNumber,  displayError, removeError} from "../helpers/helper";

class TaskSetup {
 
 
  constructor(){
    this.taskContent = document.querySelector("#taskDescription");
    this.parentElement =  document.querySelector("#todoPanel");
  }

  
  /*
  Attach EventListener to elements
  */  
  init(){
    document.querySelector("#createTask").addEventListener("submit",this.createTask.bind(this))
    this.displayAllTasks();
  }

  /*
  Display All tasks when user loads the page
  */
   displayAllTasks(){
     let task = new Task();
     task.index();
   }

  
  /* 
  Create Task using the api 
  */
  createTask(){
    event.preventDefault();
    const text = this.taskContent.value;
    removeError(this.taskContent);
    if (text){
      const recentTask = document.querySelector(".taskItem");
      const task = new Task();
      const id = (recentTask && recentTask.id) ? (extractNumber(recentTask.id)+1) : 1;
      const taskData = {id, text};
      task.create(taskData); 
    }
    else{
     displayError(this.taskContent);
     }
  }

  /*
  delete Task 
  */
  delete(taskId){
   let id = event.currentTarget.id.match(/\d+/g);
     let task = new Task();
     task.delete(id);
    }

  
  /* 
  Update the Task Text with delimter to keep the persistent data of whether the task is complete/incomplete. 
  */
  markCompleteOrIncomplte(event){
    const task = new Task();
    const id = event.currentTarget.id.match(/\d+/g);
    const taskElement = document.querySelector(`#task-${id}`);
    let tasktext = document.querySelector(`#taskText${id}`).textContent;

    if(event.currentTarget.classList.contains("updateTask")){
       const newValue = document.querySelector(`#UpdatedContent-${id}`);
       removeError(newValue);
       tasktext = newValue.value;
       if(!tasktext){
          displayError(newValue);
          return;
       }
       let taskData = {id, text: tasktext.replace("-TASKCOMPLETED-", "")};
       task.update(taskData, id, true);
    }else{
      let taskData = {id, text: `${tasktext}-TASKCOMPLETED-`};
      task.update(taskData, id);
    }
    
  }
}

export default TaskSetup;