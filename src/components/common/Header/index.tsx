import { FC, useState } from 'react';
import { ChevronDownIcon, CrossIcon, LogoIcon, SearchIcon } from '../../ui';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className="header-container">
      <div className="header">
        <div className="header__content">
          <div className="logo">
            <Link to="/">
              <LogoIcon />
              <span>Inflame</span>
            </Link>
          </div>
          <div className="search__wrapper">
            <SearchIcon onClick={() => setIsSearchOpen(!isSearchOpen)} />
            <input
              className="search__input"
              type="text"
              placeholder="Search game ..."
            />
            <CrossIcon />
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
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item active">
            <Link to="/" className="navbar__link">
              Home
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/categories" className="navbar__link">
              Popular
            </Link>
          </li>
          <li className="navbar__item">
            <a href="#" className="navbar__link">
              New
            </a>
          </li>
          <li className="navbar__item">
            <a href="#" className="navbar__link">
              Upcoming
            </a>
          </li>
        </ul>

        {/* <!-- Search --> */}
        <div className={`search-box ${isSearchOpen ? 'active' : ''}`}>
          <div className="search__wrapper">
            <SearchIcon />
            <input
              className="search__input"
              type="text"
              placeholder="Search game ..."
            />
            <CrossIcon />
          </div>
        </div>

        {/* Notification */}
        <div className="notification">
          <p>Resident Evil 4 has been added to your bookmarks!</p>
        </div>
      </nav>
    </div>
  );
};

export default Header;
