import React from 'react';
import { Toaster } from 'react-hot-toast';
import { PokemonsProvider } from './Pokemons';

const AppProvider: React.FC = ({ children }) => {
  return (
    <PokemonsProvider>
      <>
        <Toaster
          containerStyle={{ fontSize: 14, zIndex: 999999999 }}
          position="top-center"
          reverseOrder={false}
        />
        {children}
      </>
    </PokemonsProvider>
  );
};

export default AppProvider;
