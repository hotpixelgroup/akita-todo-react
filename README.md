## React Facades + RxJS

This repository provides tutorials to demonstrate the use of great state management using RxJS, Facades, and Akita.

[![image](https://user-images.githubusercontent.com/210413/72391576-2392d680-36f3-11ea-84ae-f5598f04d10a.png)](https://codesandbox.io/s/react-todo-akita-final-qz7m3)

>  Click here for [Live Demo](https://codesandbox.io/s/react-todo-akita-final-qz7m3)

<br/>

### Introduction

Powerful state management is easily supported... with super clean views. With the *custom hook + Facade* architecture handles all the complexity of state management, data pushing to views, and view change detections.

[![](https://i.imgur.com/nPw0SOZ.png)](http://bit.ly/react-facades)

Unlike Redux - where developers have to dispatch actions - the `TodosFacade` API is called directly from the view component event handlers. 
> This approach radically simplifies the code complexity and reduces cruft.

<br/>

----

<br/>

### Blog Post

[![image](https://user-images.githubusercontent.com/210413/72539488-fe15e200-3844-11ea-9628-5a80f1a55dc9.png)](http://bit.ly/react-facades)

Developers are encouraged to read the full-tutorial blog post: [**RxJS Facades in React**](http://bit.ly/react-facades)

<br/>

----

<br/>

### Using custom hook `useTodosHook`

```jsx
export const TodosPage: React.FC = () => {
  const [filter, todos, facade] = useTodosHook();
  const history = facade.history;

  return (
    <div className="todoPage">
      <div className="toolbar">
        <Filters onChange={val => facade.updateFilter(val)} selectedFilter={filter} />
        <TodoForm onAdd={(item) => facade.addTodo(item)} />
        
        <div className="history">
          <button onClick={() => history.undo()} disabled={!history.hasPast}>   Undo </button>
          <button onClick={() => history.redo()} disabled={!history.hasFuture}> Redo </button>
        </div>
      </div>

      
      <TodoList
        todos={todos}
        onToggle={(item) => facade.toggleComplete(item)}
        onDelete={(item) => facade.deleteTodo(item)}
      />
    </div>
  );
};
```

### Implement Custom Hooks + Observables

With a custom facade `TodosFacade` and hook `useObservable()`, implementing a Todo hook is trivial.
> Notice the use of Akita state management is hidden inside the `TodosFacade` implementation

```ts
import { useObservable } from '@mindspace-io/utils';
import { facade, TodosFacade } from './todos.facade';
import { VISIBILITY_FILTER as v, Todo} from './todo.model';

export type TodoHookTuple = [string, Todo[], TodosFacade ];

export function useTodosHook(): TodoHookTuple {
  const [filter] = useObservable(facade.filter$, v.SHOW_ALL);
  const [todos] = useObservable(facade.todos$, []);

  return [filter, todos, facade];
}
```

### Implement the Facade with Akita

Akita will manage state for Todos, immutable 1-way data flows, and data pushing via stream queries.

```ts
export class TodosFacade {
  readonly filter$ = this.query.filter$;
  readonly todos$ = this.query.visibleTodos$;  
  readonly history = new StateHistoryPlugin(this.todosQuery);

  constructor(private store: TodosStore, private query: TodosQuery) { }

  addTodo(text: string)        { this.store.add( createTodo(text)); }
  deleteTodo({id}: Todo)       { this.store.remove(id); }
  updateFilter(filter: number) { this.store.update({filter}) }  
  toggleComplete({ id }: Todo) { this.store.update(id, entity => {
    return { completed: !entity.completed };
  ))};
}

export const facade = new TodosFacade(todosStore, todosQuery);
```

### Enforcing immutable data with ImmerJS

Immer.js will protect all state data from external, direct mutations. Using the `produce(...)` function the facade can easily mutate a **draft** version:

```ts
import { produce } from 'immer';

export class TodosFacade {

  updateFilter(filter: VISIBILITY_FILTER) {
    this.store.update( produce((draft:TodosState) => {
      draft.filter = filter;
    }));
  }

}

```
