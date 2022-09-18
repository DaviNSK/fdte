import React from 'react';
import { PokemonsProvider } from './Pokemons';

const AppProvider: React.FC = ({ children }) => {
  return <PokemonsProvider>{children}</PokemonsProvider>;
};

export default AppProvider;
