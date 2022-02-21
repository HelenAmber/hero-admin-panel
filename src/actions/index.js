export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}

export const heroAdded = (newHero) => {
    return {
        type: 'HERO_ADDED',
        payload: newHero
    }
}

// export const filtresFetched = (filtres) => {
//     return {
//         type: 'FILTRES_FETCHED',
//         payload: filtres
//     }
// }

 export const heroesFiltered = (newHeroes) => {
     return {
         type: 'HEROES_FILTERED',
         payload: newHeroes
     }
 }