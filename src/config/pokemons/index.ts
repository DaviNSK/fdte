import api from '../api-service';

export const fetchPokemonById = (id: string) => {
    return api.get(`/pokemon/${id}`)
}