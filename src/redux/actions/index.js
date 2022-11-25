import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    const json = await axios("/poke");
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function getPokemonDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios(`/poke/${id}`);
      return dispatch({
        type: "GET_POKEMON_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
export function filterByOrigin(payload) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload,
  };
}
export function clearDetail() {
  return {
    type: "CLEAR_DETAIL",
  };
}
export function sortAscDesc(payload) {
  return {
    type: "SORT_BY_ASC_DESC",
    payload,
  };
}
export function getPokemonByName(payload) {
  return async function (dispatch) {
    const json = await axios(`/poke?name=${payload}`);
    return dispatch({
      type: "GET_POKEMON_BY_NAME",
      payload: json.data,
    });
  };
}
export function createPokemon(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/poke", payload);
      return response + alert("Created succesfully");
    } catch (error) {
      if (error.status === 400) {
        alert("Error with data providen");
      }
      alert(error.message);
    }
  };
}
export function deletePokemon(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/poke/${payload}`);
      return response.data;
    } catch (error) {
      alert(error.message);
    }
  };
}
export function getTypes() {
  return async function (dispatch) {
    const response = await axios("/type");
    return dispatch({
      type: "GET_TYPES",
      payload: response.data,
    });
  };
}
export function getTypeById(id) {
  return async function (dispatch) {
    const response = await axios(`/type/${id}`);
    return response.data;
  };
}
