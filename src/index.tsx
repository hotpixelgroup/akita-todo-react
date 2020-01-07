import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { akitaDevtools } from '@datorama/akita';
import { TodosPage } from './components/TodosPage';

akitaDevtools();

const AppComponent = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Todos</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <hr />

      <Route exact={true} path="/" component={TodosPage} />
      <Route path="/about" render={() => <p>State management with Akita</p>} />
    </div>
  </Router>
);

render(<AppComponent />, document.getElementById('root'));
