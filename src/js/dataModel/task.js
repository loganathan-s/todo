import { BACKENDAPP_URL as appURL } from "../settings/backendConf";
import Request from "../dataApi/httpRequest";
import TaskSetup from "../actions/taskSetup";
import { resetInput, displayGlobalError } from "../helpers/helper";
import View from "../views/taskView";

/* Class which updates the data - MODEL */
class Task extends TaskSetup {
  
  constructor(){
    super();
  }

  /* List All tasks from the app server */
  index(){
    Request.get(`${appURL}/api/tasks`)
      .then(response => {
        for (const [id, task] of Object.entries(response)) {
          View.Render().updateTaskList(task, false);
        }
     })
     .catch(err => {
       displayGlobalError(err.message);
      });
  }
  
  /* Create task on the app server */
  create(newTask){
    Request.post(`${appURL}/api/tasks`, newTask)
    .then(() => {
       resetInput(this.taskContent);
       resetInput(this.taskNote);
       View.Render().updateTaskList(newTask, true);
     })
     .catch(err => {
       displayGlobalError(err.message);
      });
  }

  /* Update Task with Flag to indentify the task is completed or not */
  update(task, id, reloadTask = false){
   Request.put(`${appURL}/api/tasks/${id}`, task).then(response => {
        (reloadTask ? View.Render().updateTaskContent(response) : View.Render().updateUserDom(response));
       })
       .catch(err => {
         displayGlobalError(err.message);
        });
  }

  /*delete Task */
  delete(taskId){
   Request.delete(`${appURL}/api/tasks/${taskId}`)
       .then(() => {
         View.Render().removeTaskInDom(taskId);
       })
       .catch(err => {
         displayGlobalError(err.message);
        });
    }

  /* Search All tasks from the data */
  search(term){
    Request.get(`${appURL}/api/tasks`)
      .then(response => {
          Object.values(response).forEach(function(task, i) {
          const regex = new RegExp(term, 'gi');
          if(task.note.match(regex) || task.text.match(regex)){
            View.Render().updateTaskList(task, false);
          }
      });
     })
     .catch(err => {
        displayGlobalError(err.message);
      });
  }
  

}

export default Task;