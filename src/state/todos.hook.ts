import {useState, useEffect} from 'react';

import { Todo} from './todo.model';
import { facade, TodosFacade } from './todos.facade';
import { TodosState } from './todo.reducer';

export type TodoHookTuple = [string, Todo[], TodosFacade ];

export function useTodosHook(): TodoHookTuple {
  const [, setState] = useState<TodosState>(null as TodosState);
  
  useEffect(() => {
    const subscription = facade.subscribe(setState);
    return () => subscription.unsubscribe();
  }, []);

  return [facade.filter, facade.todos, facade];
}
