import type { Joke } from "../types/type"; // Path may need adjustment

export type JokeAction =
    | { type: 'ADD_JOKE'; newJoke: Joke }
    | { type: 'INCREASE_JOKES_LIKES'; id: number }
    | { type: 'DECREASE_JOKES_LIKES'; id: number }
    | { type: 'DELETE_JOKE'; id: number }
    | { type: 'UPDATE_JOKE'; id: number; updatedJokeText: string };

const jokesReducer = (jokes: Joke[], action: JokeAction): Joke[] => {
    switch (action.type) {
        case 'ADD_JOKE':
            // Add new joke to the beginning of the array for "recent first" feel
            return [action.newJoke, ...jokes];

        case 'INCREASE_JOKES_LIKES':
            return jokes.map((joke) =>
                joke.id === action.id ? { ...joke, rate: joke.rate + 1 } : joke
            );

        case 'DECREASE_JOKES_LIKES':
            return jokes.map((joke) =>
                joke.id === action.id ? { ...joke, rate: Math.max(0, joke.rate - 1) } : joke
            );

        case 'DELETE_JOKE':
            return jokes.filter((joke) => joke.id !== action.id);

        case 'UPDATE_JOKE':
            return jokes.map((joke) =>
                joke.id === action.id ? { ...joke, joke: action.updatedJokeText } : joke
            );

        default:
            return jokes;
    }
};

export default jokesReducer;