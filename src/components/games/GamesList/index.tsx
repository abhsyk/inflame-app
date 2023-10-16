import { FC } from 'react';

const GamesList: FC = () => {
  return (
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
          <img src="src/assets/images/cyberpunk.jpg" alt="Resident Evil 4" />
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
  );
};

export default GamesList;
