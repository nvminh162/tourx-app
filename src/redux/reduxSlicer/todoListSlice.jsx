import { createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line react-refresh/only-export-components
export default createSlice({
  name: "todoList",
  initialState: [
    { id: 1, name: "Learn Redux", completed: true, priority: "Medium" },
    { id: 2, name: "Learn Axios", completed: true, priority: "High" },
    { id: 3, name: "Sleep", completed: false, priority: "Low" },
  ],
  //=> { type: `todoList/addTodo` }
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    }, //action creators
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if(currentTodo) {
        currentTodo.completed = !currentTodo.completed
      }
    },
  },
});
