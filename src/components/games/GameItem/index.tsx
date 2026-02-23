import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { Game } from '../../../types/Game';
import { BookmarkBtn } from '../../ui';
import { smallImage } from '../../../utils/smallImage';
import useGamesContext from '../../../hooks/useGamesContext';
import NotFoundImage from '../../../assets/images/not-found.jpg';

type Props = { game: Game };

const GameItem: FC<Props> = ({ game }) => {
  const { slug, name, released, tba } = game;
  const { user } = useGamesContext();
  const backgroundImage = smallImage(game.background_image, 640);
  const dotDate: string = released ? released.replace(/-0|-/gi, '.') : released;

  return (
    <StyledGame variants={cardAnim} initial="hidden" animate="show" exit="exit">
      <Link to={`/game/${slug}`}>
        <div className="games__image__wrapper">
          <img src={backgroundImage ?? NotFoundImage} alt={name} />
        </div>
        <div className="games__info">
          <h2 className="title">{name}</h2>
          <div className="games__info__bottom">
            <p className="release">
              <span className="release-title">Release date:</span>
              <span className="date"> {tba ? 'To be announced' : dotDate}</span>
            </p>
            <p className="games__link">View detail</p>
          </div>
          {user ? <BookmarkBtn game={game} /> : null}
        </div>
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.li)`
  list-style: none;

  a {
    display: flex;
    flex-direction: column;
    width: 37.3rem;
    height: 37.6rem;
    list-style: none;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    -ms-border-radius: 1rem;
    -o-border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
    justify-self: center;
    border: 0.05rem solid rgba(255, 255, 255, 0.05);

    @media (max-width: 1200px) {
      width: 100%;
    }

    @media (max-width: 1000px) {
      width: 100%;
    }

    @media (max-width: 800px) {
      height: 25rem;
    }
  }

  .games__image__wrapper {
    width: 100%;
    flex: 0 0 23.6rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.2s;
    }

    &:hover {
      img {
        opacity: 0.9;
      }
    }

    @media (max-width: 800px) {
      flex: 0 0 16rem;
    }
  }

  .games__info {
    width: 37.3rem;
    flex: 0 0 14rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    position: relative;
    justify-content: space-between;

    @media (max-width: 1200px) {
      width: 100%;
    }

    @media (max-width: 800px) {
      flex: 0 0 10rem;
    }

    .title {
      flex: 0 0 55%;
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.1;
      flex: 0 0 50%;

      @media (max-width: 800px) {
        flex: 0 0 50%;
        font-size: 1.6rem;
      }
    }

    &__bottom {
      flex: 0 0 45%;
      display: flex;
      flex-direction: column;
      margin-top: 1.5rem;

      @media (max-width: 800px) {
        flex: 0 0 50%;
        margin-top: 0;
      }
    }
  }

  .release {
    font-size: 1.3rem;
    line-height: 1;
    color: #444;

    .date {
      font-weight: 600;
    }

    @media (max-width: 800px) {
      font-size: 1.2rem;
    }

    @media (max-width: 580px) {
      .release-title {
        display: none;
      }
    }
  }

  .games__link {
    font-size: 1.6rem;
    font-weight: 600;
    color: #3030af;
    margin: 1rem 0;
    justify-self: center;

    @media (max-width: 800px) {
      font-size: 1.4rem;
      margin: 0.5rem 0;
    }
  }
`;

const cardAnim = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } },
};

export default GameItem;
