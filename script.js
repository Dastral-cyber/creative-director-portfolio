// --- Smooth Scrolling ---
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// --- Planner Functionality ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Everything inside this function only runs when the button is clicked
addTaskBtn.addEventListener('click', function() {
    
    // 1. Get the text and check if it's empty
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // 2. Create the list item
    const li = document.createElement('li');
    li.className = 'task-item';

    // 3. Create the text span
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;

    // 4. Create the button container
    const btnContainer = document.createElement('div');
    btnContainer.className = 'task-buttons';

    // 5. Create the complete button
    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.innerHTML = '✔'; 

  
    completeBtn.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // 6. Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '✖'; 

      
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    // 7. Assemble everything
    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);

    // 8. Add to the page and clear the input
    taskList.appendChild(li);
    taskInput.value = '';
});