import { useContext } from 'react';
import { GamesContext } from '../context';

const useGamesContext = () => {
  const ctx = useContext(GamesContext);
  if (!ctx) throw new Error('useGamesContext must be used within GamesContextProvider');
  return ctx;
};

export default useGamesContext;
