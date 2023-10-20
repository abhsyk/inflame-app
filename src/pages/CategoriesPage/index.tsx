import { FC } from 'react';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import styled from 'styled-components';
import useGames from '../../hooks/useGames';
import { LoadingDots } from '../../components/ui';

const CategoriesPage: FC = () => {
  const { games, isLoading, handleNextPage, isNextLoading } = useGames();

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
        {!!games && games.length > 0 ? (
          <>
            <GamesList games={games} />
            <div className="btn-wrapper">
              {isNextLoading ? (
                <LoadingDots />
              ) : (
                <button onClick={() => handleNextPage()}>More</button>
              )}
            </div>
          </>
        ) : null}
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
    margin-top: 4rem;
    display: flex;
    justify-content: center;

    button {
      font-size: 2rem;
      background-color: rgba(255, 255, 255, 0.3);
      border: 0.1rem solid var(--color-white);
      padding: 1rem 4rem;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
`;

export default CategoriesPage;
