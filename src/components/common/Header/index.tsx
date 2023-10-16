import { FC } from 'react';
import { ChevronDownIcon, CrossIcon, LogoIcon, SearchIcon } from '../../ui';

const Header: FC = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="header__content">
          <div className="logo">
            <a href="/index.html">
              <LogoIcon />
              <span>Inflame</span>
            </a>
          </div>
          <div className="search__wrapper">
            <SearchIcon className="search-icon" />
            <input
              className="search__input"
              type="text"
              placeholder="Search game ..."
            />
            <CrossIcon className="cross-icon" />
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
            <a href="#" className="navbar__link">
              Home
            </a>
          </li>
          <li className="navbar__item">
            <a href="/categories.html" className="navbar__link">
              Popular
            </a>
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
        <div className="search-box">
          <div className="search__wrapper">
            <img
              className="search-icon"
              src="src/assets/images/search-icon.svg"
              alt="Search icon"
            />
            <input
              className="search__input"
              type="text"
              placeholder="Search game ..."
            />
            <img
              className="cross-icon"
              src="src/assets/images/cross-icon.svg"
              alt="Cross icon"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
