import React from "react";
import styles from "./Loading.module.css";
import pokeball from "../../utils/Pokeball.png";
export default function Loading() {
  return (
    <>
      <h2>Loading...</h2>
      <img className={styles.pokeload} src={pokeball} width="100px" height="100px"></img>
    </>
  );
}
