import { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Container, List, Button, ListItem} from "@mui/material";

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
    setSelectedPokemon(data);
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
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Pokémon List
      </Typography>

      <List>
        {pokemons.map((pokemon, index) => (
          <ListItem
            component="button"
            key={index}
            onClick={() => fetchPokemonDetails(pokemon.url)}
            sx={{ cursor: "pointer", color: "blue", justifyContent: "center" }}
          >
            {pokemon.name}
          </ListItem>
        ))}
      </List>

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          disabled={offset === 0}
          sx={{ marginRight: 2 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>

      {/** Step 4: Display selected Pokémon details in a styled card */}
      {selectedPokemon && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {selectedPokemon.name}
            </Typography>
            <Typography>Height: {selectedPokemon.height}</Typography>
            <Typography>Weight: {selectedPokemon.weight}</Typography>
            <Typography>
              Types: {selectedPokemon.types.map((t) => t.type.name).join(", ")}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
    
    </>
  )
}

export default App
