import { StateHistoryPlugin } from '@datorama/akita';

import { createTodo } from './todo.model';
import { TodosStore, TodosQuery, todosQuery, todosStore as store } from './todos.store';

export class TodosFacade {
  readonly filter$ = this.query.filter$;
  readonly todos$ = this.query.visibleTodos$;
  
  readonly history: StateHistoryPlugin;

  constructor(private store: TodosStore, private query: TodosQuery) {
    this.history = new StateHistoryPlugin(todosQuery)
  }

  updateFilter(filter: number) {
    this.store.update(state => ({ ...state, filter }) );
  }

  toggleComplete({ id }) {
    store.update(id, entity => ({ completed: !entity.completed }));
  }

  addTodo(text: string) {
    this.store.add(
      createTodo(text)
    );
  }

  deleteTodo({id}) {
    this.store.remove(id);
  }
}

export const facade = new TodosFacade(store, todosQuery);
