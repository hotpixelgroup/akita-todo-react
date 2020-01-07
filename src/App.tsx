import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { TodosPage } from './components/TodosPage';

import './App.css';

export const App = () => (
  <Router>
    <div>
      <ul>
      <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Todos</Link>
        </li>
      </ul>

      <hr />

      <Route exact={true} path="/" component={TodosPage} />
      <Route path="/about" render={() => <p>State management with Akita</p>} />
    </div>
  </Router>
);
