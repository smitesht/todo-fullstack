import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

import EditTodoItemForm from "./EditTodoItemForm";
import axios from "axios";
import { useHttpTodoContext } from "../context/HttpTodoContextProvider";

const TodoItems = () => {
  const { TodoList } = useHttpTodoContext();
  const [updateReq, setUpdateReq] = useState({});

  const OnItemUpdateRequest = (todo) => {
    const todoUpdate = {
      id: todo.id,
      isUpdate: true,
    };

    setUpdateReq(todoUpdate);
  };

  const OnResetItemUpdateRequest = (todo) => {
    const todoUpdate = {
      id: todo.id,
      isUpdate: false,
    };

    setUpdateReq(todoUpdate);
  };

  return (
    <div className="todoitems-wrapper boxshadow">
      {TodoList.length <= 0 ? (
        <h3>Empty List</h3>
      ) : (
        TodoList.map((todo, ind) => {
          return todo.id === updateReq.id && updateReq.isUpdate ? (
            <EditTodoItemForm
              key={todo.id}
              todo={todo}
              onResetUpdateItemRequest={OnResetItemUpdateRequest}
            />
          ) : (
            <TodoItem
              key={todo.id}
              todo={todo}
              updateItemRequest={OnItemUpdateRequest}
            />
          );
        })
      )}
    </div>
  );
};

export default TodoItems;
