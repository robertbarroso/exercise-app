import { FaTrash } from "react-icons/fa";

function RemoveEntry({ Entry, onDelete }) {
  const handleRemoval = async () => {
    if (onDelete) {
      await onDelete(Entry._id);
    } else {
      const response = await fetch(`/exercises/${Entry._id}`, {
        method: "DELETE",
      });
      if (response.status !== 204) {
        console.error(
          `Failed to delete exercise id=${Entry._id}, status=${response.status}`,
        );
      }
    }
  };

  return (
    <button className="icon-button" onClick={handleRemoval} title="Delete">
      <FaTrash />
    </button>
  );
}

export default RemoveEntry;
