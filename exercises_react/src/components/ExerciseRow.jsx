import "../App.css";
import RemoveEntry from "./RemoveEntry";
import EditEntry from "./EditEntry";

function ExerciseRow({ Entry, onDelete }) {
  return (
    <tr>
      <td>{Entry.name}</td>
      <td>{Entry.reps}</td>
      <td>{Entry.weight}</td>
      <td>{Entry.unit}</td>
      <td>{Entry.date}</td>
      <td>
        <RemoveEntry Entry={Entry} onDelete={onDelete} />
      </td>
      <td>
        <EditEntry Entry={Entry} />
      </td>
    </tr>
  );
}

export default ExerciseRow;
