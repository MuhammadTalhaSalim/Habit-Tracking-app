import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addHabit } from "../Store/habits.slice";


function AddHabitForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

 


  const dispatch = useDispatch();
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addHabit({ name, frequency }));
    setName("");
  };
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  return (
    <div>
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("habitName", {
            required: { value: true, message: "this field is required" },
          })}
          type="text"
          placeholder="add a habit"
          name="habitName"
          className="mt-5 w-[90vw] p-4 border border-gray-500 rounded"
          value={name}
          onChange={handleChange}
        />
        {errors.habitName && (
          <div className="text-red-600">{errors.habitName.message}</div>
        )}
        <select
          name="frequency"
          id=""
          value={frequency}
          className="mt-5 w-[90vw] p-4 border border-gray-500 rounded"
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
        <button type="submit" className="bg-sky-600 mt-5 w-[90vw] p-3 rounded text-white text-xl cursor-pointer">
          Add Habbit
        </button>
      </form>
    </div>
  );
}

export default AddHabitForm;
