import React from "react";
import styles from "./Paginate.module.css";

export default function Paginate({ pokesPerPage, allPokemons, paginate, currentPage }) {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(allPokemons?.length / pokesPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.paginateList}>
        {pageNumbers.length !== 0 &&
          pageNumbers.map(n => (
            <li className={styles.paginateNumber} key={n}>
              <a className={currentPage === n ? styles.active : ""} onClick={() => paginate(n)}>
                {n}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
