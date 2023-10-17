import { FC, useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import { CategoryPath, Game } from '../../types/Type';
// import { DUMMY_GAME_DATA } from '../../data/games_data';
import { useParams } from 'react-router-dom';
import { getCategoryName } from '../../utils/getCategoryName';
import styled from 'styled-components';
import axios from 'axios';
import { popularGamesURL } from '../../api';

const CategoriesPage: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [categoryName, setCategoryName] = useState<string>();
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();

  const getPopularGames = useCallback(async () => {
    const res = await axios.get(popularGamesURL());
    setGames(res.data.results);
  }, []);

  useEffect(() => {
    if (categoryId) {
      setCategoryName(getCategoryName(categoryId)!);
      getPopularGames();
    }
  }, [categoryId, getPopularGames]);

  return (
    <Layout>
      <StyledCategories className="categories">
        <h1 className="categories__heading">{categoryName} Games</h1>
        <GamesList games={games} />
        <div className="dots-container">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </StyledCategories>
    </Layout>
  );
};

const StyledCategories = styled.section`
  min-height: 100vh;
  margin-bottom: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;

  .categories__heading {
    font-size: 2.6rem;
    text-align: center;
    color: var(--color-white);
    font-weight: 600;
  }

  .dots-container {
    display: flex;
    justify-content: center;
    margin: 5rem 0 2rem;
  }

  .dot {
    width: 1.2rem;
    height: 1.2rem;
    background-color: var(--color-white);
    margin-left: 1rem;
    border-radius: 50%;
    animation: pulse 1s linear infinite;
  }

  .dot-1 {
    animation-delay: 0.2s;
  }

  .dot-2 {
    animation-delay: 0.4s;
  }

  .dot-3 {
    animation-delay: 0.6s;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
    }
  }
`;

export default CategoriesPage;
