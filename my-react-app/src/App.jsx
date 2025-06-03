import { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Button, Grid} from "@mui/material";

import './App.css'

// Fecthed the pokemons from the Pokemon API, stored them in a state and displaying them in the DOM
function App() {

  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // useEffect retrieves a set of new pokemons each time offSet changes
  useEffect(() => {
    fetchPokemons();
  }, [offSet])

  const fetchPokemonDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setSelectedPokemon(data);
  }
  // This function retrieves 20 pokemons from the API
  const fetchPokemons = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=20`);
    const data = await res.json();
    console.log(data);
    setPokemons(data.results);
  }

  const handleNext = () => {
    setOffSet((prevOffset) => prevOffset + 20);
    setSelectedPokemon(null);
  };

  const handleBack = () => {
    if(offSet > 0) {
      setOffSet((prevOffset) => prevOffset - 20);
      setSelectedPokemon(null);
    }
  }

  return (
    <>
      <Typography variant="h3" gutterBottom color='white'>
        Pokémon List
      </Typography>
      {/**Step 3: Displaying the returned pokemon cards in a 5x4 grid and styling it using Material UI sx*/}
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
      {/**The next button fetches new 20 pokemon cards while back button fetches the 20 previous pokemon cards */}
      <div style={{ marginTop: "20px"}}>
        <Button
         
          onClick={handleBack}
          disabled={offSet === 0}
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

      {/** Step 4: Displaying the selected Pokémon details in a styled card using MUI*/}
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
