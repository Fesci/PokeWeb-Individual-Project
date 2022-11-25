import React, { useState } from "react";
import { Link } from "react-router-dom";
import { filterByOrigin, filterByType, getPokemonByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./Navbar.module.css";
import createimg from "../../utils/create-pokemon.png";
export default function Navbar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleFilterByType(e) {
    dispatch(filterByType(e.target.value));
  }
  function handleFilterByOrigin(e) {
    dispatch(filterByOrigin(e.target.value));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonByName(name));
    e.target.value = "";
    setName("");
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div className={styles.inputbar}>
          <input onChange={e => handleInputChange(e)} type="text" placeholder="  Search your Pokémon!" name="search" />
          <i>
            <svg onClick={e => handleSubmit(e)} width="40px" height="40px" viewBox="0 0 512 512">
              <path d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z" />
            </svg>
          </i>
        </div>
      </form>
      <div className={styles.navbar}>
        <Link to="/create">
          <div className={styles.add}>
            <span>ADD POKEMON</span>
            <img src={createimg} width="25px" height="25px"></img>
          </div>
        </Link>

        <select onChange={e => handleFilterByOrigin(e)} name="" id="">
          <option value="all">Filter by origin</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>

        <select onChange={e => handleFilterByType(e)} name="type" id="">
          <option value="all" selected>
            Type...
          </option>
          <option value="fighting">Fighting</option>
          <option value="bug">Bug</option>
          <option value="poison">Poison</option>
          <option value="ghost">Ghost</option>
          <option value="rock">Rock</option>
          <option value="steel">Steel</option>
          <option value="grass">Grass</option>
          <option value="psychic">Psychic</option>
          <option value="dragon">Dragon</option>
          <option value="fairy">Fairy</option>
          <option value="dark">Dark</option>
          <option value="fire">Fire</option>
          <option value="earth">Earth</option>
          <option value="normal">Normal</option>
          <option value="ice">Ice</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
        </select>
      </div>
    </>
  );
}
