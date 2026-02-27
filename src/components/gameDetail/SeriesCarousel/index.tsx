import { FC, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Game } from '../../../types';
import { smallImage } from '../../../utils/smallImage';
import { ChevronLeftIcon, ChevronRightIcon } from '../../ui/icons';

type Props = { games: Game[] };

const SeriesCarousel: FC<Props> = ({ games }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  }, []);

  if (!games.length) return null;

  return (
    <Section>
      <header className="series__header">
        <h2 className="series__title">Game Series</h2>
        <div className="series__controls">
          <button className="series__btn" onClick={() => scroll('left')} aria-label="Previous">
            <ChevronLeftIcon />
          </button>
          <button className="series__btn" onClick={() => scroll('right')} aria-label="Next">
            <ChevronRightIcon />
          </button>
        </div>
      </header>
      <div className="series__track" ref={trackRef}>
        {games.map((game) => (
          <Link key={game.id} to={`/game/${game.slug}`} className="series__card">
            <img
              src={smallImage(game.background_image, 420)}
              alt={game.name}
              draggable={false}
            />
            <span className="series__card-name">{game.name}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
};

const Section = styled.section`
  margin-top: 4rem;

  .series__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.6rem;
  }

  .series__title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-white);
  }

  .series__controls {
    display: flex;
    gap: 0.8rem;
  }

  .series__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 0.1rem solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: background 0.2s;

    svg {
      color: var(--color-white);
      font-size: 1.8rem;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.22);
    }
  }

  .series__track {
    display: flex;
    gap: 1.6rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .series__card {
    flex: 0 0 22rem;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    text-decoration: none;

    img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 0.8rem;
      transition: transform 0.25s, opacity 0.25s;
    }

    &:hover img {
      transform: scale(1.04);
      opacity: 0.85;
    }
  }

  .series__card-name {
    font-size: 1.3rem;
    color: #d0d0d0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 600px) {
    .series__card {
      flex: 0 0 16rem;
    }

    .series__title {
      font-size: 1.6rem;
    }
  }
`;

export default SeriesCarousel;
