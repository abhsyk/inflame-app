import { FC } from 'react';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import styled from 'styled-components';
import useGames from '../../hooks/useGames';
import { LoadingDots } from '../../components/ui';

const CategoriesPage: FC = () => {
  const { games, isLoading, handleNextPage } = useGames();

  if (isLoading) {
    return (
      <Layout>
        <LoadingDots />
      </Layout>
    );
  }

  return (
    <Layout>
      <StyledCategories className="categories">
        {/* <h1 className="categories__heading">{categoryName} Games</h1> */}
        {!!games && games.length > 0 ? <GamesList games={games} /> : null}
        {isLoading && <LoadingDots />}
        <button onClick={() => handleNextPage()}>More!</button>
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
`;

export default CategoriesPage;
