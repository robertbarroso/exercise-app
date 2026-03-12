/**
 * Robert Barroso
 */
import "dotenv/config";
import express from "express";
import asyncHandler from "express-async-handler";
import * as exercises from "./exercises_model.mjs";

const PORT = process.env.PORT || 3000;
const app = express();

function isDateValid(date) {
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

const ERROR_INVALID_REQUEST = { Error: "Invalid request" };
const ERROR_NOT_FOUND = { Error: "Not found" };

app.use(express.json());

app.listen(PORT, async () => {
  await exercises.connect();
  console.log(`Server listening on port ${PORT}...`);
});

function validateInput(req) {
  if (
    req.body.name === undefined ||
    req.body.reps === undefined ||
    req.body.weight === undefined ||
    req.body.unit === undefined ||
    req.body.date === undefined ||
    req.body.name.length <= 0 ||
    req.body.reps <= 0 ||
    !Number.isInteger(req.body.reps) ||
    req.body.weight <= 0 ||
    !Number.isInteger(req.body.weight) ||
    (req.body.unit !== "kgs" && req.body.unit !== "lbs") ||
    isDateValid(req.body.date) === false
  ) {
    return false;
  }
  return true;
}

// POST /exercises
app.post(
  "/exercises",
  asyncHandler(async (req, res) => {
    if (!validateInput(req)) {
      res.status(400).json(ERROR_INVALID_REQUEST);
    }
    const newExercise = await exercises.createExercise(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date,
    );

    res.status(201).json(newExercise);
  }),
);

// GET /exercises
app.get(
  "/exercises",
  asyncHandler(async (req, res) => {
    const resultExercises = await exercises.getExercises(req.query);
    return res.status(200).json(resultExercises);
  }),
);

// GET /exercises/:_id
app.get(
  "/exercises/:id",
  asyncHandler(async (req, res) => {
    const resultExercise = await exercises.getExercise(req.params.id);
    if (!resultExercise) {
      res.status(404).json(ERROR_NOT_FOUND);
    } else {
      res.status(200).json(resultExercise);
    }
  }),
);

// PUT /exercises/:_id
app.put(
  "/exercises/:id",
  asyncHandler(async (req, res) => {
    if (!validateInput(req)) {
      res.status(400).json(ERROR_INVALID_REQUEST);
    }
    const resultExercise = await exercises.updateExercise(
      req.params.id,
      req.body,
    );
    if (!resultExercise) {
      res.status(404).json(ERROR_NOT_FOUND);
    } else {
      res.status(200).json(resultExercise);
    }
  }),
);

// DELETE /exercises/:_id
app.delete(
  "/exercises/:id",
  asyncHandler(async (req, res) => {
    const resultExercise = await exercises.deleteExercise(req.params.id);
    if (!resultExercise) {
      res.status(404).json(ERROR_NOT_FOUND);
    } else {
      return res.status(204).send();
    }
  }),
);
