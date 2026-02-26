import { ChangeEvent, FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Categories } from '../../styles/GlobalStyles';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import { LoadingDots } from '../../components/ui';
import useGames from '../../hooks/useGames';

const ORDERING_OPTIONS = [
  { value: '-rating', label: 'Top Rated' },
  { value: '-metacritic', label: 'Metacritic Score' },
  { value: '-released', label: 'Newest' },
  { value: 'released', label: 'Oldest' },
  { value: 'name', label: 'Name' },
] as const;

const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
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
    if (params.q) {
      handleSearchGames(params.q, params.ordering);
    }
  }, [params.q, params.ordering, handleSearchGames]);

  const handleOrderingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ q: params.q, ordering: e.target.value });
  };

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
            <Toolbar>
              <p>Results: {count}</p>
              <Select
                value={params.ordering || '-rating'}
                onChange={handleOrderingChange}
              >
                {ORDERING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </Toolbar>
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

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Select = styled.select`
  font-family: var(--font-secondary);
  font-size: 1.3rem;
  color: var(--color-white);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  outline: none;

  option {
    background-color: #333;
    color: var(--color-white);
  }

  &:hover {
    border-color: var(--color-primary);
  }
`;

export default SearchPage;
