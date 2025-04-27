import React from 'react';
import './styles/app.css';
import HighlightList from './components/HighlightList';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Highlight Saver</h1>
      </header>
      <main className="app-main">
        <HighlightList />
      </main>
    </div>
  );
};

export default App;