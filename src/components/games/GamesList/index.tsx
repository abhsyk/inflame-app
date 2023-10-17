import { FC } from 'react';
import { Game } from '../../../types/Type';
import { GameItem } from '../../games';

type Props = {
  games: Game[];
};

const GamesList: FC<Props> = ({ games }) => {
  return (
    <ul className="games__list">
      {!!games && games.length > 0
        ? games.map((game) => <GameItem key={game.id} game={game} />)
        : null}
    </ul>
  );
};

export default GamesList;
