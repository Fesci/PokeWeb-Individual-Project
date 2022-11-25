import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { colours } from "../../utils/pokemon-type-colours";

export default function Card({ name, image, id, types, attack, deffense }) {
  const type1 = types[0];
  const type2 = types.length > 1 ? types[1] : "";
  return (
    <>
      <div className={styles.card}>
        <p className="id">
          <span>{id.length > 6 ? "N/N" : "N° " + id}</span>
        </p>
        <Link style={{ textDecoration: "none" }} to={"/home/" + id}>
          <h2 key={id}>{name !== undefined ? name.toUpperCase() : " "}</h2>
          <img src={image} alt="Pokemon" width="200px" height="220px" />
          {/* TODO TIPOS CON COLOR-BULLETS */}
          {/* <h4>Attack: {attack}</h4>
        <h4>Deffense: {deffense}</h4> */}
          <div className={styles.types}>
            <span style={{ backgroundColor: `${colours[type1]}` }}>{types[0] ? types[0].toUpperCase() : ""}</span>
            {types.length > 1 ? <span style={{ backgroundColor: `${colours[type2]}` }}>{types[1].toUpperCase()}</span> : " "}
          </div>
        </Link>
      </div>
    </>
  );
}
