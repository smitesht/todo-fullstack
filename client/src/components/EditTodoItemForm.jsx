import React, { useState } from "react";

import axios from "axios";
import { useHttpTodoContext } from "../context/HttpTodoContextProvider";

const EditTodoItemForm = ({
  todo,
  onUpdateTodoItem,
  onResetUpdateItemRequest,
}) => {
  const [todoItem, setTodoItem] = useState(todo.item);

  const { saveEditItem, onReload } = useHttpTodoContext();

  const OnChangeTodoItem = (e) => {
    setTodoItem(e.target.value);
  };

  const OnSaveItem = (e) => {
    e.preventDefault();
    if (todoItem.trim().length <= 0) return false;

    const edittodo = {
      id: todo.id,
      item: todoItem,
    };
    console.log(edittodo);

    saveEditItem(edittodo);
    onResetUpdateItemRequest(edittodo);
    onReload();
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
      <button className="btn" onClick={(e) => OnSaveItem(e)}>
        SAVE
      </button>
    </form>
  );
};

export default EditTodoItemForm;
