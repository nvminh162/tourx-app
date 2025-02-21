//REDUX_TOOLKIT
import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./reduxSlicer/filtersSlice";
import todoListSlice from "./reduxSlicer/todoListSlice";

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoListSlice.reducer,
  },
});

export default store