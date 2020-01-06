import * as React from 'react';
import { ID, StateHistoryPlugin } from '@datorama/akita';
import { todosQuery } from '../state/todos.query';
import { todosService } from '../state/todos.service';
import { Todo } from '../state/todo.model';
import { AddTodo } from './AddTodo';
import { Filters } from './Filters';
import { TodoList } from './Todos';
import { untilDestroyed } from '../take-until';

export class TodosPageComponent extends React.PureComponent<any> {
  state: { todos: Todo[]; filter: string } = { todos: [], filter: '' };
  stateHistory = new StateHistoryPlugin(todosQuery);

  constructor(props: any) {
    super(props);
  }

  add = (text: string) => todosService.add(text);

  toggleTodo = (id: ID) => todosService.complete(id);

  deleteTodo = (id: ID) => todosService.delete(id);

  changeFilter = ({ target: { value } }) => {
    todosService.updateFilter(value);
  }

  undo = () => this.stateHistory.undo();
  redo = () => this.stateHistory.redo();

  componentDidMount() {
    todosQuery.selectVisibleTodos$
      .pipe(untilDestroyed(this))
      .subscribe(todos => this.setState({ todos }));

    todosQuery.selectVisibilityFilter$
      .pipe(untilDestroyed(this))
      .subscribe(filter => this.setState({ filter }));
  }

  render() {
    const hasPast = this.stateHistory.hasPast;
    const hasFuture = this.stateHistory.hasFuture;

    return (
      <div>
        <button onClick={this.undo} disabled={!hasPast}>
          Undo
        </button>
        <button onClick={this.redo} disabled={!hasFuture}>
          Redo
        </button>
        <AddTodo add={this.add} />
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          deleteTodo={this.deleteTodo}
        />
        <Filters onChange={this.changeFilter} active={this.state.filter} />
      </div>
    );
  }
}
