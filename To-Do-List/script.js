
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => addTaskToDOM(task.text, task.checked));
    }
}

function addTaskToDOM(taskText, isChecked = false) {
    const li = document.createElement("li");
    const t = document.createTextNode(taskText);
    li.appendChild(t);
    
    if (isChecked) {
        li.classList.add('checked');
    }

    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);

    span.onclick = function() {
        li.remove();
        saveTasks(); 
    };

    li.onclick = function() {
        li.classList.toggle('checked');
        saveTasks(); 
    };
}

function newElement() {
    const inputValue = document.getElementById("myInput").value.trim();
    if (inputValue === '') {
        alert("You must write something!");
        return; // Exit the function if input is empty
    }
    
    addTaskToDOM(inputValue); 
    document.getElementById("myInput").value = ""; 
    saveTasks(); 
}

function saveTasks() {
    const tasks = [];
    const listItems = document.querySelectorAll('ul li');

    listItems.forEach(item => {
        tasks.push({
            text: item.childNodes[0].textContent.trim(), 
            checked: item.classList.contains('checked') 
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.onload = loadTasks; 
document.querySelector('.addBtn').onclick = newElement; 

document.getElementById("myInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { 
        event.preventDefault();  
        newElement();            
        saveTasks();             
    }
});
