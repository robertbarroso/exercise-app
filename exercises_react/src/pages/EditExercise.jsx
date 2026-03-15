import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

function EditExercise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    name: "",
    reps: "",
    weight: "",
    unit: "kgs",
    date: "",
  });

  const loadExercise = async () => {
    const response = await fetch(`/exercises/${id}`);
    const data = await response.json();
    setExercise(data);
  };

  useEffect(() => {
    loadExercise();
  }, [id]);

  const handleEdit = (exercise) => {
    const { name, value } = exercise.target;
    setExercise((previousEntry) => ({
      ...previousEntry,
      [name]: name === "reps" || name === "weight" ? parseInt(value) : value,
    }));
  };

  const handleSave = async () => {
    const { _id, __v, ...exerciseData } = exercise;
    const response = await fetch(`/exercises/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseData),
    });

    if (response.status === 200) {
      alert("Exercise updated successfully!");
      navigate("/");
    } else {
      alert("Exercise failed to update!");
      navigate("/");
    }
  };

  return (
    <>
      <h2>Edit Exercise</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Unit</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="name"
                value={exercise.name}
                onChange={handleEdit}
              />
            </td>
            <td>
              <input
                type="text"
                name="reps"
                value={exercise.reps}
                onChange={handleEdit}
              />
            </td>
            <td>
              <input
                type="text"
                name="weight"
                value={exercise.weight}
                onChange={handleEdit}
              />
            </td>
            <td>
              <select name="unit" value={exercise.unit} onChange={handleEdit}>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                name="date"
                value={exercise.date}
                onChange={handleEdit}
                placeholder="MM-DD-YY"
              />
            </td>
            <td>
              <button Click={handleSave}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default EditExercise;
