import * as React from 'react';
import { Todo } from '../state';

export interface TodoListProps {
  todos: Todo[];
  onToggle: (item: Todo) => void;
  onDelete: (item: Todo) => void;
}

export interface TodoItemProps {
  todo: Todo;
  toggleComplete: (item: Todo) => void;
  deleteTodo: (item: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({todo, toggleComplete, deleteTodo}) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} className="todoItem">
      <span style={{ marginRight: '10px' }} >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo)}>Delete</button>
      <button onClick={() => toggleComplete(todo)}>Toggle as Complete</button>
    </li>
  );
};

export const TodoList: React.FC<TodoListProps> = ({todos, onToggle, onDelete}) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={onToggle}
          deleteTodo={onDelete}
        />
      ))}
    </ul>
  );
};