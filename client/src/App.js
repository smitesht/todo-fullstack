import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoItemForm from "./components/TodoItemForm";
import TodoItems from "./components/TodoItems";
import { TodoListProvider } from "./context/TodoListProvider";
import { HttpTodoContextProvider } from "./context/HttpTodoContextProvider";

function App() {
  const OnReloadItems = () => {};

  return (
    <div className="wrapper">
      <main className="main-wrapper">
        <HttpTodoContextProvider>
          <Header />
          <TodoItemForm onReload={OnReloadItems} />
          <TodoItems />
        </HttpTodoContextProvider>
      </main>
    </div>
  );
}

export default App;
