// components/TodoForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const { todos, dispatch } = useTodos();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const todoToEdit = todos.find((todo) => todo.id === parseInt(id));
      if (todoToEdit) {
        setTitle(todoToEdit.title);
      }
    }
  }, [id, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch({ type: "EDIT", payload: { id: parseInt(id), title } });
    } else {
      const todo = {
        id: Number(new Date()),
        title,
        isCompleted: false,
      };
      dispatch({ type: "ADD", payload: todo });
    }
    navigate("/list");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        required
      />
      <button type="submit">{id ? "Update Todo" : "Add Todo"}</button>
    </form>
  );
};

export default TodoForm;
