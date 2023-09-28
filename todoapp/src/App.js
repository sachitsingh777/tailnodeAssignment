// src/components/TodoApp.js
import React, { useState, useEffect } from "react";
import { Container, Box, Heading, Input, Button, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";

import TodoList from "./components/TodoList";
import "./App.css";
import { FaArrowRight } from "react-icons/fa";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const savedActiveTodos = localStorage.getItem("activeTodos");
    if (savedActiveTodos) {
      setTodos(JSON.parse(savedActiveTodos));
    }

    const savedCompletedTodos = localStorage.getItem("completedTodos");
    if (savedCompletedTodos) {
      setCompletedTodos(JSON.parse(savedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTodos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos((prevTodos) => [todo, ...prevTodos]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const toggledTodo = todos.find((todo) => todo.id === id);

    if (toggledTodo) {
      if (toggledTodo.completed) {

        setCompletedTodos((prevCompletedTodos) =>
          prevCompletedTodos.filter((todo) => todo.id !== id)
        );
        setTodos((prevTodos) => {
          const activeTodo = updatedTodos.find((todo) => todo.id === id);
          if (activeTodo) {
            return [activeTodo, ...prevTodos];
          } else {
            return prevTodos;
          }
        });
      } else {

        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== id)
        );
        setCompletedTodos((prevCompletedTodos) => {
          const completedTodo = updatedTodos.find((todo) => todo.id === id);
          if (completedTodo) {
            return [completedTodo, ...prevCompletedTodos];
          } else {
            return prevCompletedTodos;
          }
        });
      }
    }
  };


  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setCompletedTodos((prevCompletedTodos) => prevCompletedTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    const updatedCompletedTodos = completedTodos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setCompletedTodos(updatedCompletedTodos);
  };

  const resetTodos = () => {
    setTodos([]);
    setCompletedTodos([]);
  };
  console.log(completedTodos)
  return (
    <Container className="container" maxW="md" mt={4} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" mb={4} textAlign="center">
        <span style={{ color: "#FF5733" }}>T</span>
        <span style={{ color: "#FFCE33" }}>O</span>
        <span style={{ color: "#33FF6F" }}>D</span>
        <span style={{ color: "#33D1FF" }}>O</span>
        <span style={{ color: "#FF336F" }}> </span>
        <span style={{ color: "#FF5733" }}>A</span>
        <span style={{ color: "#FFCE33" }}>P</span>
        <span style={{ color: "#33FF6F" }}>P</span>
      </Heading>
      <Box mb={4}>

        <InputGroup size='sm'>
          <Input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <InputRightElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            <Box as={FaArrowRight} />
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="teal" size="sm" onClick={addTodo} ml={2} mt="4">
          Add
        </Button>
      </Box>
      <Heading as="h1" mb={4} textAlign="center" color={todos.length > 0 ? "green" : "gray"}>
        Active Todos
      </Heading>
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
        onTodoDelete={deleteTodo}
        onTodoEdit={editTodo}
      />
      {completedTodos.length > 0 && (
        <Box>
          <Heading as="h2" size="md" mb={2} textAlign="center" color={completedTodos.length > 0 ? "red" : "gray"}>
            Completed Todos
          </Heading>
          <TodoList
            todos={completedTodos}
            onTodoClick={toggleTodo}
            onTodoDelete={deleteTodo}
            onTodoEdit={editTodo}
          />
        </Box>
      )}
      {(todos.length > 0 || completedTodos.length > 0) && (
        <Box textAlign="right" mt={4}>
          <Button
            colorScheme="red"
            size="sm"
            onClick={resetTodos}
          >
            Reset
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
