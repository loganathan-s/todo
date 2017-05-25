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
  update(task, id, reloadTask = false){
   let user = Request.put(`${appURL}/api/tasks/${id}`, task);
       user.then(() => {
        (reloadTask ? this.updateTaskContent(task) : this.updateUserDom(id));
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
     let currentTask = `<div class="taskItem" id="taskDetail-${task.id}">
               <div class="taskText ${task.text.includes("-TASKCOMPLETED-") ? "lineThrough" : ""}" id="taskText${task.id}">
                  <p>
                    ${task.text.replace("-TASKCOMPLETED-", "")}
                  </p>  
               </div>
               <div class="options">
                    <a class="button editTask" id="taskEdit-${task.id}">Edit</a> 
                    <a class="button" id="task-${task.id}">Mark complete</a>
                    <a class="button updateFlex" id="taskDelete-${task.id}">Delete</a>
               </div>
          </div>
            <div class="updateForm hide" id="taskUpdateForm-${task.id}">
                <p>
                 <input class="input" type="text" id="UpdatedContent-${task.id}" autocomplete="off">
                </p>
               <p>
                 <a class="button updateTask" id="taskUpdate-${task.id}""> Update</a>
                 <a class="button" id="cancelUpdate-${task.id}"> Cancel</a>
               </p>
            </div>     
          `;
      this.parentElement.insertAdjacentHTML("beforeend", currentTask);
      let classInstance = this;
//      document.querySelector(`#task-${task.id}`).addEventListener("click", this.markCompleteOrIncomplte.bind(this));

      document.querySelectorAll(`#taskUpdate-${task.id}, #task-${task.id}`).forEach(function(node){
        node.addEventListener("click", classInstance.markCompleteOrIncomplte.bind(classInstance));
      });


      document.querySelectorAll(`#taskEdit-${task.id}, #cancelUpdate-${task.id}`).forEach(function(node){
        node.addEventListener("click", classInstance.displayUpdateForm.bind(this));
      });

      
      document.querySelector(`#taskDelete-${task.id}`).addEventListener("click", this.delete.bind(this));
  }
  
  //
  // Update the Task list to show whether it is complete/incomplete
  //
  updateUserDom(id){
    document.querySelector(`#taskText${id}`).classList.toggle("lineThrough");
    document.querySelector(`#task-${id}`).classList.toggle("completedTask");
  }

  // 
  // Remove task from DOM
  //
  removeTaskInDom(id){
    document.querySelector(`#taskText${id}`).parentNode.remove();
  }

  displayUpdateForm(){
    let id = event.currentTarget.id.match(/\d+/g) 
    document.querySelector(`#taskUpdateForm-${id}`).classList.toggle("hide");
    document.querySelector(`#taskDetail-${id}`).classList.toggle("hide");
  }

  updateTaskContent(task){
    document.querySelector(`#taskText${task.id}`).firstChild.nextSibling.innerHTML  = `${task.text.replace("-TASKCOMPLETED-", "")}`;
    document.querySelector(`#taskUpdateForm-${task.id}`).classList.toggle("hide");
    document.querySelector(`#taskDetail-${task.id}`).classList.toggle("hide");
  }

 
}

export default Task;