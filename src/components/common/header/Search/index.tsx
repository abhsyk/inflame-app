import { FC, FormEvent, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import useSearch from '../../../../hooks/useSearch';
import { SearchIcon, CrossIcon } from '../../../ui';
import useGames from '../../../../hooks/useGames';

const Search: FC = () => {
  const { searchWord, searchWordChange, clearSearchWord } = useSearch();
  const { handleSearchGames } = useGames();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (searchWord.trim().length) {
        handleSearchGames(searchWord);
      }
    },
    [searchWord, handleSearchGames]
  );

  useEffect(() => {
    const escapeKeyCallback = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchWord.trim().length > 0) {
        clearSearchWord();
      }
    };
    document.addEventListener('keydown', escapeKeyCallback);
    return () => removeEventListener('keydown', escapeKeyCallback);
  }, [searchWord, clearSearchWord]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <SearchIcon

          // onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
        </button>
        <input
          className="search__input"
          type="text"
          placeholder="Search"
          value={searchWord}
          onChange={searchWordChange}
        />
        <button type="button" onClick={clearSearchWord}>
          <CrossIcon />
        </button>
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

export default Search;
