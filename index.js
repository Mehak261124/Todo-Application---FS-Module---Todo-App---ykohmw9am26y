const fs = require("fs");
const path = "./db.txt";

const getTodosSync = () => {
  const todoData = fs.readFileSync(path, "utf-8");
  return todoData;
};

const textToJson = () => {
  const data = getTodosSync().split("}\n{");
  return JSON.parse(`[${data.join("},\n{")}]`);
};

const jsonToStr = (arr) => {
  let str = "";
  for (i of arr) {
    str += JSON.stringify(i, null, 2) + "\n";
  }
  return str;
};

const getTodoSync = (id) => {
  const newData = textToJson();
  const finalData = newData.filter((item) => item.id === id);
  return JSON.stringify(finalData[0]);
};

const createTodoSync = (todo) => {
  let newTodo = {
    id: Date.now(),
    title: todo,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  fs.appendFileSync(path, JSON.stringify(newTodo, null, 2) + "\n");
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

