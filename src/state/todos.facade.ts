import { VISIBILITY_FILTER as Filter } from './todo.model';
import { 
  TodosState, TodosStateCallback, TodoActionType,   
  todoReducer, gatherVisibleTodos, TodoActionType as at 
} from './todo.reducer';

export const NOOP = () => {};

export interface Subscription {
  unsubscribe: () => void;
}

export class TodosFacade {
  private subscribers: TodosStateCallback[] = [];
  private cache: Readonly<TodosState> = {
    filter: Filter.SHOW_ALL,
    todos: []
  };

  get filter() { return this.cache.filter }
  get todos() { return gatherVisibleTodos(this.filter, this.cache.todos); }
  history = {
    hasPast: false,
    hasFuture: false,
    undo: NOOP,
    redo: NOOP
  };
  

  addTodo(text: string)  { this.handleAction(at.Add, text); }
  deleteTodo({id})       { this.handleAction(at.Delete, id); }
  toggleComplete({ id }) { this.handleAction(at.ToggleStatus, id); }
  updateFilter(filter: Filter) { this.handleAction(at.UpdateFilter, filter); }

  /**
   * Subscription for notifications when state changes
   */
  subscribe(notify: TodosStateCallback): Subscription {
    this.subscribers.push(notify);
    notify({...this.cache});
    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter(it => it !== notify);
      }
    };
  }

  /**
   * 1) Curry the current state...
   * 2) Reduce the action
   * 3) Update cached state
   */
  private handleAction(type: TodoActionType, payload:any) {    
    this.cache = todoReducer(this.cache, {type, payload});
    this.subscribers.map(notify => notify({...this.cache}));    
  }

}




export const facade = new TodosFacade();
