import api from '../api-service';

export const fetchPokemonById = (id: number) => {
  return api.get(`/pokemon/${id}`);
};
