import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function RemoveEntry({ Entry }) {
  const navigate = useNavigate();

  const handleRemoval = async () => {
    await fetch(`/exercises/${Entry._id}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  return (
    <button className="icon-button" onClick={handleRemoval} title="Delete">
      <FaTrash />
    </button>
  );
}

export default RemoveEntry;
