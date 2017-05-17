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
  //delete Task 
  //
  delete(taskId){
   let id = event.currentTarget.id.match(/\d+/g) 
   Request.delete(`${appURL}/api/tasks/${id}`)
       .then(() => {
         return this.removeTaskInDom(id);
       })
       .catch(err => {
         return err.message;
        });
    }

  //
  // Update the Task list in html page
  //
  updateTaskList(task){
     let currentTask = `<div><label class="${task.text.includes("-TASKCOMPLETED-") ? "panel-block" : "panel-block markDone"}" id="task-${task.id}" >
                            <span  class="${task.text.includes("-TASKCOMPLETED-") ? "lineThrough" : ""}" id="taskText${task.id}">${task.text.replace("-TASKCOMPLETED-", "")}
                            </span>
                        </label>
                        <span><a class="button is-primary is-small" id="taskDelete-${task.id}">X</a></span></div>`;
      this.parentElement.insertAdjacentHTML("beforeend", currentTask);
      document.querySelector(`#task-${task.id}`).addEventListener("click", this.markCompleteOrIncomplte.bind(this));
      document.querySelector(`#taskDelete-${task.id}`).addEventListener("click", this.delete.bind(this));
  }
  
  //
  // Update the Task list to show whether it is complete/incomplete
  //
  updateUserDom(id){
    document.querySelector(`#taskText${id}`).classList.toggle("lineThrough");
    document.querySelector(`#task-${id}`).classList.toggle("markDone");
  }

  // 
  // Remove task from DOM
  //
  removeTaskInDom(id){
    document.querySelector(`#taskText${id}`).closest("div").remove();
  }


 
}

export default Task;