// script.js
document.addEventListener('DOMContentLoaded', () => {
    const habitInput = document.getElementById('habit-input');
    const addHabitBtn = document.getElementById('add-habit-btn');
    const habitList = document.getElementById('habit-list');
  
    // Load habits from localStorage
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
  
    // Function to save habits to localStorage
    const saveHabits = () => {
      localStorage.setItem('habits', JSON.stringify(habits));
    };
  
    // Function to render habits
    const renderHabits = () => {
      habitList.innerHTML = '';
      habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.className = 'habit-item';
        li.innerHTML = `
          <span class="habit-name">${habit.name}</span>
          <div class="habit-buttons">
            <button class="complete-btn" onclick="toggleComplete(${index})">${habit.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-btn" onclick="deleteHabit(${index})">Delete</button>
          </div>
        `;
        if (habit.completed) {
          li.querySelector('.habit-name').style.textDecoration = 'line-through';
          li.querySelector('.habit-name').style.color = '#6c757d';
        }
        habitList.appendChild(li);
      });
    };
  
    // Function to add a new habit
    const addHabit = () => {
      const habitName = habitInput.value.trim();
      if (habitName) {
        habits.push({ name: habitName, completed: false });
        habitInput.value = '';
        saveHabits();
        renderHabits();
      }
    };
  
    // Function to toggle habit completion
    window.toggleComplete = (index) => {
      habits[index].completed = !habits[index].completed;
      saveHabits();
      renderHabits();
    };
  
    // Function to delete a habit
    window.deleteHabit = (index) => {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    };
  
    // Event listeners
    addHabitBtn.addEventListener('click', addHabit);
    habitInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addHabit();
    });
  
    // Initial render
    renderHabits();
  });