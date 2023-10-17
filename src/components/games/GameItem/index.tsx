import { FC } from 'react';
import { Game } from '../../../types/Type';
import { Link } from 'react-router-dom';

type Props = {
  game: Game;
};

const GameItem: FC<Props> = ({ game: { title, image, release } }) => {
  return (
    <Link to="/something">
      <li className="games__item">
        <div className="games__image__wrapper">
          <img src={image} alt={title} />
        </div>
        <div className="games__info">
          <h2 className="title">{title}</h2>
          <div className="games__info__bottom">
            <p className="release">
              Release date:
              <span>{release}</span>
            </p>
            <p className="games__link">View detail</p>
          </div>
          <button className="bookmark-btn">+</button>
        </div>
      </li>
    </Link>
  );
};

export default GameItem;
