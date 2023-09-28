// src/components/TodoItem.js
import React, { useState } from "react";
import { Box, Text, IconButton, Input, HStack } from "@chakra-ui/react";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";

function TodoItem({ todo, onTodoClick, onTodoDelete, onTodoEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (newText.trim() !== "") {
      onTodoEdit(todo.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <Box>
      {isEditing ? (
        <HStack spacing={2}>
          <Input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            size="sm"
          />
          <IconButton
            icon={<RiPencilLine />}
            onClick={handleSaveClick}
            colorScheme="teal"
            size="sm"
          />
        </HStack>
      ) : (
        <HStack spacing={2}>
          <Text
            textDecoration={todo.completed ? "line-through" : "none"}
            color={todo.completed ? "gray.500" : "inherit"}
            onClick={() => onTodoClick(todo.id)}
            flex={1}
            cursor="pointer"
            fontWeight={todo.completed ? "normal" : "bold"}

          >
            {todo.text}
          </Text>


          {!todo.completed && (
            <IconButton
              icon={<RiPencilLine />}
              onClick={handleEditClick}
              colorScheme="blue"
              size="sm"
            />
          )}
          <IconButton
            icon={<RiDeleteBinLine />}
            onClick={() => onTodoDelete(todo.id)}
            colorScheme="red"
            size="sm"
          />
        </HStack>
      )}
    </Box>
  );
}

export default TodoItem;
