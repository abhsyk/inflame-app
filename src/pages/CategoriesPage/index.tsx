import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import { Game } from '../../types/Type';
import { DUMMY_GAME_DATA } from '../../data/games_data';

const CategoriesPage: FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    setGames(DUMMY_GAME_DATA);
  }, []);

  return (
    <>
      <Layout>
        <section className="categories">
          <h1 className="categories__heading">Popular Games</h1>
          <GamesList games={games} />
          <div className="dots-container">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CategoriesPage;
