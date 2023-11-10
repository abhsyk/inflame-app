import { FC, useEffect } from 'react';
import styled from 'styled-components';
import useSearch from '../../../../hooks/useSearch';
import { CrossIcon, SearchIcon } from '../../../ui';

const Search: FC = () => {
  const { searchWord, searchWordChange, clearSearchWord, handleSearchGames } =
    useSearch();

  console.log(searchWord);

  useEffect(() => {
    const escapeKeyCallback = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchWord.trim().length > 0) {
        clearSearchWord();
      }
    };
    document.addEventListener('keydown', escapeKeyCallback);
    return () => removeEventListener('keydown', escapeKeyCallback);
  }, [searchWord, clearSearchWord]);

  useEffect(() => {
    const enterKeyCallback = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && searchWord.trim().length > 0) {
        handleSearchGames();
      }
    };
    document.addEventListener('keydown', enterKeyCallback);
    return () => removeEventListener('keydown', enterKeyCallback);
  }, [searchWord, handleSearchGames]);

  return (
    <Container>
      <SearchIcon
        onClick={handleSearchGames}
        // onClick={() => setIsSearchOpen(!isSearchOpen)}
      />
      <input
        className="search__input"
        type="text"
        placeholder="Search"
        value={searchWord}
        onChange={searchWordChange}
      />
      <button onClick={clearSearchWord}>
        <CrossIcon />
      </button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .search__input {
    width: 45rem;
    padding: 0.8rem 5rem;
    background: rgba(255, 255, 255, 0.1);
    font-size: 1.6rem;
    color: var(--color-white);
    border: 0.1rem solid transparent;
    outline: none;
    border-radius: 3rem;

    &:focus {
      border: 0.1rem solid var(--color-primary);
    }
    &:focus ~ button {
      visibility: visible;
      opacity: 1;
    }
  }

  .search-icon {
    position: absolute;
    left: 1.5rem;
    font-size: 2.2rem;
    color: #777;
  }

  button {
    position: absolute;
    right: 0;
    font-size: 2.4rem;
    padding: 1.4rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border: none;
    outline: none;
    color: #777;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    transition: all 0.1s;
    display: grid;
    place-items: center;
    z-index: 10;
  }
`;

export default Search;
