import { StateHistoryPlugin } from '@datorama/akita';
import { produce } from 'immer';

import { createTodo, Todo, VISIBILITY_FILTER } from './todo.model';
import { TodosStore, TodosQuery, todosQuery, todosStore, TodosState } from './todos.store';

export class TodosFacade {
  readonly filter$ = this.query.filter$;
  readonly todos$ = this.query.visibleTodos$;
  
  readonly history: StateHistoryPlugin;

  constructor(private store: TodosStore, private query: TodosQuery) {
    this.history = new StateHistoryPlugin(todosQuery);
  }

  updateFilter(filter: VISIBILITY_FILTER) {
    this.store.update( produce((draft:TodosState) => { 
      draft.filter = filter; 
    }));
  }

  toggleComplete({ id }: Todo) {
    this.store.update(id, entity => ({ completed: !entity.completed }));
  }

  addTodo(text: string) {
    this.store.add(
      createTodo(text)
    );
  }

  deleteTodo({id}: Todo) {
    this.store.remove(id);
  }
}

export const facade = new TodosFacade(todosStore, todosQuery);
