import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useHttpTodoContext } from "../context/HttpTodoContextProvider";
//import { useTodoListUpdateContext } from "../context/TodoListProvider";

const TodoItem = ({ todo, updateItemRequest }) => {
  const { toggleComplete, deleteItem } = useHttpTodoContext();

  const OnToggleTaskStatus = () => {
    toggleComplete(todo);
  };

  const OnDeleteTask = () => {
    deleteItem(todo);
  };

  const OnItemUpdateRequest = () => {
    updateItemRequest(todo);
  };

  return (
    <div className="todoitem-wrapper">
      <span
        className={`todo-text ${todo.iscompleted ? "complete" : ""}`}
        onClick={OnToggleTaskStatus}
      >
        {todo.item}
      </span>
      <div className="icon-lists">
        <FaEdit className="icon-edit" size={15} onClick={OnItemUpdateRequest} />
        <FaTrash className="icon-delete" size={15} onClick={OnDeleteTask} />
      </div>
    </div>
  );
};

export default TodoItem;
