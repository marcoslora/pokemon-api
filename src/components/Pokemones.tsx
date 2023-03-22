import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./Search";
// import audio from "../song/Pokémon Theme Song.mp3";
function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface Pokemon {
  name: string;
  url: string;
}

export interface pokemonCard {
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
  const [filteredPokemonCards, setFilteredPokemonCards] = useState<
    pokemonCard[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filteredCards = pokemonCards.filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonCards(filteredCards);
  };

  const handleClick = (index: number) => {
    const updatedCards = filteredPokemonCards.map((c, i) => {
      if (i === index) {
        return { ...c, showCard: true };
      } else {
        return { ...c, showCard: false };
      }
    });
    setFilteredPokemonCards(updatedCards);
  };

  const handleNext = () => {
    setLastFetch(lastFetch + 10);
  };

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=151&offset=${lastFetch}`
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
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          };
        })
      );
      setPokemonCards(cards);
      setFilteredPokemonCards(cards);
    }

    fetchData();
  }, [lastFetch]);

  useEffect(() => {
    const filteredCards = pokemonCards.filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonCards(filteredCards);
  }, [searchTerm, pokemonCards]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Search
        pokemones={pokemonCards}
        setFilteredPokemones={setFilteredPokemonCards}
      />
      <ul>
        {filteredPokemonCards.map((pokemon, index) => {
          return (
            <div
              className="pokemon-card d-inline-block p-4"
              key={index}
              onClick={() => handleClick(index)}
            >
              <img src={pokemon.image} alt="pokemon" width={100} height={100} />
              <li>
                {pokemon.id} - {pokemon.name}
              </li>
            </div>
          );
        })}
      </ul>

      {filteredPokemonCards.map((c, i) => (
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
