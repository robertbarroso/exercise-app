import { useState } from "react";
import "../App.css";
import ExerciseRow from "./ExerciseRow";
import { useEffect } from "react";

function ExceriseTable({ Entry }) {
  const [exercises, setExercises] = useState([]);

  const loadExercises = async () => {
    const entry = await fetch("/exercises");
    const exercise = await entry.json();
    setExercises(exercise);
  };

  const onDelete = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      const getResponse = await fetch("/exercises");
      const data = await getResponse.json();
      setExercises(data);
    } else {
      console.error(
        `Failed to delete exercise id=${_id}, status=${response.status}`,
      );
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
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
        {exercises.map((exercise) => (
          <ExerciseRow
            key={exercise._id}
            Entry={exercise}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ExceriseTable;
