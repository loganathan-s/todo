import TaskSetup from "../actions/taskSetup";
import { resetInput, removeInputError, sleep, formatDate } from "../helpers/helper";

/* Class hich handles DOM Updates*/
class View extends TaskSetup {
  constructor(){
    super()
  }
 
  /* Update the Task list */
  updateTaskList(task, animate){
      this.parentElement.insertAdjacentHTML("afterbegin", this.createTaskElementDom(task, animate));
      const parentInstance = this;
      document.querySelectorAll(`#taskUpdate-${task.id}, #task-${task.id}`).forEach(function(node){
        node.addEventListener("click", parentInstance.markCompleteOrIncomplte.bind(parentInstance));
      });
      document.querySelectorAll(`#taskEdit-${task.id}, #cancelUpdate-${task.id}`).forEach(function(node){
        node.addEventListener("click", parentInstance.displayUpdateForm.bind(parentInstance));
      });
     document.querySelector(`#taskDelete-${task.id}`).addEventListener("click", this.delete.bind(this));
  }
  
  /* Update the Task list to show whether it is completed or not */
  updateUserDom(task){
    let link = document.querySelector(`#task-${task.id}`);
    document.querySelector(`#taskText${task.id}`).classList.toggle("lineThrough");
    link.innerHTML = document.querySelector(`#taskText${task.id}`).classList.contains("lineThrough") ? "Undo complete" : "Mark complete";
    this.updateTooltip(task);
  }

  /* Remove task from DOM */
  removeTaskInDom(id){
    document.querySelector(`#taskDetail-${id}`).classList.add('removeTask');
    sleep(1000).then(() => {
      document.querySelector(`#taskDetail-${id}`).remove();
      document.querySelector(`#taskUpdateForm-${id}`).remove();
    });
  }

  /* Display task update form */
  displayUpdateForm(){
    const id = event.currentTarget.id.match(/\d+/g);
    let updateInputElement = document.querySelector(`#UpdatedContent-${id}`);
    removeInputError(updateInputElement);
    resetInput(updateInputElement);
    document.querySelector(`#taskUpdateForm-${id}`).classList.toggle("hide");
    document.querySelector(`#taskDetail-${id}`).classList.toggle("hide");
  }

  /* Display updated task */
  updateTaskContent(task){
    document.querySelector(`#taskDetail-${task.id}`).classList.remove("addTask");
    document.querySelector(`#task-${task.id}`).innerHTML = this.taskCompleted(task) ? "Undo complete" : "Mark Complete";
    document.querySelector(`#taskText${task.id}`).firstChild.nextSibling.innerHTML  = `${task.text}`;
    document.querySelector(`#taskNote-${task.id}`).innerHTML  = `${task.note}`;
    document.querySelector(`#taskUpdateForm-${task.id}`).classList.toggle("hide");
    document.querySelector(`#taskDetail-${task.id}`).classList.toggle("hide");
    this.updateTooltip(task);
  }

  taskCompleted(task){
    return (task.status.includes("Completed") ? true : false);
  }

  hideBackendError(){
    document.querySelector(`#ServerError`).classList.add("hide");
  }
 
  /* Add Task item */
  createTaskElementDom(task, animate = false) {
     return `<div class="taskItem ${animate ? 'addTask' : ''} taskDetail-${task.id}" id="taskDetail-${task.id}">
               <div class="taskText ${this.taskCompleted(task) ? "lineThrough" : ""}" id="taskText${task.id}">
                  <p  tooltip="Created: ${formatDate(task.created_at)}, Updated: ${formatDate(task.updated_at)}" tooltip-position="bottom"  class="editTask" id="taskEdit-${task.id}">
                    ${task.text} 
                  </p>
                   <p id="taskNote-${task.id}">
                    ${task.note}
                  </p>
               </div>
               <div class="options">
                    <a class="link zoom ${this.taskCompleted(task) ? '' : 'markComplete'}" data-created_at="${task.created_at}" id="task-${task.id}">${this.taskCompleted(task) ? "Undo complete" : "Mark complete"}</a>
                    <a class="link zoom updateFlex" id="taskDelete-${task.id}">Delete</a>
               </div>
          </div>
            <div class="updateForm hide" id="taskUpdateForm-${task.id}">
                <p>
                 <input type="text" id="UpdatedContent-${task.id}" autocomplete="off">
                </p>
                <p>
                 <input type="text" id="UpdatedNote-${task.id}" ${ task.note ? "value="+task.note : ''}  autocomplete="off">
                </p>
               <p>
                 <a class="button zoom updateTask" id="taskUpdate-${task.id}""> Update</a>
                 <a  class="button zoom" id="cancelUpdate-${task.id}"> Cancel</a>
               </p>
            </div>`;
  }
 
  updateTooltip(task){
    document.querySelector(`#taskEdit-${task.id}`).setAttribute("tooltip", `Created At: ${formatDate(task.created_at)}, Updated At: ${formatDate(task.updated_at)}`);
  }

  static Render(){
   return new View();
  }
  
}

export default View;