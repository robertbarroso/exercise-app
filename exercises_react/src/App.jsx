import HomePage from "./pages/HomePage";
import CreateExercise from "./pages/CreateExercise";
import EditExercise from "./pages/EditExercise";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Exercise Tracker</h1>
        <p>Track all of your exercises and reach your fitness goals</p>
      </header>
      <Router>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/CreateExercise" element={<CreateExercise />}></Route>
            <Route path="/EditExercise/:id" element={<EditExercise />}></Route>
          </Routes>
        </main>
      </Router>
      <footer>
        <p>&copy; 2026 Robert Barroso</p>
      </footer>
    </>
  );
}

export default App;
