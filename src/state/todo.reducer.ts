import {switchCase} from '@mindspace-io/utils';
import { ID } from '@datorama/akita';
import { VISIBILITY_FILTER, Todo, createTodo} from './todo.model';

export interface TodosState {
  todos: Todo[];
  filter: VISIBILITY_FILTER;
}

export type TodosStateCallback = (state:TodosState) => void;

export const enum TodoActionType {
  Add          = 'add',
  Delete       = 'delete',
  ToggleStatus = 'toggleCompleted',
  UpdateFilter = 'updateFilter'
};

export interface TodoAction {
  type: TodoActionType,
  payload: any
}

export const todoReducer = (state: TodosState, action: TodoAction) => {
  const list = state.todos;
  switch(action.type) {
    case TodoActionType.Add          : state = {...state, todos: [...list, createTodo(action.payload)]};        break;
    case TodoActionType.Delete       : state = {...state, todos: list.filter(it => it.id !== action.payload)};  break;
    case TodoActionType.ToggleStatus : state = {...state, todos: list.map(toggleComplete(action.payload))};     break;

    case TodoActionType.UpdateFilter : state = {...state, filter: action.payload}; break;
  };

  return state;
}

function toggleComplete(id: ID) {
  return (todo: Todo) => {
    if (todo.id === id) {
      todo = { ...todo, completed: !todo.completed }
    }
    return todo;
  }
}

export function gatherVisibleTodos(filter, todos): Todo[] {
  const withFilter = switchCase({
    [VISIBILITY_FILTER.SHOW_ACTIVE]   : () => todos.filter(t => !t.completed),
    [VISIBILITY_FILTER.SHOW_COMPLETED]: () => todos.filter(t => t.completed)
  }, todos || []);

  return withFilter(filter);
};
