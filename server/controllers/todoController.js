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
