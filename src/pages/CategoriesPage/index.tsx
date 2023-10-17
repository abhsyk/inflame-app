import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import { CategoryPath, Game } from '../../types/Type';
import { DUMMY_GAME_DATA } from '../../data/games_data';
import { useParams } from 'react-router-dom';
import { getCategoryName } from '../../libs/getCategoryName';

const CategoriesPage: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [categoryName, setCategoryName] = useState<string>();
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();

  useEffect(() => {
    if (categoryId) {
      setCategoryName(getCategoryName(categoryId)!);
      setGames(DUMMY_GAME_DATA);
    }
  }, [categoryId]);

  return (
    <Layout>
      <section className="categories">
        <h1 className="categories__heading">{categoryName} Games</h1>
        <GamesList games={games} />
        <div className="dots-container">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoriesPage;
