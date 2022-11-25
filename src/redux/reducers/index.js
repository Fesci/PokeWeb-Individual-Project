const initialState = {
  pokemons: [],
  pokemon: {},
  allPokemons: [],
  types: [],
  type: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_POKEMON_DETAIL":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "CLEAR_DETAIL":
      return {
        ...state,
        pokemon: {},
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;

      const filteredPokemons = allPokemons?.filter(pokemon => pokemon.types?.map(type => type.name).includes(action.payload) || pokemon.types.includes(action.payload));
      return {
        ...state,
        pokemons: action.payload === "all" ? allPokemons : filteredPokemons,
      };
    case "FILTER_BY_ORIGIN":
      const all_pokemons = state.allPokemons;
      const filteredByOrigin = action.payload === "created" ? all_pokemons?.filter(pokemon => pokemon.createdInDb) : all_pokemons.filter(p => !p.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? state.allPokemons : filteredByOrigin,
      };
    case "GET_POKEMON_BY_NAME":
      return {
        ...state,
        pokemons: action.payload.length === 0 ? alert("No poke found") : action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_TYPE_BY_ID":
      return {
        ...state,
        type: action.payload,
      };
    case "SORT_BY_ASC_DESC":
      if (action.payload === "asc") {
        state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "desc") {
        state.pokemons.sort(function (a, b) {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "att-asc") {
        state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (a.attack < b.attack) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "att-desc") {
        state.pokemons.sort(function (a, b) {
          if (a.attack < b.attack) {
            return 1;
          }
          if (a.attack > b.attack) {
            return -1;
          }
          return 0;
        });
      }
      return {
        ...state,
        pokemons: state.pokemons,
      };

    default:
      return state;
  }
}

export default rootReducer;
