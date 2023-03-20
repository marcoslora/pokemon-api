import React, { useState, useEffect, useSyncExternalStore } from "react";
import CardComponent from "./CardComponent";
// import audio from "../song/Pokémon Theme Song.mp3";
function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface Pokemon {
  name: string;
  url: string;
}

interface pokemonCard {
  abilities: Object[];
  weight: number;
  types: Object[];
  image: string;
  showCard: boolean;
  id: number;
  name: string;
}

function Pokemones() {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);
  const [pokemonCards, setPokemonCards] = useState<pokemonCard[]>([]);
  const [lastFetch, setLastFetch] = useState(0);

  const handleClick = (index: number) => {
    const updatedCards = [...pokemonCards];
    updatedCards.forEach((c) => (c.showCard = false));
    updatedCards[index].showCard = true;
    setPokemonCards(updatedCards);
  };

  const handleNext = () => {
    setLastFetch(lastFetch + 10);
  };

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${lastFetch}`
      );
      const data = await response.json();
      setPokemones(data.results);

      const cards: pokemonCard[] = await Promise.all<pokemonCard>(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();

          return {
            image: data.sprites.other.dream_world.front_default,
            abilities: data.abilities,
            weight: data.weight,
            types: data.types,
            showCard: false,
            id: data.id,
            name: capitalize(data.name),
          };
        })
      );
      setPokemonCards(cards);
    }

    fetchData();
    console.log(lastFetch);
    console.log(pokemonCards);
  }, [lastFetch]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Pokemones</h1>
      <ul>
        {pokemones.map((pokemon, index) => {
          return (
            <div
              className="pokemon-card"
              key={index}
              onClick={() => handleClick(index)}
            >
              <img
                src={pokemonCards[index]?.image}
                alt="pokemon"
                width={100}
                height={100}
              />
              <li>
                {pokemonCards[index]?.id} - {pokemonCards[index]?.name}
              </li>
            </div>
          );
        })}
      </ul>

      <div className="d-flex justify-content-center my-4">
        <button
          className="btn btn-dark w-25"
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {pokemonCards.map((c, i) => (
        <CardComponent
          abilities={c.abilities}
          weight={c.weight}
          types={c.types}
          showCard={c.showCard}
          image={c.image}
          key={i}
          name={c.name}
        />
      ))}
    </div>
  );
}

export default Pokemones;
