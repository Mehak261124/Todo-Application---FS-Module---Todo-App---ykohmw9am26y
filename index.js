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
  const todos = fs.readFileSync(dbPath, 'utf-8').split('\n').filter(Boolean).map((t) => JSON.parse(t));
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    }
    return todo;
  }).map((t) => JSON.stringify(t, null, 2)); // Re-stringify each todo object
  fs.writeFileSync(dbPath, updatedTodos.join('\n') + '\n');
};

const deleteTodoSync = (id) => {
  const todos = fs.readFileSync(dbPath, 'utf-8').split('\n').filter(Boolean).map((t) => JSON.parse(t));
  const filteredTodos = todos.filter((todo) => todo.id !== id).map((t) => JSON.stringify(t, null, 2)); // Re-stringify each todo object
  fs.writeFileSync(dbPath, filteredTodos.join('\n') + '\n');
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};

