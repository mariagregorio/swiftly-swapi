import React from 'react';
import './App.css';
import CharacterGrid from './components/CharactersGrid';

function App() {
    return (
        <div className="container">
            <h1 className="section-title">🪐 Star Wars characters 💫</h1>
            <CharacterGrid />
        </div>
    );
}

export default App;
