// src/components/TodoList.js
import React from "react";
import { Heading, List, ListItem } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onTodoClick, onTodoDelete, onTodoEdit }) {
  return (
    <List spacing={2}>

      {todos.map((todo) => (
        <ListItem key={todo.id}>
          <TodoItem
            todo={todo}
            onTodoClick={onTodoClick}
            onTodoDelete={onTodoDelete}
            onTodoEdit={onTodoEdit}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;
