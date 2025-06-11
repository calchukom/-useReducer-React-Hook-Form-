import React, { useState } from 'react';
import type { Joke } from "../types/type"; 

interface JokeComponentProps {
  joke: Joke;
  increaseRates: (id: number) => void;
  decreaseRates: (id: number) => void;
  deleteJoke: (id: number) => void;
  updateJoke: (id: number, newText: string) => void;
}

export const JokeComponent: React.FC<JokeComponentProps> = ({
  joke,
  increaseRates,
  decreaseRates,
  deleteJoke,
  updateJoke
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(joke.joke);

  const handleUpdate = () => {
    if (editText.trim() !== "") {
      updateJoke(joke.id, editText.trim());
      setIsEditing(false);
    }

  };

  const handleCancelEdit = () => {
    setEditText(joke.joke);
    setIsEditing(false);
  };

  return (
    <div className="joke">
      {isEditing ? (
        <div className="joke-edit-form">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={3}
            style={{ width: '100%', marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            aria-label="Edit joke text"
          />
          <button type="button"  onClick={handleUpdate} style={{ marginRight: '5px' }}>
            Save
          </button>
          <button type="button"  onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="joke-text">{joke.joke}</div>
          <div className="rate">Rating : {joke.rate}</div>
          <div className="joke-buttons">
            <button type="button"  onClick={() => increaseRates(joke.id)}>
              👍
            </button>
            <button type="button"  onClick={() => decreaseRates(joke.id)}>
              👎
            </button>
            <button type="button" onClick={() => setIsEditing(true)} style={{ marginLeft: '5px' }}>
              ✏️ Edit
            </button>
            <button type="button"  onClick={() => deleteJoke(joke.id)} style={{ marginLeft: '5px' }}>
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};