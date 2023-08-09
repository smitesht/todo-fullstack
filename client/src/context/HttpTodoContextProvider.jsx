import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const HttpTodoContext = createContext();

export const useHttpTodoContext = () => {
  return useContext(HttpTodoContext);
};

export const HttpTodoContextProvider = ({ children }) => {
  const BASE_URL = "http://localhost:8181/todo/";

  const [TodoList, setTodoList] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    getAll();
  }, [reload]);

  const getAll = () => {
    axios
      .get(BASE_URL)
      .then((res) => {
        setTodoList(res.data.message);
        //setReload(!reload);
      })
      .catch((err) => console.error(err));
  };

  const addNewItem = (todo) => {
    axios
      .post(BASE_URL, todo)
      .then((res) => {
        setReload((data) => (data = !data));
      })
      .catch((err) => console.error(err));
  };

  const toggleComplete = (todo) => {
    const URL = BASE_URL + "completed/" + todo.id;
    console.log(URL);

    const data = {
      iscompleted: !todo.iscompleted,
    };
    axios
      .put(URL, data)
      .then((resp) => {
        setReload(!reload);
      })
      .catch((err) => console.error(err));
  };

  const saveEditItem = (todo) => {
    console.log(todo);
    axios
      .put(BASE_URL + todo.id, todo)
      .then((res) => {
        console.log(res);
        setReload((data) => (data = !data));
      })
      .catch((err) => console.log(err));
  };

  const onReload = () => {
    setReload((data) => (data = !data));
  };

  const deleteItem = (todo) => {
    axios
      .delete(BASE_URL + todo.id)
      .then((resp) => {
        setReload((data) => (data = !data));
      })
      .catch((err) => console.error(err));
  };

  return (
    <HttpTodoContext.Provider
      value={{
        TodoList,
        addNewItem,
        toggleComplete,
        saveEditItem,
        onReload,
        deleteItem,
      }}
    >
      {children}
    </HttpTodoContext.Provider>
  );
};
