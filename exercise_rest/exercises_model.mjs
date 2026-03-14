/**
 * Add your first name and last name.
 */
import mongoose, { mongo } from "mongoose";
import "dotenv/config";

const EXERCISE_DB_NAME = "exercise_db";
const EXERCISE_CLASS = "Exercise";

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect() {
  try {
    connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
      dbName: EXERCISE_DB_NAME,
    });
    console.log("Successfully connected to MongoDB using Mongoose!");
  } catch (err) {
    console.log(err);
    throw Error(`Could not connect to MongoDB ${err.message}`);
  }
}

const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

const Exercise = mongoose.model(EXERCISE_CLASS, exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
  const newExercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  return newExercise.save();
};

const getExercises = async (filter) => {
  const query = Exercise.find(filter);
  return query.exec();
};

const getExercise = async (filter) => {
  const query = Exercise.findById(filter);
  return query.exec();
};

const updateExercise = async (filter, resBody) => {
  const query = await Exercise.findByIdAndUpdate(filter, resBody, {
    new: true,
  });
  return query;
};

const deleteExercise = async (filter) => {
  const query = await Exercise.deleteOne({ _id: filter });
  return query.deletedCount;
};

export {
  connect,
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
};
