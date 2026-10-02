import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { Construction } from "lucide-react";

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
  
  const urgentCount = todos.filter((todo) => todo.priority === 'Urgent').length;
  const moyenneCount = todos.filter((todo) => todo.priority === 'Moyenne').length;
  const basseCount = todos.filter((todo) => todo.priority === 'Basse').length;  
  const totalCount = todos.length;

  function handleDeleteTodo(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
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
              Tous({totalCount})
            </button>
            <button className={`btn btn-soft ${filter ==="Urgent" ? "btn-primary" : ""}`} onClick={() => setFilter('Urgent') }>
              Urgent({urgentCount})
            </button>
            <button className={`btn btn-soft ${filter ==="Moyenne" ? "btn-primary" : ""}`} onClick={() => setFilter('Moyenne') }>
              Moyenne({moyenneCount})
            </button>
            <button className={`btn btn-soft ${filter ==="Basse" ? "btn-primary" : ""}`} onClick={() => setFilter('Basse') }>
              Basse({basseCount})
            </button>
          </div>
         </div>
         {filteredTodos.length > 0 ? (
          <ul className="divide-y divide-primary/20">
            {filteredTodos.map((todo) => (
              <li key={todo.id} >
                <TodoItem todo={todo} handleDeleteTodo={handleDeleteTodo}  />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center flex-col p-5">
            <div>
              <Construction className="w-12 h-12 text-primary" />
            </div>
            <p>Aucune tâche à afficher.</p>
          </div>
        )}

        </div>
    </div>
  )
}

export default App
