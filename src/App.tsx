import './App.css'; 
import { useReducer } from 'react'; 
import { JokeComponent } from './components/JokeComponent';
import jokesReducer from './reducer/jokeReduces'; 
import type { Joke } from './types/type'; 
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const AddJokeSchema = yup.object({
  jokeText: yup.string()
    .required("Joke text cannot be empty!")
    .min(5, "Joke must be at least 5 characters long.")
    .max(200, "Joke cannot be more than 200 characters long."),
});

type AddJokeFormInput = {
  jokeText: string;
};

function App() {
  const InitialJokes: Joke[] = [
    { id: 1, joke: 'What do you call a very small valentine? A valen-tiny!!!', rate: 0 },
    { id: 2, joke: 'What did the dog say when he rubbed his tail on the sandpaper? Ruff, Ruff!!!', rate: 5 },
    { id: 3, joke: "Why don't sharks like to eat clowns? Because they taste funny!!!", rate: 10 }
  ];


  const [jokes, dispatch] = useReducer(jokesReducer, InitialJokes);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddJokeFormInput>({
    resolver: yupResolver(AddJokeSchema),
    defaultValues: {
        jokeText: ""
    }
  });

 
  const onAddJokeSubmit: SubmitHandler<AddJokeFormInput> = (data) => {
    dispatch({
      type: 'ADD_JOKE',
      newJoke: {
        id: Date.now(),
        joke: data.jokeText.trim(),
        rate: 0
      }
    });
    reset(); 
  };

  
  const increaseRates = (id: number) => {
    dispatch({ type: 'INCREASE_JOKES_LIKES', id });
  };

  
  const decreaseRates = (id: number) => {
    dispatch({ type: 'DECREASE_JOKES_LIKES', id });
  };

  
  const deleteJokeHandler = (id: number) => {
    if (window.confirm("Are you sure you want to delete this joke?")) {
      dispatch({ type: 'DELETE_JOKE', id });
    }
  };

  
  const updateJokeHandler = (id: number, updatedJokeText: string) => {
    dispatch({ type: 'UPDATE_JOKE', id, updatedJokeText });
  };

  
  const sortedJokes = [...jokes].sort((a, b) => b.rate - a.rate);



  return (
    <>
      <div className='container'>
        <h2>Jokes For You 😂 (useReducer & React Hook Form)</h2>

        <form onSubmit={handleSubmit(onAddJokeSubmit)} className='form' noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, marginRight: "10px" }}>
            <input
              type="text"
              placeholder="Enter your joke"
              {...register("jokeText")}
              aria-invalid={errors.jokeText ? "true" : "false"} // For accessibility
              style={{
                padding: "12px",
                width: "100%",
                border: errors.jokeText ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            {errors.jokeText && (
              <span role="alert" style={{ color: "red", fontSize: '0.9em', marginTop: '4px' }}>
                {errors.jokeText.message}
              </span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">Add Joke</button>
        </form>
      </div>

      <div className="jokes">
        {sortedJokes.length > 0 ? (
          sortedJokes.map((joke: Joke) => (
            <JokeComponent
              key={joke.id}
              joke={joke}
              increaseRates={increaseRates}
              decreaseRates={decreaseRates}
              deleteJoke={deleteJokeHandler}
              updateJoke={updateJokeHandler}
            />
          ))
        ) : (
          <p style={{textAlign: 'center', marginTop: '20px'}}>No jokes yet. Add one!</p>
        )}
      </div>
    </>
  );
}

export default App;