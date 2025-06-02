import { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Container, List, Button, ListItem, Grid} from "@mui/material";

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
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
    const data = await res.json();
    console.log(data);
    setPokemons(data.results);
  }

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + 20);
    setSelectedPokemon(null);
  };

  const handleBack = () => {
    if(offset > 0) {
      setOffset((prevOffset) => prevOffset - 20);
      setSelectedPokemon(null);
    }
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center", border: "5px solid red", p: 2, backgroundColor:"darkgray"}}>
      <Typography variant="h3" gutterBottom>
        Pokémon List
      </Typography>

      <Grid container spacing={2}>
          {pokemons.map((pokemon, index) => (
            <Grid item xs={3} key={index}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => fetchPokemonDetails(pokemon.url)}
                sx={{
                backgroundColor: "grey",
                color: "white",
                textTransform: "capitalize",
                '&:hover': {
                  backgroundColor: "darkgrey",
                }
              }}
              >
                {pokemon.name}
              </Button>
            </Grid>
          ))}
      </Grid>

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={handleBack}
          disabled={offset === 0}
          sx={{ marginRight: 2, backgroundColor:"gray"}}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="yellow"
          onClick={handleNext}
          sx={{
              backgroundColor: "yellow", 
              color: "black", 
              '&:hover': {
                backgroundColor: "#FFD700", 
              },
        }}
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
