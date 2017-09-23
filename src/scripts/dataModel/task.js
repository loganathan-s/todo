import {BACKENDAPP_URL as appURL} from "../settings/backendConf";
import Request from "../dataApi/httpRequest";
import TaskSetup from "../actions/taskSetup";
import { resetInput, displayBackendError } from "../helpers/helper";
import View from "../views/taskView";


//
// Class Which inherits to TaskAction Class and to handle all CRUD for Task
//
class Task extends TaskSetup {
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
          View.Render().updateTaskList(task);
        }

     })
     .catch(err => {
       View.Render().displayBackendError(err.message);
      });
  }
  
  //
  // Create task on the backend server
  //
  create(newTask){
    Request.post(`${appURL}/api/tasks`, newTask)
    .then(() => {
       resetInput(this.taskContent);
       View.Render().updateTaskList(newTask);
     })
     .catch(err => {
       View.Render().displayBackendError(err.message);
      });
  }

  //
  //Update Task with Flag to indentify the complte/incomplete tasks 
  //
  update(task, id, reloadTask = false){
   Request.put(`${appURL}/api/tasks/${id}`, task).then(() => {
        (reloadTask ? View.Render().updateTaskContent(task) : View.Render().updateUserDom(id));
       })
       .catch(err => {
         View.Render().displayBackendError(err.message);
        });
  }

  //
  //delete Task 
  //
  delete(taskId){
   Request.delete(`${appURL}/api/tasks/${taskId}`)
       .then(() => {
         View.Render().removeTaskInDom(taskId);
       })
       .catch(err => {
         View.Render().displayBackendError(err.message);
        });
    }

}

export default Task;