import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import type { Movie } from '../../../types';

type Props = { movies: Movie[] };

const Trailers: FC<Props> = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!movies.length) return null;

  const current = movies[activeIndex];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <Section>
      <h2 className="trailers__title">Trailers</h2>
      <div className="trailers__player">
        <video
          ref={videoRef}
          key={current.id}
          controls
          poster={current.preview}
          preload="metadata"
        >
          <source src={current.data.max} type="video/mp4" />
          <source src={current.data['480']} type="video/mp4" />
        </video>
        {movies.length > 1 && (
          <p className="trailers__name">{current.name}</p>
        )}
      </div>
      {movies.length > 1 && (
        <div className="trailers__thumbnails">
          {movies.map((movie, i) => (
            <button
              key={movie.id}
              className={`trailers__thumb${i === activeIndex ? ' active' : ''}`}
              onClick={() => handleSelect(i)}
            >
              <img src={movie.preview} alt={movie.name} draggable={false} />
              <span>{movie.name}</span>
            </button>
          ))}
        </div>
      )}
    </Section>
  );
};

const Section = styled.section`
  margin-top: 3rem;

  .trailers__title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 1.6rem;
  }

  .trailers__player {
    video {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      display: block;
    }
  }

  .trailers__name {
    font-size: 1.4rem;
    color: #d0d0d0;
    margin-top: 0.8rem;
  }

  .trailers__thumbnails {
    display: flex;
    gap: 1.2rem;
    margin-top: 1.2rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .trailers__thumb {
    flex: 0 0 16rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    background: none;
    border: 0.1rem solid transparent;
    cursor: pointer;
    padding: 0;
    transition: border-color 0.2s;

    img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      filter: grayscale(0.6);
      transition: filter 0.2s;
    }

    span {
      font-size: 1.2rem;
      color: #aaa;
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &.active img,
    &:hover img {
      filter: grayscale(0);
    }

    &.active {
      border-color: rgba(255, 255, 255, 0.6);
    }
  }
`;

export default Trailers;
