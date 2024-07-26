// TodoContext.js
import React, { createContext, useReducer, useContext } from "react";

const TodoContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    case "REMOVE": {
      return state.filter((ele) => ele.id !== action.payload);
    }
    case "CHANGE": {
      return state.map((ele) => {
        if (ele.id === action.payload) {
          return { ...ele, isCompleted: !ele.isCompleted };
        } else {
          return ele;
        }
      });
    }
    case "EDIT": {
      return state.map((ele) => {
        if (ele.id === action.payload.id) {
          return { ...ele, title: action.payload.title };
        } else {
          return ele;
        }
      });
    }
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
