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
      <Container className="categories">
        {/* <h1 className="categories__heading">{categoryName} Games</h1> */}
        {!!games && games.length > 0 ? <GamesList games={games} /> : null}
        <div className="btn-wrapper">
          <button onClick={() => handleNextPage()}>More</button>
        </div>
      </Container>
    </Layout>
  );
};

const Container = styled.section`
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

  .btn-wrapper {
    margin-top: 3rem;
    display: flex;
    justify-content: center;

    button {
      font-size: 2rem;
      background-color: var(--color-white);
      border: none;
      padding: 1rem 4rem;
      border-radius: 1rem;
      cursor: pointer;
    }
  }
`;

export default CategoriesPage;
