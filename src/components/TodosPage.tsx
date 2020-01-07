import * as React from 'react';
import { useTodosHook } from '../state';

import { TodoList } from './Todos';
import { TodoForm } from './TodoForm';
import { Filters } from './Filters';

export const TodosPage: React.FC = () => {
  const {filter, todos, facade} = useTodosHook();
  const onChange = (value:any) => facade.updateFilter(value);
  const history = facade.history;

  return (
    <div>
      <button onClick={() => history.undo()} disabled={!history.hasPast}>   Undo </button>
      <button onClick={() => history.redo()} disabled={!history.hasFuture}> Redo </button>
      <TodoForm onAdd={(item) => facade.addTodo(item)} />
      <TodoList
        todos={todos}
        onToggle={(item) => facade.toggleComplete(item)}
        onDelete={(item) => facade.deleteTodo(item)}
      />
      <Filters onChange={onChange} selectedFilter={filter} />
    </div>
  );
}

