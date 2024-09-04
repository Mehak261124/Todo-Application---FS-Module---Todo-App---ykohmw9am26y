const fs = require('fs');
const dbPath = "./db.txt";

const getTodosSync = () => {
  const read = fs.readFileSync(dbPath, "utf-8");
  return read;
};

const getTodoSync = (id) => {
  const data = fs.readFileSync(dbPath, "utf-8");
  const formattedData = "[" + data.split("}\n{").join("},{") + "]";
  const todos = JSON.parse(formattedData);
  const todo = todos.find((item) => item.id == id);
  return JSON.stringify(todo);
};

const createTodoSync = (todo) => {
  const obj = {
    id: Date.now(),
    title: todo,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const str = JSON.stringify(obj, null, 2);
  fs.appendFileSync(dbPath, str + "\n");
};

const updateTodoSync = (id, updates) => {
  const arr = textToJson();
  const updatedData = [];
  for (todo of arr) {
    if (todo.id === id) {
      let newData = {
        ...todo,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      updatedData.push(newData);
    } else {
      updatedData.push(todo);
    }
  }
  fs.writeFileSync(path, jsonToStr(updatedData));
};

const deleteTodoSync = (id) => {
  const arr = textToJson();
  const updatedData = [];
  for (todo of arr) {
    if (todo.id !== id) {
      updatedData.push(todo);
    }
  }
  fs.writeFileSync(path, jsonToStr(updatedData));
};


module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};

