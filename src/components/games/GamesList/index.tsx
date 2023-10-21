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
`;

export default GamesList;
