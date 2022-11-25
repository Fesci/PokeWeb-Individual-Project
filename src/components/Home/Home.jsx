import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, sortAscDesc } from "../../redux/actions/index";
import styles from "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import Loading from "../Loading/Loading";
import pokeimage from "../../utils/pokemon-logo-transparent-png-2.png";
import pokeball from "../../utils/pokeball-icon.png";
export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector(state => state.pokemons);
  const [didLoad, setDidLoad] = useState(allPokemons?.length ? true : false);
  //pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");
  const [pokesPerPage, setPokesPerPage] = useState(12);
  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexofFirstPoke = indexOfLastPoke - pokesPerPage;
  const currentPokes = allPokemons?.slice(indexofFirstPoke, indexOfLastPoke);
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (!didLoad) dispatch(getPokemons());
  }, [dispatch]);
  function handleSortByAscDesc(e) {
    dispatch(sortAscDesc(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }
  function buttonReset(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getPokemons());
  }

  return (
    <>
      <div className={styles.pokeImage}>
        <img src={pokeimage} width="400px" height="150px"></img>
      </div>
      <Navbar></Navbar>
      <div className={styles.navContainer}>
        <div className={styles.refresh}>
          <img onClick={e => buttonReset(e)} src={pokeball} width="30px" height="30px"></img>
          <span> RESET </span>
        </div>
        <select onChange={e => handleSortByAscDesc(e)} name="" id="">
          {/* <option value="">Sort By Name</option> */}
          <option value="asc" selected defaultValue>
            A - Z
          </option>
          <option value="desc">Z - A</option>
        </select>
        <select onChange={e => handleSortByAscDesc(e)} name="" id="">
          <option value="">Sort By Attack</option>
          <option value="att-asc">Ascending</option>
          <option value="att-desc">Descending</option>
        </select>
      </div>
      <div className={styles.Cards}>
        {currentPokes?.length ? (
          currentPokes?.map(poke => {
            return (
              <Fragment key={poke.id}>
                <Card
                  className={styles.Card}
                  key={poke.name}
                  name={poke.name}
                  id={poke.id}
                  types={poke.types[0]?.name ? poke.types.map(t => t.name) : poke.types.map(t => t + " ")}
                  image={poke.image ? poke.image : "https://pbs.twimg.com/media/FBfbWyaXsAELFdC.jpg:large"}
                  attack={poke.attack}
                  deffense={poke.deffense}
                ></Card>
              </Fragment>
            );
          })
        ) : (
          <div className={styles.container}>
            <Loading></Loading>
          </div>
        )}
        {/* {currentPokes === "undefined" || currentPokes.length === 0 ? (
          <>
            <h2>NOT FOUND</h2>
          </>
        ) : (
          ""
        )} */}
      </div>

      <Paginate pokesPerPage={pokesPerPage} allPokemons={allPokemons} paginate={paginate} currentPage={currentPage}></Paginate>
    </>
  );
}
