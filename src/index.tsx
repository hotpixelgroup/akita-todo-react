import * as React from 'react';
import { render } from 'react-dom';
import { akitaDevtools } from '@datorama/akita';

import { App } from './App';

akitaDevtools();

render(<App />, document.getElementById('root'));
