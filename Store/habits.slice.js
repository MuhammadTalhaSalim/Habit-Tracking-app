import { createSlice } from "@reduxjs/toolkit";

// Load habits from local storage
const loadHabitsFromLocalStorage = () => {
  const storedHabits = localStorage.getItem("habits");
  return storedHabits ? JSON.parse(storedHabits) : [];
};

// Save habits to local storage
const saveHabitsToLocalStorage = (habits) => {
  localStorage.setItem("habits", JSON.stringify(habits));
};

// Initial state with loaded habits
const initialState = {
  habits: loadHabitsFromLocalStorage(),
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.push({
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completed: false,
        completedDates: [],
        createdAt: new Date().toISOString(),
      });

      saveHabitsToLocalStorage(state.habits); // Save updated habits
    },

    removeHabit: (state, action) => {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload.id);
      saveHabitsToLocalStorage(state.habits); // Save updated habits
    },

    toggleHabit: (state, action) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        habit.completed = !habit.completed;

        const today = new Date().toISOString().split("T")[0];

        if (habit.completed) {
          if (!habit.completedDates.includes(today)) {
            habit.completedDates.push(today);
          }
        } else {
          habit.completedDates = habit.completedDates.filter((date) => date !== today);
        }
      }
      
      saveHabitsToLocalStorage(state.habits); // Save updated habits
    },
  },
});

export const { addHabit, removeHabit, toggleHabit } = habitSlice.actions;
export default habitSlice.reducer;
