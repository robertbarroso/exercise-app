import "../App.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="app-nav">
      <Link to="/">Home</Link>
      <Link to="/CreateExercise">Create</Link>
    </nav>
  );
}

export default Navigation;
