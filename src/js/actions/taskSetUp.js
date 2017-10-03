import Task from "../dataModel/task";
import { extractNumber, displayGlobalError, clearGlobalError, displayInputError, removeInputError, formatTaskNote, inValidNote } from "../helpers/helper";

/* Action Handlers */
class TaskSetup {
 
  constructor(){
    this.taskContent = document.querySelector("#taskDescription");
    this.taskNote = document.querySelector("#taskNote");
    this.searchTerm =  document.querySelector("#searchTerm");
    this.parentElement =  document.querySelector("#todoPanel");
  }
  
  /* Attach EventListener to elements */  
  init(){
    document.querySelector("#createTask").addEventListener("submit", this.createTask.bind(this));
    document.querySelector("#searchTerm").addEventListener('keyup', this.search.bind(this));
    document.querySelector("#searchTerm").addEventListener('change', this.search.bind(this));
    document.querySelector("#serverErrorClose").addEventListener('click', this.clearErrors.bind(this));
    this.displayAllTasks();
  }

  /* Display All tasks when user loads the page */
  displayAllTasks(){
     const task = new Task();
     task.index();
  }
  
  /* Create Task using the api */
  createTask(){
    event.preventDefault();
    this.clearErrors();
    const text = this.taskContent.value;
    let note = this.taskNote.value;
    const noteError = inValidNote(note)
    removeInputError(this.taskContent);
    removeInputError(this.taskNote);
    if (text && !noteError) {
      const recentTask = document.querySelector(".taskItem");
      const task = new Task();
      const id = ((recentTask && recentTask.id) ? (extractNumber(recentTask.id)+1) : 1);
      const taskData = {id, text, status: "InComplete", created_at: +new Date(), updated_at: +new Date(), note: (note ? formatTaskNote(note) : note) };
      task.create(taskData);
    }
    else {
      if(noteError){
        displayGlobalError(noteError);
        displayInputError(this.taskNote);
      }

      if(!text){
        displayGlobalError("Task Can't be blank");
        displayInputError(this.taskContent);  
      }
      
    }
  }

  /* Delete Task Action */
  delete(taskId){
    clearGlobalError();
    if(event.currentTarget.parentElement.previousElementSibling.classList.contains("lineThrough")){
      const id = event.currentTarget.id.match(/\d+/g);
      const task = new Task();
      task.delete(id);
    }else{
      displayGlobalError("Mark the task as complete before deleting!");
    }
  }
  
  /* Update the Task */
  markCompleteOrIncomplte(event){
    this.clearErrors();
    const task = new Task();
    const id = event.currentTarget.id.match(/\d+/g);
    const taskElement = document.querySelector(`#task-${id}`);
    const created_at =  taskElement.dataset.created_at
    let tasktext = document.querySelector(`#taskEdit-${id}`).textContent;
    let note = document.querySelector(`#taskNote-${id}`).textContent;
    const status = event.currentTarget.classList.contains("markComplete") ? "Completed" : "InComplete";
    if(event.currentTarget.classList.contains("updateTask")){
       const newValue = document.querySelector(`#UpdatedContent-${id}`);
       const newNoteValue = document.querySelector(`#UpdatedNote-${id}`);
       removeInputError(newValue);
       removeInputError(newNoteValue);
       tasktext = newValue.value;
       note = newNoteValue.value;
       if (!tasktext) {
          displayGlobalError("Task Can't be blank");
          displayInputError(newValue);
          return;
       }

      if(inValidNote(note)){
        displayGlobalError(inValidNote(note));
        displayInputError(note);
        return;
      }

       const taskData = {id, text: tasktext, status, updated_at: +new Date(), created_at: parseInt(taskElement.dataset.created_at), note:  (newNoteValue.value ? formatTaskNote(newNoteValue.value): newNoteValue.value) };
       task.update(taskData, id, true);
    }else{
      const taskData = {id, text: tasktext, status, updated_at: +new Date(), created_at: parseInt(taskElement.dataset.created_at), note};
      task.update(taskData, id);
    }
  }

  /* Search Action */
  search(){
    this.parentElement.innerHTML = "";
    const term = this.searchTerm.value;
    if (term && term.length >=3) {
      const task = new Task();
      task.search(term);
    }
    else {
      this.displayAllTasks();
    }
  }

  clearErrors(){
    clearGlobalError();
  }
  
}

export default TaskSetup;