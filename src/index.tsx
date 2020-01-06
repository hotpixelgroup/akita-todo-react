import * as React from 'react';
import { render } from 'react-dom';
import { TodosPageComponent } from './components/TodosPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { akitaDevtools } from '@datorama/akita';

akitaDevtools();

const AppComponent = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
      </ul>

      <hr />

      <Route exact={true} path="/" render={() => <h1>Home</h1>} />
      <Route path="/todos" component={TodosPageComponent} />
    </div>
  </Router>
);

render(<AppComponent />, document.getElementById('root'));
