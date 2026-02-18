import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Categories } from '../../styles/GlobalStyles';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import { LoadingDots } from '../../components/ui';
import useGames from '../../hooks/useGames';
import useSearch from '../../hooks/useSearch';

const SearchPage: FC = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const { setSearchWord } = useSearch();
  const {
    games,
    isLoading,
    handleNextPage,
    isNextLoading,
    handleSearchGames,
    count,
    nextPage,
  } = useGames('search');

  useEffect(() => {
    if (params.key) {
      setSearchWord(params.key);
      handleSearchGames(params.key);
    }
  }, [params.key, setSearchWord, handleSearchGames]);

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
            <p>Results: {count}</p>
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
      padding: 1.13rem 4rem;
      border-radius: 0.5rem;
      color: var(--color-white);
      cursor: pointer;
    }
  }

  p {
    color: var(--color-white);
    font-size: 1.4rem;
  }
`;

export default SearchPage;
