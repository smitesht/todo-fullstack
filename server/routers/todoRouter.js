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
