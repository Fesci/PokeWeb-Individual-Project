import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetail, getPokemonDetail } from "../../redux/actions";

import Loading from "../Loading/Loading";
import styles from "./Detail.module.css";
import { colours } from "../../utils/pokemon-type-colours";
export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokeDetail = useSelector(state => state.pokemon);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(getPokemonDetail(id));
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [id]);

  return (
    <>
      <div>
        {console.log(pokeDetail.types)}
        {loading ? (
          <div className={styles.container}>
            <Loading></Loading>
          </div>
        ) : (
          <div className={styles.detailcontainer}>
            <div className={styles.imagecontainer}>
              <h2 key={pokeDetail.name}>{pokeDetail.name?.toUpperCase()}</h2>
              <img src={pokeDetail.image ? pokeDetail.image : "https://pbs.twimg.com/media/FBfbWyaXsAELFdC.jpg:large"} alt="Pokemon" width="200px" height="220px" />
              <h2>HP:</h2>
              <h3>{pokeDetail.hp} </h3>
            </div>
            <div className={styles.stats}>
              <h3>Attack: </h3>
              <span>{pokeDetail.attack}</span>

              <h3>Deffense:</h3>
              <span> {pokeDetail.deffense}</span>
            </div>
            <div className={styles.stats}>
              <h3>Height:</h3>
              <span> {pokeDetail.height}</span>

              <h3>Weight:</h3>
              <span> {pokeDetail.weight}</span>
            </div>

            <div className={styles.types}>
              {pokeDetail.types &&
                pokeDetail.types.map(type => {
                  return <span style={{ backgroundColor: `${colours[type.name]}` }}>{type ? type.name.toUpperCase() : ""}</span>;
                })}
            </div>
            <Link to="/home">
              <button>Back</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
