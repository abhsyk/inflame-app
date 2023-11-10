import { FC } from 'react';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import styled from 'styled-components';
import useGames from '../../hooks/useGames';
import { LoadingDots } from '../../components/ui';
import { Categories } from '../../styles/GlobalStyles';

const CategoriesPage: FC = () => {
  const { games, isLoading, handleNextPage, isNextLoading, nextPage } =
    useGames();

  return (
    <Layout>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <Container className="categories">
          {!!games && games.length > 0 ? (
            <>
              <GamesList games={games} />
              <div className="btn-wrapper">
                {isNextLoading ? (
                  <LoadingDots center />
                ) : nextPage ? (
                  <button onClick={() => handleNextPage()}>View more</button>
                ) : null}
              </div>
            </>
          ) : null}
        </Container>
      )}
    </Layout>
  );
};

const Container = styled(Categories)`
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
    height: 3rem;
    margin-top: 3rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      font-family: var(--font-secondary);
      font-size: 1.6rem;
      background-color: transparent;
      border: none;
      padding: 1rem 4rem;
      border-radius: 0.5rem;
      color: var(--color-white);
      cursor: pointer;
    }
  }
`;

export default CategoriesPage;
