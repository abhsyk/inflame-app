import { FC, FormEvent, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import useSearch from '../../../../hooks/useSearch';
import { SearchIcon, CrossIcon } from '../../../ui';

type Props = {
  isSearchOpen: boolean;
  onSearchOpen: (isSearchOpen: boolean) => void;
};

const Search: FC<Props> = ({ isSearchOpen, onSearchOpen }) => {
  const {
    searchWord,
    searchWordChange,
    clearSearchWord,
    searchGames,
    suggestions,
    clearSuggestions,
    selectSuggestion,
  } = useSearch();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (searchWord.trim().length) {
        searchGames();
      }
    },
    [searchWord, searchGames]
  );

  useEffect(() => {
    const escapeKeyCallback = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (suggestions.length > 0) {
          clearSuggestions();
        } else if (searchWord.trim().length > 0) {
          clearSearchWord();
        }
      }
    };
    document.addEventListener('keydown', escapeKeyCallback);
    return () => document.removeEventListener('keydown', escapeKeyCallback);
  }, [searchWord, clearSearchWord, suggestions, clearSuggestions]);

  const handleBlur = useCallback(() => {
    // 候補クリックより後に閉じる
    setTimeout(() => clearSuggestions(), 150);
  }, [clearSuggestions]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <SearchIcon onClick={() => onSearchOpen(!isSearchOpen)} />
        </button>
        <input
          className="search__input"
          type="text"
          placeholder="Search in English (e.g. Zelda)"
          value={searchWord}
          onChange={searchWordChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
        <button type="button" onClick={clearSearchWord}>
          <CrossIcon />
        </button>
        {suggestions.length > 0 && (
          <SuggestionList>
            {suggestions.map((s) => (
              <SuggestionItem
                key={s.slug}
                onMouseDown={() => selectSuggestion(s.name)}
              >
                <SearchIcon />
                <span>{s.name}</span>
              </SuggestionItem>
            ))}
          </SuggestionList>
        )}
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  form {
    position: relative;
  }

  .search__input {
    width: 45rem;
    padding: 0.8rem 5rem;
    background: rgba(255, 255, 255, 0.1);
    font-size: 1.6rem;
    color: var(--color-white);
    border: 0.1rem solid transparent;
    outline: none;
    border-radius: 3rem;
    transition: border 0.1s 0.1s;

    &:focus {
      border: 0.1rem solid var(--color-primary);
    }
    &:focus ~ button {
      visibility: visible;
      opacity: 1;
    }

    @media (max-width: 800px) {
      width: 30rem;
    }
  }

  button[type='submit'] {
    position: absolute;
    left: 1.5rem;
    font-size: 2.2rem;
    color: #777;
    background-color: transparent;
    border: none;
    outline: none;
    top: 1.1rem;

    @media (max-width: 580px) {
      position: unset;
      display: grid;
      place-items: center;
    }
  }

  button[type='button'] {
    position: absolute;
    right: 0;
    top: -0.3rem;
    font-size: 2.4rem;
    padding: 1.2rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border: none;
    outline: none;
    color: #777;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    transition: all 0.1s 0.1s;
    display: grid;
    place-items: center;
    z-index: 10;
  }
`;

const SuggestionList = styled.ul`
  position: absolute;
  top: calc(100% + 0.6rem);
  left: 0;
  width: 100%;
  background: #2a2a2a;
  border: 0.1rem solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  list-style: none;
  padding: 0.4rem 0;
  margin: 0;
  z-index: 100;
  overflow: hidden;
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.6rem;
  font-size: 1.4rem;
  color: var(--color-white);
  cursor: pointer;
  transition: background 0.1s;

  svg {
    font-size: 1.4rem;
    color: #777;
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);

    svg {
      color: var(--color-primary);
    }
  }
`;

export default Search;
