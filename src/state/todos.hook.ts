 import {useObservable} from '@mindspace-io/utils';

import { facade, TodosFacade } from './todos.facade';
import { VISIBILITY_FILTER as v, Todo} from './todo.model';

export type TodoHookState = {
  filter: string;
  todos: Todo[];
  facade: TodosFacade;
}

export function useTodosHook(): TodoHookState {
  const [filter] = useObservable(facade.filter$, v.SHOW_ALL);
  const [todos] = useObservable(facade.todos$, []);

  return {filter, todos: (todos || []) , facade};
}