import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/common';
import { Carousel, GamesList } from '../../components/games';
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
        <div className="games__text">
          <div className="games__tagline">
            <button className="active">Popular</button>
            <button>New</button>
            <button>Upcoming</button>
          </div>
          <a href="#">View more</a>
        </div>
        <GamesList games={games} />
      </section>
    </Layout>
  );
};

export default HomePage;
