import React, { useState, useEffect } from "react";
import PlayerVideo from "./PlayerVideo";

const handleClick = () => {
  console.log("Probando el div");
};
function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface Pokemon {
  name: string;
  url: string;
}

function Pokemones() {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [pokemonCards, setPokemonCards] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );
      const data = await response.json();
      setPokemones(data.results);

      const cards: string[] = await Promise.all<string>(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return data.sprites.front_default;
        })
      );
      setPokemonCards(cards);
    }

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Pokemones</h1>
      <ul>
        {pokemones.map((pokemon, index) => {
          return (
            <div className="pokemon-card" key={index} onClick={handleClick}>
              <img src={pokemonCards[index]} alt="pokemon" />
              <li>
                {index + 1} - {capitalize(pokemon.name)}
              </li>
            </div>
          );
        })}
      </ul>
      <PlayerVideo videoId="JuYeHPFR3f0" />
    </div>
  );
}

export default Pokemones;
