class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('ToDoTasks'));
        if (!this.tasks) {
            this.tasks =[];    
            }
        this.loadTasks();
        this.addEventListeners();
    }
    
    addTask() {
        event.preventDefault();
        const task = document.getElementById('task').value;
        document.getElementById('task').value = '';
        this.addTaskExecute(task);
    }
    
    addTaskExecute(task) {
        if (task === '') {
            //alert('Aucune task inseré');
            document.getElementById('task').classList.add("noTask");
        } else {
            document.getElementById('task').classList.remove("noTask");
            let nvTask = {
                task,
                isComplete: false
            };
            this.tasks.push(nvTask);
        }
        this.loadTasks();
    }
    completeTask(index) {
        this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
        this.loadTasks();
    }
    
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.loadTasks();
    }
    
    loadTasks() {
        localStorage.setItem('ToDoTasks', JSON.stringify(this.tasks))
        
        const ul = document.getElementById('tasksUl');
        let html = '';
        for (let i = 0; i < this.tasks.length; i++) {
            html = html + this.generateLI(this.tasks[i], i);
        }
        ul.innerHTML = html;
    }   
    
    generateLI(task, index) {
        return `
            <li class="task-li">
                <div class="task-list-items">
                    <input class="task-complete-chk" type="checkbox" onchange="
toDo.completeTask(${index})" ${task.isCompleted?'checked':''}>
                    <label class="task-item-lbl ${task.isCompleted?'task-complete' : ''}" id="task">${task.task}</label>
                    <button class="del-task-btn" onclick="toDo.deleteTask(${index})"><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </li>
            `;
    }
    
    addEventListeners() {
        document.getElementById('task').addEventListener('keydown', event => {
            if (event.key === 'Enter')
                this.addTask();
        })
    }


}



const toDo = new ToDoList();

//console.log(toDo.task);

