// src/redux/slices/animalsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  animals: [],
};

const animalsSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    addAnimal: (state, action) => {
      const newAnimal = {
        id: uuidv4(),
        ...action.payload,
      };
      state.animals.push(newAnimal);
    },
    updateAnimal: (state, action) => {
      const index = state.animals.findIndex(animal => animal.id === action.payload.id);
      if (index !== -1) {
        const oldOwner = state.animals[index].owner;
        state.animals[index] = { ...action.payload, owner: oldOwner };
      }
    },
    deleteAnimal: (state, action) => {
      state.animals = state.animals.filter(animal => animal.id !== action.payload);
    },
  },
});

export const { addAnimal, updateAnimal, deleteAnimal } = animalsSlice.actions;
export default animalsSlice.reducer;
