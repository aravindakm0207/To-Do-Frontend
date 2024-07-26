// components/TodoList.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

const TodoList = () => {
  const { todos, dispatch } = useTodos();
  const [editingTodo, setEditingTodo] = useState(null);
  const [title, setTitle] = useState("");

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch({ type: "EDIT", payload: { id: editingTodo.id, title } });
    setEditingTodo(null);
    setTitle("");
  };

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setTitle("");
  };

  return (
    <div>
      <h2>Listing Todos - {todos.length}</h2>
      <ul>
        {todos.map((ele) => (
          <li key={ele.id}>
            <input
              type="checkbox"
              checked={ele.isCompleted}
              onChange={() => dispatch({ type: "CHANGE", payload: ele.id })}
            />
            {editingTodo && editingTodo.id === ele.id ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                {ele.title}
                <button onClick={() => handleEdit(ele)}>Edit</button>
                <button onClick={() => handleDelete(ele.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
