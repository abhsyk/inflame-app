import { useContext } from 'react';
import { GamesContext } from '../context';
import type { GamesProviderContext } from '../types';

const useGamesContext = () => {
  return useContext(GamesContext) as GamesProviderContext;
};

export default useGamesContext;
