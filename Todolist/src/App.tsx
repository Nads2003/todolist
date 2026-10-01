import { useEffect, useState } from "react";

type Priority = 'Urgent' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};



function App() {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<Priority>('Moyenne');

  const savedTodos = localStorage.getItem('todos');
  const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<'Tous' | Priority>('Tous');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
   
  function addTodo() {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      priority: priority,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInputValue('');
    setPriority('Moyenne'); 
     console.log(newTodos); 
  }
  let filteredTodos: Todo[] = todos;
  if (filter === 'Tous') {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }
  return (
    <div className="flex justify-center">
       <div className="w-1/2 flex flex-col gap-4 my-15 bg-base-300 ps-5 rounded-2xl">
         <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tâche..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select name="priority" id="" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}  className="select w-full">
            <option value="Urgent">Urgent</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="btn btn-primary" onClick={addTodo}>Ajouter</button>
         </div>
         <div className="space-y flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <button className={`btn btn-soft ${filter ==="Tous" ? "btn-primary" : ""}`} onClick={() => setFilter('Tous') }>
              Tous
            </button>

          </div>
         </div>
         {filteredTodos.length > 0 ? (
          <ul className="divide-y divide-primary/20">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="flex justify-between items-center gap-4 bg-base-100 p-4 rounded-lg">
                <span>{todo.text}</span>
                <span className={`badge ${todo.priority === 'Urgent' ? 'badge-error' : todo.priority === 'Moyenne' ? 'badge-warning' : 'badge-success'}`}>
                  {todo.priority}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune tâche à afficher.</p>
        )}

        </div>
    </div>
  )
}

export default App
