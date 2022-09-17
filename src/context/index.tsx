import React from 'react';
import { PokemonsProvider } from './pokemons';

const AppProvider: React.FC = ({ children }) => {
  return <PokemonsProvider>{children}</PokemonsProvider>;
};

export default AppProvider;
