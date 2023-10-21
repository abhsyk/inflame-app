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
        {!!games && games.length > 0 ? (
          <>
            <GamesList games={games} />
            <div className="btn-wrapper">
              {isNextLoading ? (
                <LoadingDots center />
              ) : (
                <button onClick={() => handleNextPage()}>View more</button>
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
    margin-top: 3rem;
    display: flex;
    justify-content: center;

    button {
      font-family: var(--font-secondary);
      font-size: 1.6rem;
      background-color: transparent;
      border: none;
      padding: 1.13rem 4rem;
      border-radius: 0.5rem;
      color: var(--color-white);
      cursor: pointer;
    }
  }
`;

export default CategoriesPage;
