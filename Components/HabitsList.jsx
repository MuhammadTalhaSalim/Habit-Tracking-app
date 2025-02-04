import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { toggleHabit, removeHabit } from "../Store/habits.slice";

const getStreak = (habit) => {
  let streak = 0;
  const currentDate = new Date(); // Get the current date

  while (true) {
    const dateString = currentDate.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"

    if (habit.completedDates.includes(dateString)) {
      streak++; // Increase streak
      currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
    } else {
      break; // Stop streak count if a day is missed
    }
  }

  return streak;
};

function HabitsList() {
  const habits = useSelector((state) => state.habits.habits); // Fetching the initial state from the slice
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleHabit({ id }));
  };

  const handleDelete = (id) => {
    dispatch(removeHabit({ id }));
  };

  return (
    <div>
      <div className="mt-14 text-2xl text-sky-600">Habits List</div>
      <div className="mt-5 w-[90vw] p-3 rounded bg-slate-300 flex flex-col items-center">
        {habits.length > 0 ? (
          habits.map((item) => (
            <div className="mt-5 w-[85vw] p-3 rounded text-black text-xl bg-slate-200" key={item.id}>
              <div className="flex justify-evenly">
                <div className="flex flex-col">
                  <p className="text-xl">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.frequency}</p>
                </div>

                <div className="flex gap-5">
                  <button
                    onClick={() => handleToggle(item.id)}
                    className={`flex ${
                      item.completed ? "bg-green-500 text-white" : "bg-amber-100 text-blue-600"
                    } text-[16px] gap-1 justify-center p-2 rounded items-center cursor-pointer`}
                  >
                    {item.completed ? "Today Completed" : "Mark Completed"} <IoCheckmarkDoneCircle />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex bg-amber-100 text-[16px] gap-1 text-red-600 p-2 rounded items-center cursor-pointer"
                  >
                    Remove <MdDelete />
                  </button>
                  <p className="p-2">Streak: {getStreak(item)} days</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>There are no Habits yet</p>
        )}
      </div>
    </div>
  );
}

export default HabitsList;
