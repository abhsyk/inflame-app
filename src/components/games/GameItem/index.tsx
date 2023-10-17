import { FC, MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Game } from '../../../types/Type';
import styled from 'styled-components';

type Props = { game: Game };

const GameItem: FC<Props> = ({
  game: { id, slug, name, background_image, released },
}) => {
  const handleBookmark = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      console.log('Bookmarked!', id);
    },
    [id]
  );

  const dotDate: string = released ? released.replace(/-0|-/gi, '.') : released;

  return (
    <Link to={`/game/${slug}`}>
      <StyledGame
        className="games__item"
        variants={cardAnim}
        initial="hidden"
        animate="show"
      >
        <div className="games__image__wrapper">
          <img src={background_image} alt={name} />
        </div>
        <div className="games__info">
          <h2 className="title">{name}</h2>
          <div className="games__info__bottom">
            <p className="release">
              Release date:
              <span> {dotDate}</span>
            </p>
            <p className="games__link">View detail</p>
          </div>
          <button className="bookmark-btn" onClick={handleBookmark}>
            +
          </button>
        </div>
      </StyledGame>
    </Link>
  );
};

const cardAnim = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const StyledGame = styled(motion.li)`
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

  .games__image__wrapper {
    width: 100%;
    flex: 0 0 23.6rem;
    overflow: hidden;

    img {
      height: 100%;
      object-fit: cover;
      transition: opacity 0.2s;
    }

    &:hover {
      img {
        opacity: 0.9;
      }
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
  }

  .games__info .title {
    flex: 0 0 55%;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.1;
    flex: 0 0 50%;
  }

  .games__info__bottom {
    flex: 0 0 45%;
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
  }

  .release {
    font-size: 1.3rem;
    line-height: 1;
    color: #444;
  }

  .release span {
    font-weight: 600;
  }

  .games__link {
    font-size: 1.6rem;
    font-weight: 600;
    color: #3030af;
    margin: 1rem 0;
    justify-self: center;
  }

  .bookmark-btn {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: var(--color-white);
    font-size: 2rem;
    background-color: var(--color-body);
    border: none;
    padding: 1rem 1.6rem;
    border-radius: 0.5rem;
    -webkit-border-radius: 0.5rem;
    -moz-border-radius: 0.5rem;
    -ms-border-radius: 0.5rem;
    -o-border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    -webkit-transition: background-color 0.2s;
    -moz-transition: background-color 0.2s;
    -ms-transition: background-color 0.2s;
    -o-transition: background-color 0.2s;
  }

  .bookmark-btn:hover {
    background-color: #444;
  }
`;

export default GameItem;
