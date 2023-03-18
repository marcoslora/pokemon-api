import React, { useState, useEffect } from "react";
import Pokemones from "./Pokemones";

interface Pokemon {
  name: string;
  url: string;
}

function PokemonCall(props: string) {
  const [pokemonCard, setPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(props);
      const data = await response.json();
      setPokemon(data.results);
    }

    fetchData();
  }, []);
  return pokemonCard;
}

export default PokemonCall;
