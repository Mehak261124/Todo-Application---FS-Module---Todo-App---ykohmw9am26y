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
  const todos = fs.readFileSync(dbPath, 'utf-8').trim().split('\n');

  const updatedTodos = todos.map((t) => {
    const todo = JSON.parse(t);
    if (todo.id === id) {
      return JSON.stringify({
        ...todo,
        ...updates,
        updatedAt: new Date().toISOString(),
      }, null, 2);
    }
    return t;
  });
  fs.writeFileSync(dbPath, updatedTodos.join('\n') + '\n');
};


const deleteTodoSync = (id) => {
  const todos = fs.readFileSync(dbPath, 'utf-8').trim().split('\n');
  const filteredTodos = todos.filter((t) => JSON.parse(t).id !== id);
  fs.writeFileSync(dbPath, filteredTodos.join('\n') + '\n');
};


module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};

