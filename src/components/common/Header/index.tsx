import { FC, MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  BookmarkIcon,
  ChevronDownIcon,
  CrossIcon,
  LogoIcon,
  LogoutIcon,
  SearchIcon,
} from '../../ui';
import { PageNav } from '../../common';
import useSearch from '../../../hooks/useSearch';

import { useGameProvider } from '../../../context';

const Header: FC = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { hasNotification, addedGameName, isUserInfoOpen, handleUserInfoOpen } =
    useGameProvider();
  const { searchWord, searchWordChange, clearSearchWord, searchGames } =
    useSearch();

  const handleClickInside = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      handleUserInfoOpen(!isUserInfoOpen);
    },
    [handleUserInfoOpen, isUserInfoOpen]
  );

  return (
    <Container>
      <div className="header">
        <div className="header__content">
          <div className="logo">
            <Link to="/">
              <LogoIcon />
              <span>Inflame</span>
            </Link>
          </div>
          <div className="search__wrapper">
            <SearchIcon
              onClick={searchGames}
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
          </div>
          <div className="user-info" onClick={handleClickInside}>
            <img
              src="src/assets/images/user-icon.png"
              className="user-icon"
              alt="User"
            />
            <p className="username">John Smith</p>
            <ChevronDownIcon className="chevron-icon" />
            <ul className={`user-info__list ${isUserInfoOpen ? 'active' : ''}`}>
              <li>
                <BookmarkIcon />
                Bookmarks
              </li>
              <li>
                <LogoutIcon />
                Log Out
              </li>
            </ul>
          </div>
        </div>
      </div>
      <PageNav>
        {/* <!-- Search --> */}
        <div
          className={`search-box`}
          // ${isSearchOpen ? 'active' : ''}
        >
          <div className="search__wrapper">
            <SearchIcon />
            <input className="search__input" type="text" placeholder="Search" />
            <CrossIcon />
          </div>
        </div>
        {/* Notification */}

        <Notification className={hasNotification ? 'active' : ''}>
          <p>
            <strong>{addedGameName}</strong> has been added to your bookmarks!
          </p>
        </Notification>
      </PageNav>
    </Container>
  );
};

const Container = styled.div`
  .header {
    background-color: #15182b;
  }

  .header__content {
    max-width: 120rem;
    height: 6.5rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    a {
      font-family: 'Rubik', sans-serif;
      color: var(--color-white);
      font-size: 3rem;
      display: flex;
      cursor: pointer;
    }

    svg {
      font-size: 4.5rem;
    }

    span {
      margin-top: 1rem;
      align-self: center;
    }
  }

  .search__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 2.5rem;
  }

  .search__input {
    width: 45rem;
    padding: 1rem 5rem;
    background: rgba(255, 255, 255, 0.1);
    font-size: 1.6rem;
    color: var(--color-white);
    border: 0.1rem solid transparent;
    outline: none;
    border-radius: 3rem;
    -webkit-border-radius: 3rem;
    -moz-border-radius: 3rem;
    -ms-border-radius: 3rem;
    -o-border-radius: 3rem;
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
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border: none;
    outline: none;
    color: #777;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    transition: all 0.1s;
    -webkit-transition: all 0.1s;
    -moz-transition: all 0.1s;
    -ms-transition: all 0.1s;
    -o-transition: all 0.1s;
    display: grid;
    place-items: center;
  }

  .search__input {
    &:focus {
      border: 0.1rem solid #d71bae;

      &:focus ~ button,
      &:hover ~ button {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .search-box {
    display: none;
  }

  .user-info {
    display: flex;
    gap: 1rem;
    color: var(--color-white);
    align-items: center;
    padding: 1rem;
    position: relative;
    cursor: pointer;

    &__list {
      display: flex;
      flex-direction: column;
      width: 18rem;
      position: absolute;
      top: 100%;
      right: 0;
      color: var(--color-body);
      background-color: var(--color-white);
      z-index: 100;
      box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
      border-radius: 0 0 0.5rem 0.5rem;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s;

      li {
        display: flex;
        align-items: center;
        padding: 1rem 2rem;
        gap: 1rem;
        font-size: 1.6rem;
        list-style: none;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #ccc;
        }

        svg {
          font-size: 2rem;
        }
      }

      &.active {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .username {
    font-size: 1.6rem;
  }

  .chevron-icon {
    font-size: 2rem;
    color: var(--color-white);
  }
`;

const Notification = styled.div`
  position: fixed;
  background-color: yellow;
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
  left: 50%;
  border-radius: 3rem;
  transform: translateX(-50%);
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  bottom: -5rem;
  visibility: hidden;
  opacity: 0;
  z-index: 10;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  &.active {
    bottom: 4rem;
    visibility: visible;
    opacity: 1;
  }
`;

export default Header;
