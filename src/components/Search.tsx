import React, { useState } from "react";
import { pokemonCard } from "./Pokemones";
interface Props {
  pokemones: pokemonCard[];
  setFilteredPokemones: React.Dispatch<React.SetStateAction<pokemonCard[]>>;
}

function Search({ pokemones, setFilteredPokemones }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredPokemones = pokemones.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPokemones(filteredPokemones);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleChange}
        className="form-control w-50 mx-auto"
      />
    </div>
  );
}

export default Search;
