// App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import MyAccount from './components/Account';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, dispatch } = useAuth();

  return (
    <div>
      <h2>Todo App</h2>
      <div>
        <Link to="/">Home</Link> |{' '}
        {!user.isLoggedIn ? (
          <>
            <Link to="/register">Register</Link> | <Link to="/login">Login</Link> |{' '}
          </>
        ) : (
          <>
            <Link to="/profile">Account</Link> | <Link to="/todos">Todos</Link> |{' '}
            <Link to="/add-todo">Add Todo</Link> |{' '}
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT' });
              }}
            >
              Logout
            </Link>{' '}
            |
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<MyAccount />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/add-todo" element={<TodoForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
