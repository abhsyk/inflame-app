import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronDownIcon, CrossIcon, LogoIcon, SearchIcon } from '../../ui';
import { PageNav } from '../../common';
import useSearch from '../../../hooks/useSearch';

const Header: FC = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const { searchWord, searchWordChange, clearSearchWord, searchGames } =
    useSearch();

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
          <div className="user-info">
            <img
              src="src/assets/images/user-icon.png"
              className="user-icon"
              alt="User"
            />
            <p className="username">John Smith</p>
            <ChevronDownIcon className="chevron-icon" />
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
        <div className="notification">
          <p>Resident Evil 4 has been added to your bookmarks!</p>
        </div>
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

  .logo,
  .logo a {
    font-family: 'Rubik', sans-serif;
    color: var(--color-white);
    font-size: 3rem;
    display: flex;
    cursor: pointer;
  }

  .logo svg {
    font-size: 4.5rem;
  }

  .logo span {
    margin-top: 1rem;
    align-self: center;
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
  }

  .username {
    font-size: 1.6rem;
  }

  .chevron-icon {
    font-size: 2rem;
    color: var(--color-white);
  }

  .notification {
    position: fixed;
    background-color: yellow;
    font-size: 1.4rem;
    padding: 0.5rem 2rem;
    bottom: -5rem;
    left: 50%;
    border-radius: 3rem;
    -webkit-border-radius: 3rem;
    -moz-border-radius: 3rem;
    -ms-border-radius: 3rem;
    -o-border-radius: 3rem;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
    z-index: 10;
    display: none;
  }

  .notification.active {
    display: block;
    bottom: 3rem;
  }
`;

export default Header;
