import React, { useState } from "react";
import axios from "axios";
import { useHttpTodoContext } from "../context/HttpTodoContextProvider";

const TodoItemForm = () => {
  const [todoItem, setTodoItem] = useState("");

  const { addNewItem } = useHttpTodoContext();

  const OnChangeTodoItem = (e) => {
    setTodoItem(e.target.value);
  };

  const OnAddTodoItem = (e) => {
    e.preventDefault();
    if (todoItem.trim().length <= 0) return false;
    const todo = {
      item: todoItem,
    };

    addNewItem(todo);
    setTodoItem("");
  };

  return (
    <form className="form-wrapper boxshadow">
      <input
        className="input-text"
        type="text"
        placeholder="Enter Task"
        value={todoItem}
        onChange={(e) => OnChangeTodoItem(e)}
      />
      <button className="btn" onClick={(e) => OnAddTodoItem(e)}>
        ADD
      </button>
    </form>
  );
};

export default TodoItemForm;
