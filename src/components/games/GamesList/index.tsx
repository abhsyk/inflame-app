import { FC } from 'react';
import type { Game } from '../../../types/Game';
import { GameItem } from '../../games';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  games: Game[];
};

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
  grid-template-columns: repeat(auto-fit, minmax(37.3rem, 1fr));
  gap: 2rem;
  margin-top: 1rem;
`;

export default GamesList;
