//Main JS to start FrontEnd Scripts
import TaskSetUp from "./taskSetUp";

window.addEventListener("load", function() {
 const todoApp = new TaskSetUp();
 todoApp.init();
});