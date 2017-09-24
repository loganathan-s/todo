/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Helper functions  */

const extractNumber = (data)=> (parseInt(data.match(/\d+/)) ? parseInt(data.match(/\d+/)) : 0);
/* harmony export (immutable) */ __webpack_exports__["b"] = extractNumber;


const resetInput = (input)=> (input.value = '');
/* harmony export (immutable) */ __webpack_exports__["d"] = resetInput;


const  displayBackendError = (error) => {
    let globalError = document.querySelector("#serverError");
    globalError.innerHTML = error;
    globalError.classList.remove("hide");
};
/* unused harmony export displayBackendError */


const hasError = (inputElement) => {
     return ((inputElement.nextSibling && inputElement.nextSibling.classList && inputElement.nextSibling.classList.contains("errorText")) || false);
};

const displayError = (inputElement) => {
    inputElement.classList.add("shakeIt", "inputError");
    return (!hasError(inputElement) ? inputElement.insertAdjacentHTML("afterend", "<span class='errorText'>can't be blank</span>") : false);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = displayError;


const removeError = (inputElement) => {
    inputElement.classList.remove("shakeIt", "inputError");
    return (hasError(inputElement) ? inputElement.nextSibling.remove() : false);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = removeError;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dataModel_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_helper__ = __webpack_require__(0);



/* Action Handlers */
class TaskSetup {
 
  constructor(){
    this.taskContent = document.querySelector("#taskDescription");
    this.parentElement =  document.querySelector("#todoPanel");
  }
  
  /* Attach EventListener to elements */  
  init(){
    document.querySelector("#createTask").addEventListener("submit",this.createTask.bind(this));
    this.displayAllTasks();
  }

  /* Display All tasks when user loads the page */
  displayAllTasks(){
     let task = new __WEBPACK_IMPORTED_MODULE_0__dataModel_task__["a" /* default */]();
     task.index();
  }
  
  /* Create Task using the api */
  createTask(){
    event.preventDefault();
    const text = this.taskContent.value;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["a" /* removeError */])(this.taskContent);
    if (text){
      const recentTask = document.querySelector(".taskItem");
      const task = new __WEBPACK_IMPORTED_MODULE_0__dataModel_task__["a" /* default */]();
      const id = ((recentTask && recentTask.id) ? (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["b" /* extractNumber */])(recentTask.id)+1) : 1);
      const taskData = {id, text};
      task.create(taskData);
    }
    else{
     __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["c" /* displayError */])(this.taskContent);
     }
  }

  /* Delete Task Action */
  delete(taskId){
    let id = event.currentTarget.id.match(/\d+/g);
    let task = new __WEBPACK_IMPORTED_MODULE_0__dataModel_task__["a" /* default */]();
    task.delete(id);
  }
  
  /* Update the Task Text with delimter to keep the persistent data of whether the task is complete/incomplete. */
  markCompleteOrIncomplte(event){
    const task = new __WEBPACK_IMPORTED_MODULE_0__dataModel_task__["a" /* default */]();
    const id = event.currentTarget.id.match(/\d+/g);
    const taskElement = document.querySelector(`#task-${id}`);
    let tasktext = document.querySelector(`#taskText${id}`).textContent;

    if(event.currentTarget.classList.contains("updateTask")){
       const newValue = document.querySelector(`#UpdatedContent-${id}`);
       __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["a" /* removeError */])(newValue);
       tasktext = newValue.value;
       if(!tasktext){
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["c" /* displayError */])(newValue);
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

/* harmony default export */ __webpack_exports__["a"] = (TaskSetup);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_backendConf__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dataApi_httpRequest__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_taskSetup__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_helper__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_taskView__ = __webpack_require__(7);






/* Class which updates the backend server */
class Task extends __WEBPACK_IMPORTED_MODULE_2__actions_taskSetup__["a" /* default */] {
  constructor(){
    super();
  }

  /* List All tasks from the backend server */
  index(){
    __WEBPACK_IMPORTED_MODULE_1__dataApi_httpRequest__["a" /* default */].get(`${__WEBPACK_IMPORTED_MODULE_0__settings_backendConf__["a" /* BACKENDAPP_URL */]}/api/tasks`)
      .then(response => {
        for (let [id, task] of Object.entries(response)) {
          __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().updateTaskList(task);
        }

     })
     .catch(err => {
       __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().displayServerError(err.message);
      });
  }
  
  /* Create task on the backend server */
  create(newTask){
    __WEBPACK_IMPORTED_MODULE_1__dataApi_httpRequest__["a" /* default */].post(`${__WEBPACK_IMPORTED_MODULE_0__settings_backendConf__["a" /* BACKENDAPP_URL */]}/api/tasks`, newTask)
    .then(() => {
       __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers_helper__["d" /* resetInput */])(this.taskContent);
       __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().updateTaskList(newTask);
     })
     .catch(err => {
       __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().displayBackendError(err.message);
      });
  }

  /* Update Task with Flag to indentify the task is completed or not */
  update(task, id, reloadTask = false){
   __WEBPACK_IMPORTED_MODULE_1__dataApi_httpRequest__["a" /* default */].put(`${__WEBPACK_IMPORTED_MODULE_0__settings_backendConf__["a" /* BACKENDAPP_URL */]}/api/tasks/${id}`, task).then(() => {
        (reloadTask ? __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().updateTaskContent(task) : __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().updateUserDom(id));
       })
       .catch(err => {
         __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().displayServerError(err.message);
        });
  }

  /*delete Task */
  delete(taskId){
   __WEBPACK_IMPORTED_MODULE_1__dataApi_httpRequest__["a" /* default */].delete(`${__WEBPACK_IMPORTED_MODULE_0__settings_backendConf__["a" /* BACKENDAPP_URL */]}/api/tasks/${taskId}`)
       .then(() => {
         __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().removeTaskInDom(taskId);
       })
       .catch(err => {
         __WEBPACK_IMPORTED_MODULE_4__views_taskView__["a" /* default */].Render().displayServerError(err.message);
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Task);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dataModel_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_helper__ = __webpack_require__(0);



/* Action Handlers */
class TaskSetup {
 
  constructor(){
    this.taskContent = document.querySelector("#taskDescription");
    this.parentElement =  document.querySelector("#todoPanel");
  }
  
  /* Attach EventListener to elements */  
  init(){
    document.querySelector("#createTask").addEventListener("submit",this.createTask.bind(this));
    this.displayAllTasks();
  }

  /* Display All tasks when user loads the page */
  displayAllTasks(){
     let task = new __WEBPACK_IMPORTED_MODULE_0__dataModel_task__["a" /* default */]();
     task.index();
  }
  
  /* Create Task using the api */
  createTask(){
    event.preventDefault();
    const text = this.taskContent.value;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["a" /* removeError */])(this.taskContent);
    if (text){
      const recentTask = document.querySelector(".taskItem");
      const task = new __WEBPACK_IMPORTED_MODULE_0__dataModel_task__["a" /* default */]();
      const id = ((recentTask && recentTask.id) ? (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["b" /* extractNumber */])(recentTask.id)+1) : 1);
      const taskData = {id, text};
      task.create(taskData);
    }
    else{
     __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["c" /* displayError */])(this.taskContent);
     }
  }

  /* Delete Task Action */
  delete(taskId){
    let id = event.currentTarget.id.match(/\d+/g);
    let task = new __WEBPACK_IMPORTED_MODULE_0__dataModel_task__["a" /* default */]();
    task.delete(id);
  }
  
  /* Update the Task Text with delimter to keep the persistent data of whether the task is complete/incomplete. */
  markCompleteOrIncomplte(event){
    const task = new __WEBPACK_IMPORTED_MODULE_0__dataModel_task__["a" /* default */]();
    const id = event.currentTarget.id.match(/\d+/g);
    const taskElement = document.querySelector(`#task-${id}`);
    let tasktext = document.querySelector(`#taskText${id}`).textContent;

    if(event.currentTarget.classList.contains("updateTask")){
       const newValue = document.querySelector(`#UpdatedContent-${id}`);
       __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["a" /* removeError */])(newValue);
       tasktext = newValue.value;
       if(!tasktext){
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["c" /* displayError */])(newValue);
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

/* harmony default export */ __webpack_exports__["a"] = (TaskSetup);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_taskSetUp__ = __webpack_require__(3);
/* APP JS to start FrontEnd Scripts */


window.addEventListener("load", function() {
 const todoApp = new __WEBPACK_IMPORTED_MODULE_0__actions_taskSetUp__["a" /* default */]();
 todoApp.init();
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* This module handles all the Express api requests, this can be used for any URL. You just have to pass the URL & data */
class Request {
  
  /* Set Header for All the requests */
  static get HEADERS() {
    return  {
              "Accept":  "application/json, text/plain", 
              "Content-Type": "application/json"
            };
    }

  /* GET Request */
  static get(url){
    return fetch(url)
            .then(response => {
                if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
          })
   .catch(err => {
      throw new Error(err);
    });
  }
  

  /* POST Request */
  static post(url, data){
    return fetch(url, {method: "post", headers: this.HEADERS, body: JSON.stringify(data)})
           .then(response => {
              if (!response.ok) {
                 throw new Error(response.statusText);
              }
              return true;
            })
           .catch((err) => {
               throw new Error(err);
            });
  }

  
  /* PUT Request */
  static put(url, data){
    return fetch(url, {method: "put", headers: this.HEADERS, body: JSON.stringify(data)})
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return true;
    })
    .catch(err => {
     throw new Error(err);
    });
  }


  /* DELETE Request */
  static delete(url){
      return fetch(url, {method: "delete", headers: this.HEADERS})
              .then(response => {
                  if (!response.ok) {
                  throw new Error(response.statusText);
                }
                return response.ok;
            })
     .catch(err => {
       throw new Error(err);
      });
    }
  
}

/* Default Export */
/* harmony default export */ __webpack_exports__["a"] = (Request);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BACKENDAPP_URL; });
/* Backend Api application, powered by ExpressJs App */
const BACKENDAPP_URL="http://localhost:3000";


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_taskSetup__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_helper__ = __webpack_require__(0);



/* Class Which handles DOM Updates*/
class View extends __WEBPACK_IMPORTED_MODULE_0__actions_taskSetup__["a" /* default */] {
  constructor(){
    super()
  }
 
  /* Update the Task list */
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
  
  /* Update the Task list to show whether it is completed or not */
  updateUserDom(id){
    let link = document.querySelector(`#task-${id}`);
    document.querySelector(`#taskText${id}`).classList.toggle("lineThrough");
     link.innerHTML = document.querySelector(`#taskText${id}`).classList.contains("lineThrough") ? "Undo complete" : "Mark complete";
  }

  /* Remove task from DOM */
  removeTaskInDom(id){
    document.querySelector(`#taskDetail-${id}`).remove();
    document.querySelector(`#taskUpdateForm-${id}`).remove();
  }

  /* Display task update form */
  displayUpdateForm(){
    let id = event.currentTarget.id.match(/\d+/g);
    let updateInputElement = document.querySelector(`#UpdatedContent-${id}`);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["a" /* removeError */])(updateInputElement);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_helper__["d" /* resetInput */])(updateInputElement);
    document.querySelector(`#taskUpdateForm-${id}`).classList.toggle("hide");
    document.querySelector(`#taskDetail-${id}`).classList.toggle("hide");
  }

  /* Display updated task */
  updateTaskContent(task){
    document.querySelector(`#task-${task.id}`).innerHTML = this.taskCompleted(task) ? "Undo complete" : "Mark Complete";
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
 
  /* Add Task item */
  createTaskElementDom(task) {
     return `<div class="taskItem taskDetail-${task.id}" id="taskDetail-${task.id}">
               <div class="taskText ${this.taskCompleted(task) ? "lineThrough" : ""}" id="taskText${task.id}">
                  <p  tooltip="Click to edit!" tooltip-position="bottom"  class="editTask" id="taskEdit-${task.id}">
                    ${task.text.replace("-TASKCOMPLETED-", "")}
                  </p>
               </div>
               <div class="options">
                    <a class="link zoom" id="task-${task.id}">${this.taskCompleted(task) ? "Undo complete" : "Mark complete"}</a>
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
 
 /* Display Server Error */ 
 displayServerError(error) {
    let globalError = document.querySelector("#serverError");
    globalError.innerHTML = error;
    globalError.classList.remove("hide");
}

static Render(){
 return new View();
}
  
}

/* harmony default export */ __webpack_exports__["a"] = (View);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map