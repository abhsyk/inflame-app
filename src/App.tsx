function App() {
  return (
    <div className="container">
      {/* <!-- Header --> */}
      <div className="header-container">
        <div className="header">
          <div className="header__content">
            <div className="logo">
              <a href="/index.html">
                <img src="src/assets/images/logo-icon.svg" alt="Logo icon" />
                <span>Inflame</span>
              </a>
            </div>
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

            <div className="user-info">
              <img
                src="src/assets/images/user-icon.png"
                className="user-icon"
                alt="User"
              />
              <p className="username">John Smith</p>
              <img
                src="src/assets/images/chevron-down.svg"
                className="chevron-icon"
                alt="chevron"
              />
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
      {/* <!-- Header ends --> */}

      {/* <!-- Carousel --> */}
      <section className="carousel">
        <div className="carousel__image__wrapper">
          <img src="src/assets/images/cyberpunk.jpg" alt="" />
        </div>
        <div className="circles">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </section>
      {/* <!-- Carousel ends --> */}

      {/* <!-- Games --> */}
      <section className="games">
        <div className="games__text">
          <div className="games__tagline">
            <button className="active">Popular</button>
            <button>New</button>
            <button>Upcoming</button>
          </div>
          <a href="#">View more</a>
        </div>

        <ul className="games__list">
          <li className="games__item">
            <div className="games__image__wrapper">
              <img
                src="src/assets/images/resident-evil-4.jpg"
                alt="Resident Evil 4"
              />
            </div>
            <div className="games__info">
              <h2 className="title">Resident Evil 4</h2>
              <div className="games__info__bottom">
                <p className="release">
                  Release date:
                  <span>2023.3.24</span>
                </p>
                <a href="/details.html" className="games__link">
                  View detail
                </a>
              </div>
              <button className="bookmark-btn">+</button>
            </div>
          </li>

          <li className="games__item">
            <div className="games__image__wrapper">
              <img
                src="src/assets/images/cyberpunk.jpg"
                alt="Resident Evil 4"
              />
            </div>
            <div className="games__info">
              <h2 className="title">Cyberpunk 2077: Phantom Liberty</h2>
              <div className="games__info__bottom">
                <p className="release">
                  Release date:
                  <span>2023.9.26</span>
                </p>
                <a href="#" className="games__link">
                  View detail
                </a>
              </div>
              <button className="bookmark-btn">+</button>
            </div>
          </li>
          <li className="games__item">
            <div className="games__image__wrapper">
              <img
                src="src/assets/images/baldurs-gate-3.jpg"
                alt="Baldur's Gate III"
              />
            </div>
            <div className="games__info">
              <h2 className="title">Baldur's Gate III</h2>
              <div className="games__info__bottom">
                <p className="release">
                  Release date:
                  <span>2023.9.26</span>
                </p>
                <a href="#" className="games__link">
                  View detail
                </a>
              </div>
              <button className="bookmark-btn">+</button>
            </div>
          </li>
          <li className="games__item">
            <div className="games__image__wrapper">
              <img
                src="src/assets/images/bomb-rush-cyberfunk.jpg"
                alt="Bomb Rush Cyberfunk"
              />
            </div>
            <div className="games__info">
              <h2 className="title">Bomb Rush Cyberfunk</h2>
              <div className="games__info__bottom">
                <p className="release">
                  Release date:
                  <span>2023.8.16</span>
                </p>
                <a href="#" className="games__link">
                  View detail
                </a>
              </div>
              <button className="bookmark-btn">+</button>
            </div>
          </li>
          <li className="games__item">
            <div className="games__image__wrapper">
              <img src="src/assets/images/hi-fi-rush.jpg" alt="Hi-Fi Rush" />
            </div>
            <div className="games__info">
              <h2 className="title">Hi-Fi Rush</h2>
              <div className="games__info__bottom">
                <p className="release">
                  Release date:
                  <span>2023.1.25</span>
                </p>
                <a href="#" className="games__link">
                  View detail
                </a>
              </div>
              <button className="bookmark-btn">+</button>
            </div>
          </li>
          <li className="games__item">
            <div className="games__image__wrapper">
              <img
                src="src/assets/images/metroid-prime-remastered.jpg"
                alt="Metroid Prime Remastered"
              />
            </div>
            <div className="games__info">
              <h2 className="title">Metroid Prime Remastered</h2>
              <div className="games__info__bottom">
                <p className="release">
                  Release date:
                  <span>2023.2.8</span>
                </p>
                <a href="#" className="games__link">
                  View detail
                </a>
              </div>
              <button className="bookmark-btn">+</button>
            </div>
          </li>
        </ul>
      </section>
      {/* <!-- Games ends --> */}

      {/* <!-- Footer --> */}
      <footer className="footer">
        <div className="footer__content">
          <p className="copyright">
            Copyright © 2023
            <span>@abhsyk</span>. All rights reserved
          </p>
          <div className="social-media">
            <img
              src="src/assets/images/instagram-icon.svg"
              alt="Instagram icon"
            />
            <img src="src/assets/images/twitter-icon.svg" alt="Twitter icon" />
            <img src="src/assets/images/youtube-icon.svg" alt="YouTube icon" />
          </div>
        </div>
      </footer>
      {/* <!-- Footer ends --> */}
    </div>
  );
}

export default App;
