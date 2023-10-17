import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/common';
import {
  Carousel,
  GamesList,
  SwitchTaglineCategory,
} from '../../components/games';
import { DUMMY_GAME_DATA } from '../../data/games_data';
import { Game } from '../../types/Type';

const HomePage: FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    setGames(DUMMY_GAME_DATA);
  }, []);

  return (
    <Layout>
      <Carousel />
      <section className="games">
        <SwitchTaglineCategory />
        <GamesList games={games} />
      </section>
    </Layout>
  );
};

export default HomePage;
