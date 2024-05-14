import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shared/css/main.min.css';

import App from './App';
import MobxProvider from './store/MobXProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <MobxProvider>
      <App />
    </MobxProvider>
);
