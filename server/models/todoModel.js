/*
    We create TodoItem model that associate with todoitem table in mysql
    create id as primary key, item and iscompleted
*/

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
