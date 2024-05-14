import React from 'react';
import ReactDOM from 'react-dom/client';
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

