import { useEffect, useState } from 'react';
import './App.css';
import { CharacterList } from './components/CharacterList';

function App() {

    const [ characters, setCharacters ] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/people')
            .then(res => res.json())
            .then(result => {
                setCharacters(result.results);
            });
    }, []);
    return (
        <div >
            <header className="App-header">
                <CharacterList characters={characters} />
            </header>
        </div>
    );
}

export default App;
