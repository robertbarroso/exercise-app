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
          <ExerciseRow key={exercise._id} Entry={exercise} />
        ))}
      </tbody>
    </table>
  );
}

export default ExceriseTable;
