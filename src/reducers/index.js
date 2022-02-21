const initialState = {
    heroes: [],
    filteredHeroes:[],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const newHeroes = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroes
            }
        case 'HERO_ADDED':
            let newHeroesList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroesList
            }
        // case 'FILTRES_FETCHED':
        //     return {
        //     ...state,
        //     filter: action.payload,
        //     }
        case 'HEROES_FILTERED':
             return {
                 ...state,
                 filteredHeroes: action.payload
             }
        default: return state
    }
}

export default reducer;