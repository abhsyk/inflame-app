import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Categories } from '../../styles/GlobalStyles';
import { Layout } from '../../components/common';
import { GamesList, GamesSkeletonList } from '../../components/games';
import { LoadingDots } from '../../components/ui';
import useGames from '../../hooks/useGames';
import useGenres from '../../hooks/useGenres';
import usePlatforms from '../../hooks/usePlatforms';

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
  const { genres } = useGenres();
  const { platforms } = usePlatforms();
  const [lastChangedFilter, setLastChangedFilter] = useState<'genres' | 'platforms' | null>(null);

  useEffect(() => {
    if (params.q) {
      const totalPages = Number(params.page) || 1;
      handleSearchGames(params.q, params.ordering, params.genres, params.platforms, totalPages);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.q, params.ordering, params.genres, params.platforms, handleSearchGames]);

  const buildParams = (overrides: Record<string, string>) => ({
    q: params.q,
    ordering: params.ordering || '-rating',
    ...(params.genres ? { genres: params.genres } : {}),
    ...(params.platforms ? { platforms: params.platforms } : {}),
    ...overrides,
  });

  const handleOrderingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(buildParams({ ordering: e.target.value }));
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const next = buildParams({});
    if (val) { next.genres = val; setLastChangedFilter('genres'); }
    else { delete next.genres; setLastChangedFilter(null); }
    setSearchParams(next);
  };

  const handlePlatformChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const next = buildParams({});
    if (val) { next.platforms = val; setLastChangedFilter('platforms'); }
    else { delete next.platforms; setLastChangedFilter(null); }
    setSearchParams(next);
  };

  return (
    <Layout>
      <Container className="categories">
        {params.q && (
          <Toolbar>
            <p>Results: {count}</p>
            <Filters>
              <Select
                value={params.genres || ''}
                onChange={handleGenreChange}
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.slug}>
                    {g.name}
                  </option>
                ))}
              </Select>
              <Select
                value={params.platforms || ''}
                onChange={handlePlatformChange}
              >
                <option value="">All Platforms</option>
                {platforms.map((p) => (
                  <option key={p.id} value={String(p.id)}>
                    {p.name}
                  </option>
                ))}
              </Select>
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
            </Filters>
          </Toolbar>
        )}
        {isLoading ? (
          <GamesSkeletonList count={12} />
        ) : games.length > 0 ? (
          <>
            <GamesList games={games} />
            <div className="btn-wrapper">
              {isNextLoading ? (
                <LoadingDots center />
              ) : nextPage ? (
                <button onClick={() => { const cur = Number(params.page) || 1; handleNextPage(); setSearchParams(buildParams({ page: String(cur + 1) }), { replace: true }); }}>View more</button>
              ) : null}
            </div>
          </>
        ) : params.q ? (
          <EmptyMessage>
            <span>No results found for "{params.q}"</span>
            {params.genres && (lastChangedFilter === null || lastChangedFilter === 'genres') && (
              <ClearButton
                onClick={() => {
                  const next = buildParams({});
                  delete next.genres;
                  setLastChangedFilter(null);
                  setSearchParams(next);
                }}
              >
                Clear genre filter
              </ClearButton>
            )}
            {params.platforms && (lastChangedFilter === null || lastChangedFilter === 'platforms') && (
              <ClearButton
                onClick={() => {
                  const next = buildParams({});
                  delete next.platforms;
                  setLastChangedFilter(null);
                  setSearchParams(next);
                }}
              >
                Clear platform filter
              </ClearButton>
            )}
          </EmptyMessage>
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

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  padding: 6rem 0;
  color: var(--color-white);
  font-size: 1.6rem;
  opacity: 0.7;
`;

const ClearButton = styled.button`
  font-family: var(--font-secondary);
  font-size: 1.3rem;
  color: var(--color-white);
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 0.6rem 1.6rem;
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary);
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

  @media (max-width: 580px) {
    font-size: 1.2rem;
    padding: 0.5rem 0.8rem;
  }
`;

export default SearchPage;
