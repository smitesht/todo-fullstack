# ToDO Fullstack
### Todo List App using Node Express React MySQL Sequelize

![todo-full-stack-app](https://github.com/smitesht/todo-fullstack/assets/52151346/042d99d6-4ab1-43ac-8591-b51a9b6ae22f)

### High-Level Diagram

![Todo List - fullstack HLD](https://github.com/smitesht/todo-fullstack/assets/52151346/058072b4-eac1-4f62-a4fa-fa0dbf0b2217)

## Server: NodeJS ExpressJS Sequelize MySQL

NodeJS and ExpressJS are used to create REST APIs for CRUD operations.
Sequelize is an ORM that creates Models/Entities that maps with the MySQL database.

![image](https://github.com/smitesht/todo-fullstack/assets/52151346/b2ad3650-cc60-4ad8-8726-aa483eb502a2)

## Express Sequelize ORM Model

### Create DB Config
```
module.exports = {
  DB: "todo_db",
  USER: "root",
  PASSWORD: "admin",
  HOST: "localhost",
  dialect: "mysql",
};
```

### Create Model

```
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define(
    "todoitem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      iscompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return TodoItem;
};
```
### Sequelize ORM Authentication
```
const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../db/dbConfig");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

sequelize
  .authenticate()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.TodoItems = require("./todoModel")(sequelize, DataTypes);

sequelize
  .sync({ force: false })
  .then(() => console.log("db sync..."))
  .catch((err) => console.log(err));

module.exports = db;

```

### Controller

```
const db = require("../models");

const TodoItem = db.TodoItems;

// 1) Create new todo item

const newTodoItem = async (req, resp) => {
  try {
    let data = {
      item: req.body.item,
      iscompleted: false,
    };

    const todo = await TodoItem.create(data);
    resp.status(201).json({ message: todo });
  } catch (err) {
    resp.status(500).json({ message: err });
  }
};

const getAll = async (req, resp) => {
  const todos = await TodoItem.findAll({});

  resp.status(200).json({ message: todos });
};

const getById = async (req, resp) => {
  const id = req.params.id;
  const todo = await TodoItem.findByPk(id);

  if (todo === null) {
    resp.status(404).json({ message: `Todo Item does not exists` });
  } else {
    resp.status(200).json(todo);
  }
};

const updateTodoItem = async (req, resp) => {
  const id = req.params.id;

  try {
    const result = await TodoItem.update(
      { item: req.body.item },
      { where: { id: id } }
    );

    //console.log(result);

    //if (result[0] === 0) {
    //  resp.status(404).json({ message: "Record does not exist" });
    //} else {
    resp.status(200).json({ message: "Record updated" });
    // }
  } catch (err) {
    resp.status(500).json({ message: "Error while updating database" });
  }
};

const deleteTodoItem = async (req, resp) => {
  const id = req.params.id;
  await TodoItem.destroy({ where: { id: id } });
  resp.status(200).json({ message: "Record deleted" });
};

const updateCompletedItem = async (req, resp) => {
  const id = req.params.id;

  try {
    const result = TodoItem.update(
      { iscompleted: req.body.iscompleted },
      { where: { id: id } }
    );

    resp.status(200).json({ message: "Record updated" });
  } catch (err) {
    resp.status(500).json({ message: "Error while updating database" });
  }
};

module.exports = {
  newTodoItem,
  getAll,
  getById,
  updateTodoItem,
  updateCompletedItem,
  deleteTodoItem,
};

```

### Router

```
const todoController = require("../controllers/todoController");
const express = require("express");
const todoRouter = express.Router();

todoRouter.post("/", todoController.newTodoItem);
todoRouter.get("/", todoController.getAll);
todoRouter.get("/:id", todoController.getById);
todoRouter.put("/:id", todoController.updateTodoItem);
todoRouter.put("/completed/:id", todoController.updateCompletedItem);
todoRouter.delete("/:id", todoController.deleteTodoItem);

module.exports = todoRouter;

```

### Server
```
const express = require("express");
const cors = require("cors");

const todoRouter = require("./routers/todoRouter");

//create express object
const app = express();

// define try to fetch from env variable PORT if not there use 8181
const PORT = process.env.PORT | 8181;

// use urlencoded and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// allows localhost to CORS
const corsOption = {
  origin: "http://localhost:8181/todo/",
};

app.use(cors());

app.get("/", (req, resp) => {
  resp.json({ message: "test" });
});

app.use("/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`Server started listening at port ${PORT}`);
});

```

# UI
![main-image](https://github.com/smitesht/todo-fullstack/assets/52151346/292a52ee-39ea-49f3-b485-cd66d8e6b5c0)

### HTTP Context API

```
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
  
```

