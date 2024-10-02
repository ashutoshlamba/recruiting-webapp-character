import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST, API_ENDPOINT } from './consts.js';
import { useImmer } from 'use-immer';

function App() {
  const [characters, setCharacters] = useImmer([]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
        </div>
      </section>
    </div>
  );
}

export default App;
