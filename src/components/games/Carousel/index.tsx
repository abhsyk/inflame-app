import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Game } from '../../../types';
import { smallImage } from '../../../utils/smallImage';
import { Link } from 'react-router-dom';

type Props = { games: Game[] };

const SLIDE_COUNT = 5;
const AUTO_PLAY_MS = 6000;
const DRAG_THRESHOLD = 50;

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const Carousel: FC<Props> = ({ games }) => {
  const slides = games.slice(0, SLIDE_COUNT);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout>();
  const isDragging = useRef(false);

  const goTo = useCallback(
    (next: number, dir?: number) => {
      const len = slides.length;
      const clampedNext = ((next % len) + len) % len;
      setDirection(dir ?? (clampedNext > index ? 1 : -1));
      setIndex(clampedNext);
    },
    [slides.length, index]
  );

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleDotClick = useCallback(
    (i: number) => {
      goTo(i, i > index ? 1 : -1);
      resetTimer();
    },
    [goTo, index, resetTimer]
  );

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      const dx = info.offset.x;
      if (Math.abs(dx) < DRAG_THRESHOLD) {
        isDragging.current = false;
        return;
      }
      if (dx < 0) {
        goTo(index + 1, 1);
      } else {
        goTo(index - 1, -1);
      }
      resetTimer();
      // 次のtickでリセット（clickイベントより後に実行される）
      setTimeout(() => {
        isDragging.current = false;
      }, 0);
    },
    [goTo, index, resetTimer]
  );

  if (!slides.length) return null;

  return (
    <StyledCarousel>
      <div className="carousel__track">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slides[index].id}
            className="carousel__slide"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <Link
              to={`/game/${slides[index].slug}`}
              draggable={false}
              onClick={(e) => { if (isDragging.current) e.preventDefault(); }}
            >
              <img
                src={smallImage(slides[index].background_image, 1280)}
                alt={slides[index].name}
                draggable={false}
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="carousel__title">{slides[index].name}</p>

      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </StyledCarousel>
  );
};

const StyledCarousel = styled.section`
  max-width: 120rem;
  margin: 3rem auto 0;
  position: relative;

  .carousel__track {
    width: 100%;
    height: 48rem;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    @media (max-width: 800px) {
      height: 40rem;
    }
    @media (max-width: 580px) {
      height: 30rem;
    }
    @media (max-width: 480px) {
      height: 25rem;
    }
  }

  .carousel__slide {
    position: absolute;
    inset: 0;
    user-select: none;

    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }

  .carousel__title {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    color: var(--color-white);
    font-size: 1.4rem;
    font-weight: 600;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
    pointer-events: none;
    max-width: 60%;
  }

  .dots {
    display: flex;
    gap: 0.7rem;
    position: absolute;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.25);
    padding: 0.5rem 0.9rem;
    border-radius: 1rem;
    backdrop-filter: blur(4px);
    z-index: 10;
  }

  .dot {
    width: 0.9rem;
    height: 0.9rem;
    border: 0.1rem solid var(--color-white);
    border-radius: 50%;
    background: transparent;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &.active {
      background-color: var(--color-white);
      transform: scale(1.2);
    }

    &:hover:not(.active) {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
`;

export default Carousel;
