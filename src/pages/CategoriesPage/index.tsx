import { ChangeEvent, FC } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import styled from 'styled-components';
import useGames from '../../hooks/useGames';
import useGenres from '../../hooks/useGenres';
import usePlatforms from '../../hooks/usePlatforms';
import { LoadingDots } from '../../components/ui';
import { Categories } from '../../styles/GlobalStyles';
import { CategoryPath } from '../../types';

const ORDERING_OPTIONS = [
  { value: '-rating', label: 'Top Rated' },
  { value: '-metacritic', label: 'Metacritic Score' },
  { value: '-released', label: 'Newest' },
  { value: 'released', label: 'Oldest' },
  { value: 'name', label: 'Name' },
] as const;

const DEFAULT_ORDERING: Partial<Record<CategoryPath, string>> = {
  'popular-games': '-rating',
  'new-games': '-released',
  'upcoming-games': '-added',
};

const CategoriesPage: FC = () => {
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const ordering = searchParams.get('ordering') || undefined;
  const genres = searchParams.get('genres') || undefined;
  const platforms = searchParams.get('platforms') || undefined;

  const { games, isLoading, handleNextPage, isNextLoading, nextPage, count } =
    useGames(undefined, { ordering, genres, platforms });
  const { genres: genreList } = useGenres();
  const { platforms: platformList } = usePlatforms();

  const buildParams = (overrides: Record<string, string>) => {
    const next: Record<string, string> = {};
    if (ordering) next.ordering = ordering;
    if (genres) next.genres = genres;
    if (platforms) next.platforms = platforms;
    return { ...next, ...overrides };
  };

  const handleOrderingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(buildParams({ ordering: e.target.value }));
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const next = buildParams({});
    if (val) next.genres = val;
    else delete next.genres;
    setSearchParams(next);
  };

  const handlePlatformChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const next = buildParams({});
    if (val) next.platforms = val;
    else delete next.platforms;
    setSearchParams(next);
  };

  const effectiveOrdering = ordering || (categoryId ? DEFAULT_ORDERING[categoryId] : undefined) || '-rating';

  return (
    <Layout>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <Container className="categories">
          <Toolbar>
            <p>Results: {count}</p>
            <Filters>
              <Select value={genres || ''} onChange={handleGenreChange}>
                <option value="">All Genres</option>
                {genreList.map((g) => (
                  <option key={g.id} value={g.slug}>
                    {g.name}
                  </option>
                ))}
              </Select>
              <Select value={platforms || ''} onChange={handlePlatformChange}>
                <option value="">All Platforms</option>
                {platformList.map((p) => (
                  <option key={p.id} value={String(p.id)}>
                    {p.name}
                  </option>
                ))}
              </Select>
              <Select value={effectiveOrdering} onChange={handleOrderingChange}>
                {ORDERING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </Filters>
          </Toolbar>
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

  p {
    color: var(--color-white);
    font-size: 1.4rem;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
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

export default CategoriesPage;
