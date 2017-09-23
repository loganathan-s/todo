//Main JS to start FrontEnd Scripts
import TaskSetUp from "./actions/taskSetUp";

window.addEventListener("load", function() {
 const todoApp = new TaskSetUp();
 todoApp.init();
});