import { useState, useEffect } from 'react'
import { Card, CardContent, Typography } from "@mui/material";

import './App.css'

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchPokemons();
  }, [offset])

  const fetchPokemonDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    selectedPokemon(data);
  }

  const fetchPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20');
    const data = await res.json();
    console.log(data);
    setPokemons(data.results);
  }

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  const handleBack = () => {
    if(offset > 0) {
      setOffset((prevOffset) => prevOffset - 20);
    }
  }

  return (
    <>
      <div>
        <h1>Pokemons List</h1>
        <ul>
          {pokemons.map((pokemon, index) => 
          <li key={index} onClick={() => fetchPokemonDetails(pokemon.url)}>
            
            {pokemon.name}

          </li>)}
        </ul>
        
        <button onClick={handleBack} disabled={offset == 0}>
          Back
        </button>
        <button onClick={handleNext}>
          Next
        </button>


        {selectedPokemon && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {selectedPokemon.name}
              </Typography>
              <Typography>Height: {selectedPokemon.height}</Typography>
              <Typography>Weight: {selectedPokemon.weight}</Typography>
              <Typography>Types: {selectedPokemon.types.map((t) => t.type.name).join(", ")}</Typography>
        
            </CardContent>
          </Card>
        )}
      </div>
    
    </>
  )
}

export default App
