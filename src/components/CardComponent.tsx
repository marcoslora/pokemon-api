import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function CardComponent({
  showCard,
  abilities,
  weight,
  types,
  image,
  name,
}: any) {
  return (
    <>
      {showCard ? (
        <div
          className="card card-container d-flex flex-column align-items-center bg-secondary bg-gradient text-white rounded justify-content-center position-fixed p-3"
          style={{ width: "18rem" }}
        >
          <img src={image} alt="pokemon picture" className="card-img-top" />
          <div className="card-body">
            <p className="card-text">{name}</p>
            <p className="card-text">Weight: {weight}</p>
            {abilities.length > 0 && (
              <p className="card-text">
                Abilities:
                {abilities.map((a: any, i: number) => (
                  <span key={i}> {a?.ability?.name}</span>
                ))}
              </p>
            )}
            {types.length > 0 && (
              <p className="card-text">
                Types:
                {types.map((t: any, i: number) => (
                  <span key={i}>{t?.type?.name}</span>
                ))}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CardComponent;
