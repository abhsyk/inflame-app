import { FC } from 'react';
import type { Game } from '../../../types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { GameItem } from '../../games';

type Props = { games: Game[] };

const GamesList: FC<Props> = ({ games }) => {
  return (
    <StyledGameList>
      <AnimatePresence>
        {!!games && games.length > 0
          ? games.map((game) => <GameItem key={game.id} game={game} />)
          : null}
      </AnimatePresence>
    </StyledGameList>
  );
};

const StyledGameList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(auto-fit, 37.3rem);
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(37.3rem, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default GamesList;
