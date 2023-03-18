import React from "react";

interface CardProps {
  name: string;
  image: string;
  types: string[];
  abilities: string[];
}

function CardComponent(props: CardProps) {
  const { name, image, types, abilities } = props;

  return (
    <div>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div>
        <h3>Types:</h3>
        <ul>
          {types.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Abilities:</h3>
        <ul>
          {abilities.map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CardComponent;
