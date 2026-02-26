import { FC, useState } from 'react';
import styled from 'styled-components';
import { Notification } from '../../../ui';
import { PageNav, Logo, Search, UserInfo } from '../../header';
import useGamesContext from '../../../../hooks/useGamesContext';

const Header: FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const { user, hasNotification, addedGameName } = useGamesContext();

  return (
    <Container>
      <div className="header">
        <div className="header__content">
          <Logo />
          <Search isSearchOpen={isSearchOpen} onSearchOpen={setIsSearchOpen} />
          <UserInfo isLoggedIn={!!user} />
        </div>
      </div>
      <PageNav>
        {/* <!-- Search --> */}
        <div className={`search-box ${isSearchOpen ? 'active' : ''}`}>
          <Search isSearchOpen={isSearchOpen} onSearchOpen={setIsSearchOpen} />
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
    z-index: 100;

    &__content {
      width: calc(100% - 5rem);
      // max-width: 120rem;
      height: 6.5rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 580px) {
        justify-content: unset;
      }
    }
  }

  .search-box {
    display: none;

    @media (max-width: 580px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 10rem;
      box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);

      form {
        flex: 1;
        display: flex;
        justify-content: center;
      }

      .search__input {
        width: 100%;
        border: 0.1rem solid #444;

        &:focus {
          border: 0.1rem solid #444;
        }
      }

      button[type='button'] {
        position: absolute;
        right: 0;
        top: -0.3rem;
        visibility: visible;
        opacity: 1;
      }
    }
  }
`;

export default Header;
