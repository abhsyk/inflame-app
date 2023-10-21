import { FC } from 'react';
import styled from 'styled-components';
import { useGameProvider } from '../../../../context';
import { CrossIcon, Notification, SearchIcon } from '../../../ui';
import { PageNav, Logo, Search, UserInfo } from '../../header';

const Header: FC = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { isLoggedIn, hasNotification, addedGameName } = useGameProvider();

  return (
    <Container>
      <div className="header">
        <div className="header__content">
          <Logo />
          <Search />
          <UserInfo isLoggedIn={isLoggedIn} />
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

    &__content {
      max-width: 120rem;
      height: 6.5rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .search-box {
    display: none;
  }
`;

export default Header;
