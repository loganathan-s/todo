import {BACKENDAPP_URL as appURL} from "./backendConf";
import Request from "./lib/request";
import TaskSetUp from "./TaskSetUp";
//
// Class Which inherits to TaskSetUp Class and to handle all CRUD for Task
//
class Task extends TaskSetUp{
  constructor(){
    super();
  }

  //
  // List All tasks from the backend server
  //
  index(){
    Request.get(`${appURL}/api/tasks`)
      .then(response => {
        for (let [id, task] of Object.entries(response)) {
          this.updateTaskList(task);
        }
     })
     .catch(err => {
       return err.message;
      });

  }
  
  //
  // Create task on the backend server
  //
  create(newTask){
    Request.post(`${appURL}/api/tasks`, newTask)
    .then(() => {
       this.resetForm();
       return this.updateTaskList(newTask);
     })
     .catch(err => {
       return err.message;
      });
  }

  //
  //Update Task with Flag to indentify the complte/incomplete tasks 
  //
  update(task, id){
   let user = Request.put(`${appURL}/api/tasks/${id}`, task);
       user.then(() => {
         return this.updateUserDom(id);
       })
       .catch(err => {
         return err.message;
        });
    }

  //
  // Update the Task list in html page
  //
  updateTaskList(task){
     let currentTask = `<label class="${task.text.includes("-TASKCOMPLETED-") ? "panel-block" : "panel-block markDone"}" id="task-${task.id}" >
                            <span  class="${task.text.includes("-TASKCOMPLETED-") ? "lineThrough" : ""}" id="taskText${task.id}">${task.text.replace("-TASKCOMPLETED-", "")}</span>
                        </label>`;
      this.parentElement.insertAdjacentHTML("beforeend", currentTask);
      document.querySelector(`#task-${task.id}`).addEventListener("click", this.markCompleteOrIncomplte.bind(this));
    
  }
  
  //
  // Update the Task list to show whether it is complete/incomplete
  //
  updateUserDom(id){
    document.querySelector(`#taskText${id}`).classList.toggle("lineThrough");
    document.querySelector(`#task-${id}`).classList.toggle("markDone");

  }

 
}

export default Task;