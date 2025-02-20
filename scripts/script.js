'use strict';
//Get all the elements
let modal = document.querySelector(".modal-div");
let addTODO = document.querySelector("#todo-form-add-button");
let cancel = document.querySelector("#cancel");
let tasksList= document.querySelector(".todo-form-tasks");
let textArea = document.querySelector(".modal-task-text");
let errorMessage=document.querySelector("#error-message");
let deadline = document.querySelector("#deadline");
let now=new Date()
deadline.min=now.toISOString().slice(0, 10);
let perform = document.querySelector("#performer");
let priority = document.querySelector("#priority");
let addTask = document.querySelector("#modal-add-task");
//Create local storage to save tasks
let data = JSON.parse(localStorage.getItem("data")) || [];
//Make modal visible
addTODO.addEventListener("click", () => {
    modal.style.display = "flex";
});
//Closing modal
cancel.addEventListener("click", () => {
    modal.style.display = "none";
});
//Add task and check if it's empty
addTask.addEventListener("click", () => {
    if (textArea.value.trim() === "") {
        errorMessage.innerHTML = "Fill in the title field!";
    }
    else {
        errorMessage.innerHTML = "";
        acceptData();
        modal.style.display = "none";
    }
});
//Save data to local storage
let acceptData = () => {
    data.push({
        date: deadline.value===""? "No deadline" : deadline.value,
        performer: perform.value==="Assign to myself"? "Myself" : "...",
        status: priority.value==="Priority"?"Not urgent":priority.value,
        description: textArea.value.trim(),
    });

    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    resetForm();
};
//Add task to task list
let createTasks = () => {
    tasksList.innerHTML = "";
    data.forEach((task, index) => {
        tasksList.innerHTML += `
            <div class="todo-form-task" id="${index}">
                <p class="todo-form-task-line">Deadline: <span class="task-arg">${task.date}</span></p>
                <p class="todo-form-task-line">Performer: <span class="task-arg">${task.performer}</span></p>
                <p class="todo-form-task-line">Priority: <span class="task-arg">${task.status}</span></p>
                <p class="todo-form-task-line">Description: <span class="task-arg">${task.description}</span></p>
                <div class="todo-list-additional-buttons">
                    <button class="btn edit-task" onclick="editTask(${index})">Edit</button>
                    <button class="btn delete-task" onclick="deleteTask(${index})">Delete</button>     
                </div>
            </div>
        `;
    });
};
//Updating form to default
let resetForm = () => {
    deadline.value = "";
    perform.value = "Performer";
    priority.value = "Priority";
    textArea.value = "";
};
//Edit list item
window.editTask = (index) => {
    let task = data[index];
    deadline.value = task.date;
    perform.value = task.performer;
    priority.value = task.status;
    textArea.value = task.description;
    deleteTask(index);
    modal.style.display = "flex";
};
//Delete list item
window.deleteTask = (index) => {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
};

createTasks();