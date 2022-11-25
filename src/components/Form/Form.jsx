import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getTypeById, getTypes } from "../../redux/actions";
import styles from "./Form.module.css";

function validateData(data) {
  let error = {};
  if (!data.name) error.name = "Name field is necessary";

  if (!data.hp) error.hp = "Hp stat is necessary";
  if (data.hp < 0) error.hp = "Stats must be possitive numbers";
  if (data.attack < 0) error.attack = "Stats must be possitive numbers";
  if (data.deffense < 0) error.deffense = "Stats must be possitive numbers";
  if (data.speed < 0) error.speed = "Stats must be possitive numbers";
  if (data.height < 0) error.height = "Stats must be possitive numbers";
  if (data.weight < 0) error.weight = "Stats must be possitive numbers";
  if (!data.attack) error.attack = "Attack stat is necessary";
  if (!data.deffense) error.deffense = "Deffense stat is necessary";
  if (!data.speed) error.speed = "Speed stat is necessary";
  if (!data.height) error.height = "Height stat is necessary";
  if (!data.weight) error.weight = "Weight stat is necessary";
  if (data.types.length > 2) {
    data.types = [];
    return alert("Types max 2");
  }

  return error;
}
export default function Form() {
  const checkboxInput = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector(state => state.types);

  const [error, setError] = useState({});

  const [data, setData] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    deffense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  useEffect(() => {
    dispatch(getTypes());
  }, []);
  function handleCheckbox(e) {
    if (e.target.checked) {
      if (data.types.length > 1) {
        return alert("You cannot select more than 2 types");
      }
      setData({
        ...data,
        types: [...data.types, e.target.value],
      });
    }
    if (!e.target.checked) {
      setData({
        ...data,
        types: data.types.filter(t => t !== e.target.value),
      });
    }
  }

  function handleInputChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setError(
      validateData({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createPokemon(data));

    setData({
      name: "",
      image: "",
      hp: "",
      attack: "",
      deffense: "",
      speed: "",
      height: "",
      weight: "",
      types: [{}],
    });

    history.push("/home");
  }
  function checkIsValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  console.log(data.types);

  return (
    <>
      <h1>CREATE POKEMON</h1>

      <form className={styles.form} onSubmit={e => handleSubmit(e)} action="">
        <label>Name</label>
        <input type="text" value={data.name} name="name" onChange={e => handleInputChange(e)}></input>
        {error.name ? <span style={{ color: "red" }}>{error.name} </span> : " "}
        <label>Image URL</label>
        <input type="text" value={data.image} name="image" onChange={e => handleInputChange(e)}></input>
        <label>HP</label>
        <input type="number" value={data.hp} name="hp" onChange={e => handleInputChange(e)}></input>
        {error.hp ? <span style={{ color: "red" }}>{error.hp} </span> : " "}
        <label>Attack</label>
        <input type="number" value={data.attack} name="attack" onChange={e => handleInputChange(e)}></input>
        {error.attack ? <span style={{ color: "red" }}>{error.attack} </span> : " "}
        <label>Deffense</label>
        <input type="number" value={data.deffense} name="deffense" onChange={e => handleInputChange(e)}></input>
        {error.deffense ? <span style={{ color: "red" }}>{error.deffense} </span> : " "}
        <label>Speed</label>
        <input type="number" value={data.speed} name="speed" onChange={e => handleInputChange(e)}></input>
        {error.speed ? <span style={{ color: "red" }}>{error.speed} </span> : " "}
        <label>Height</label>
        <input type="number" value={data.height} name="height" onChange={e => handleInputChange(e)}></input>
        {error.height ? <span style={{ color: "red" }}>{error.height} </span> : " "}
        <label>Weight</label>
        <input type="number" value={data.weight} name="weight" onChange={e => handleInputChange(e)}></input>
        {error.weight ? <span style={{ color: "red" }}>{error.weight} </span> : " "}
        <div className={styles.types}>
          <p>Choose your type/s</p>
          {error.name ? <span style={{ color: "red" }}>{error.types} </span> : " "}
          {types &&
            types.map(type => {
              return (
                <label key={type.name} className={styles.checkbox}>
                  <input className={styles.checkInput} type="checkbox" name="types" value={type.name} onChange={e => handleCheckbox(e)} />

                  <span ref={checkboxInput} className={styles.checkSpan}>
                    {type.name}
                  </span>
                </label>
              );
            })}
        </div>

        <div className={styles.buttons}>
          <Link to="/home">
            <button>Back</button>
          </Link>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
}
