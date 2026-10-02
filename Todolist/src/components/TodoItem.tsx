import { Trash } from "lucide-react";

type Priority = 'Urgent' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};
type TodoItemProps = {
    todo: Todo;
    handleDeleteTodo: (id: number) => void;
};

const TodoItem = ({ todo, handleDeleteTodo } : TodoItemProps) => {
    return (
      <li className="p-3">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
               <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
            
            <span className="text-md font-bold">
                <span>{todo.text}</span> 
            </span>
            <span className={`badge badge-sm badge-soft ${todo.priority === 'Urgent' ? 'badge-error' : todo.priority === 'Moyenne' ? 'badge-warning' : 'badge-info'}`}>
              {todo.priority}
            </span>
          </div>
          <button className="btn btn-sm btn-error btn-soft" onClick={() => handleDeleteTodo(todo.id)}>
            <Trash  className="w-4 h-4"/>
         </button>
        </div>
         
      </li>
    );
};

export default TodoItem;
