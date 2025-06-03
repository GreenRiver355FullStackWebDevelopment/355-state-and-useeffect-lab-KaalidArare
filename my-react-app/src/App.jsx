import { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Container, Button, Grid} from "@mui/material";

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
      <Typography variant="h3" gutterBottom color='white'>
        Pokémon List
      </Typography>

      <Grid container spacing={2} justifyContent="center"
       sx={{ 
        paddingTop:"20px", 
        paddingBottom:"20px",
        backgroundColor:"black",
        marginLeft:40,
        marginRight: 40
        }}>
          {pokemons.map((pokemon, index) => (
            <Grid
              item
              key={index}
              sx={{
                width: "20%",
                display: "flex",
                justifyContent: "center",
              }}
            >
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

      <div style={{ marginTop: "20px"}}>
        <Button
         
          onClick={handleBack}
          disabled={offset === 0}
          sx={{ marginRight: 2, backgroundColor:"gray", color:"black"}}
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
        <Card sx={{mt: 4, padding:"1px", marginLeft:"500px", marginRight:"500px", backgroundColor:"darkgray"}}>
          <CardContent>
            <Typography variant="h5" gutterBottom color='gold'>
              {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}
            </Typography>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              style={{ width: "120px", height: "120px", margin: "0 auto", display: "block" }}
            />
            <Typography sx={{mt: 1}}>Height: {selectedPokemon.height}</Typography>
            <Typography sx={{mt: 1}}>Weight: {selectedPokemon.weight}</Typography>
            <Typography sx={{mt: 1}}>
              Types: {selectedPokemon.types.map((t) => t.type.name).join(", ")}
            </Typography>
          </CardContent>
        </Card>
      )}
   
    
    </>
  )
}

export default App
