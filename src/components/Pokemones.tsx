import React, { useState, useEffect } from "react";
import PokemonCall from "./PokemonCard";

interface Pokemon {
  name: string;
  url: string;
}
function Pokemones() {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [pokemonCard, setPokemon] = useState<Pokemon[]>([]);

  //Llamo la data en su primer init por eso utilizo este useEffect
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );
      const data = await response.json();
      setPokemones(data.results);

      //   const data2 = PokemonCall(data.results.url);
      //   console.log(data2);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de pokemones</h1>
      <ul>
        {pokemones.map((pokemon, index) => {
          return (
            <li key={index}>
              {index + 1} - {pokemon.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pokemones;
