import "../App.css";
import RemoveEntry from "./RemoveEntry";
import EditEntry from "./EditEntry";

function OrderRow({ Entry }) {
  return (
    <tr>
      <td>{Entry.name}</td>
      <td>{Entry.reps}</td>
      <td>{Entry.weight}</td>
      <td>{Entry.unit}</td>
      <td>{Entry.date}</td>
      <td>
        <RemoveEntry Entry={Entry} />
      </td>
      <td>
        <EditEntry Entry={Entry} />
      </td>
    </tr>
  );
}

export default OrderRow;
