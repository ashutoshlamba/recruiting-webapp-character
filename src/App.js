import { useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST, API_ENDPOINT } from './consts.js';
import { useImmer } from 'use-immer';
import Character from './componenets/Character.js';
import axios from 'axios';

function App() {

  const [characters, setCharacters] = useImmer([]);

  useEffect(() => {
    if (characters.length === 0) {
      axios
        .get(API_ENDPOINT)
          .then((response) => {
              const fetchedCharacters = response?.data?.body || [];
              if (Array.isArray(fetchedCharacters) && fetchedCharacters.length > 0) {
                setCharacters((draft) => {
                  draft.push(...fetchedCharacters);
                });
              } 
          })
        .catch((error) => {
          console.error("Error fetching characters:", error);
          alert("Something went wrong while fetching characters!");
        });
    }
}, []);

  const handleAddCharacter = () => {
    const newChar = {
      attributes: ATTRIBUTE_LIST.map((name) => ({
        name,
        value: 10,
      })),
      skills: SKILL_LIST.map((skill) => ({ ...skill, value: 0 })),
    };
    setCharacters((draft) => {
        draft.push(newChar);
    });
  };

  const handleSaveAllCharacters = () => {
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(characters),
  })
      .then(() => {
          alert("Successfully saved the Characters");
      })
      .catch(() => {
          alert("An error occured while saving the Characters");
      });
  };

  const handleUpdateCharacter = (charId, newChar) => {
    setCharacters((draft) => {
      draft[charId] = {
          ...draft[charId],
          ...newChar,
      };
  });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
        {characters.map((character, id) => (
          <Character
            key={id}
            id={id + 1}
            attributes={character.attributes}
            handleUpdateCharacter={(character) =>
                handleUpdateCharacter(id, character)
            }
            skills={character.skills}
          />
        ))}
        <button
          onClick={handleAddCharacter}
        >
          Add New Character
        </button>
        <button onClick={handleSaveAllCharacters}>
          Save all Characters
        </button>
        <button onClick={() => setCharacters([])}>
          Reset All Characters
        </button>
        </div>
      </section>
    </div>
  );
}

export default App;
