import { createSelector } from "@reduxjs/toolkit";

export const searchTextSelector = (state) => state.filters.search;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritiesSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList;

export const todosRemainingSelector = createSelector(
  searchTextSelector,
  filterStatusSelector,
  filterPrioritiesSelector,
  todoListSelector,
  (search, status, priorities, todoList) => {
    return todoList.filter((todo) => {
      const matchesSearch = todo.name.includes(search);
      const matchesStatus =
        status === "All" || (status === "Completed" ? todo.completed : !todo.completed);
      const matchesPriority = !priorities.length || priorities.includes(todo.priority);

      return [matchesSearch, matchesStatus, matchesPriority].every(Boolean);
    });
  }
);