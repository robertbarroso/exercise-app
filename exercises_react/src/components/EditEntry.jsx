import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function EditEntry({ Entry }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/EditExercise/${Entry._id}`);
  };

  return (
    <button className="icon-button" onClick={handleEdit} title="Edit">
      <FaEdit />
    </button>
  );
}

export default EditEntry;
