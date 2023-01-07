import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDo from './components/ToDo/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='wrapper'>
      <ToDo/>
    </div>
  </React.StrictMode>
);

