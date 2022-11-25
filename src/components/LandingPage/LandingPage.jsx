import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
export default function LandingPage() {
  return (
    <div className={styles.back}>
      <Link to="/home">
        <img className={styles.pokeball} src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png" alt="" />
      </Link>
      <h1>Pokédex</h1>
    </div>
  );
}
