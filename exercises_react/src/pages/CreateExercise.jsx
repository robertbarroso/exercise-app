import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CreateExercises() {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    name: "",
    reps: "",
    weight: "",
    unit: "kgs",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exerciseData = {
      name: exercise.name,
      reps: parseInt(exercise.reps),
      weight: parseInt(exercise.weight),
      unit: exercise.unit,
      date: exercise.date,
    };

    const response = await fetch("/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseData),
    });

    if (response.ok) {
      alert("Exercise created successfully!");
      navigate("/");
    } else {
      alert("Failed to create exercise!");
      navigate("/");
    }
  };

  return (
    <>
      <h2>Create Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={exercise.name}
            placeholder="Squats, Treadmill, etc..."
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="text"
            name="reps"
            value={exercise.reps}
            placeholder="5, 10, 15, etc..."
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="text"
            name="weight"
            value={exercise.weight}
            placeholder="50, 60, 70..."
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Unit:</label>
          <select name="unit" value={exercise.unit} onChange={handleChange}>
            <option value="kgs">kgs</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={exercise.date}
            onChange={handleChange}
            placeholder="MM-DD-YY"
            required
          />
        </div>
        <button type="submit" className="icon-button">
          Create
        </button>
      </form>
    </>
  );
}

export default CreateExercises;
