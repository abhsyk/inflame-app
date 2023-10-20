import { FC, MouseEvent, useCallback } from 'react';
import styled from 'styled-components';
import {
  BookmarkIcon,
  ChevronDownIcon,
  CrossIcon,
  LogoutIcon,
  Notification,
  SearchIcon,
} from '../../ui';
import { PageNav, Logo, Search } from '../../common';
import { useGameProvider } from '../../../context';
import avator from '../../../assets/images/avatar-icon.png';

const Header: FC = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { hasNotification, addedGameName, isUserInfoOpen, handleUserInfoOpen } =
    useGameProvider();

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
          <Logo />
          <Search />
          <div className="user-info" onClick={handleClickInside}>
            <img src={avator} className="avatar-icon" alt="Avatar" />
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
        <Notification
          hasNotification={hasNotification}
          addedGameName={addedGameName}
        />
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

    .avatar-icon {
      width: 4rem;
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

export default Header;
