import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habits.slice";

export const store = configureStore({
    reducer: {
        habits: habitsReducer
    }
});
