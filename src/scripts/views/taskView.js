import TaskSetup from "../actions/taskSetup";
import { resetInput } from "../helpers/helper";

//
// Class Which handles 
class View extends TaskSetup{
  constructor(){
    super()
  }
 
  //
  // Update the Task list in html page
  //
  updateTaskList(task){
      this.parentElement.insertAdjacentHTML("afterbegin", this.createTaskElementDom(task));
      let parentInstance = this;
      document.querySelectorAll(`#taskUpdate-${task.id}, #task-${task.id}`).forEach(function(node){
        node.addEventListener("click", parentInstance.markCompleteOrIncomplte.bind(parentInstance));
      });
      document.querySelectorAll(`#taskEdit-${task.id}, #cancelUpdate-${task.id}`).forEach(function(node){
        node.addEventListener("click", parentInstance.displayUpdateForm.bind(parentInstance));
      });
     document.querySelector(`#taskDelete-${task.id}`).addEventListener("click", this.delete.bind(this));
  }
  
  //
  // Update the Task list to show whether it is complete/incomplete
  //
  updateUserDom(id){
    let link = document.querySelector(`#task-${id}`);
    document.querySelector(`#taskText${id}`).classList.toggle("lineThrough");
     link.innerHTML = document.querySelector(`#taskText${id}`).classList.contains("lineThrough") ? "Redo" : "Mark complete";
  }

  // 
  // Remove task from DOM
  //
  removeTaskInDom(id){
    document.querySelector(`#taskDetail-${id}`).remove();
    document.querySelector(`#taskUpdateForm-${id}`).remove();
  }

  displayUpdateForm(){
    let id = event.currentTarget.id.match(/\d+/g);
    let updateInputElement = document.querySelector(`#UpdatedContent-${id}`);
    this.removeError(updateInputElement);
    resetInput(updateInputElement);
    document.querySelector(`#taskUpdateForm-${id}`).classList.toggle("hide");
    document.querySelector(`#taskDetail-${id}`).classList.toggle("hide");
  }

  updateTaskContent(task){
    document.querySelector(`#task-${task.id}`).innerHTML = this.taskCompleted(task) ? "Redo" : "Mark Complete";
    document.querySelector(`#taskText${task.id}`).firstChild.nextSibling.innerHTML  = `${task.text.replace("-TASKCOMPLETED-", "")}`;
    document.querySelector(`#taskUpdateForm-${task.id}`).classList.toggle("hide");
    document.querySelector(`#taskDetail-${task.id}`).classList.toggle("hide");
  }

  taskCompleted(task){
    return (task.text.includes("-TASKCOMPLETED-") ? true : false);
  }


  hideBackendError(){
    document.querySelector(`#ServerError`).classList.add("hide");
  }
 
  //
  // Creates Task item
  //
  createTaskElementDom(task) {
     return `<div class="taskItem taskDetail-${task.id}" id="taskDetail-${task.id}">
               <div class="taskText ${this.taskCompleted(task) ? "lineThrough" : ""}" id="taskText${task.id}">
                  <p  tooltip="Click to edit!" tooltip-position="bottom"  class="editTask" id="taskEdit-${task.id}">
                    ${task.text.replace("-TASKCOMPLETED-", "")}
                  </p>
               </div>
               <div class="options">
                    <a class="link zoom" id="task-${task.id}">${this.taskCompleted(task) ? "Redo" : "Mark complete"}</a>
                    <a class="link zoom updateFlex" id="taskDelete-${task.id}">Delete</a>
               </div>
          </div>
            <div class="updateForm hide" id="taskUpdateForm-${task.id}">
                <p>
                 <input type="text" id="UpdatedContent-${task.id}" autocomplete="off">
                </p>

               <p>
                 <a class="button zoom updateTask" id="taskUpdate-${task.id}""> Update</a>
                 <a  class="button zoom" id="cancelUpdate-${task.id}"> Cancel</a>
               </p>
            </div>`;
  }
  
 displayBackendError(error) {
    let globalError = document.querySelector("#serverError");
    globalError.innerHTML = error;
    globalError.classList.remove("hide");
}
  static Render(){
    return new View();
  }
  
}

export default View;