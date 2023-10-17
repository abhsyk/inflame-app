import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Game } from '../../../types';

type Props = { games: Game[] };

const Carousel: FC<Props> = ({ games }) => {
  const bgImages = games?.map((game) => game.background_image);
  const [index, setIndex] = useState<number>(0);
  const ref = useRef<NodeJS.Timeout>();

  const startSlideShow = useCallback(() => {
    ref.current = setInterval(() => {
      setIndex((prev) => (prev < bgImages.slice(0, 4).length ? prev + 1 : 0));
    }, 6000);
  }, [bgImages]);

  useEffect(() => {
    startSlideShow();
    return () => ref.current && clearInterval(ref.current);
  }, [startSlideShow]);

  return (
    <StyledCarousel variants={carouselAnim} initial="hidden" animate="show">
      <div className="carousel__image__wrapper">
        <AnimatePresence>
          <motion.img
            key={bgImages[index]}
            src={bgImages[index]}
            alt=""
            variants={imgAnim}
            initial="hidden"
            animate="show"
            exit="exit"
          />
        </AnimatePresence>
      </div>

      <div className="circles">
        {Array.from({ length: bgImages.slice(0, 5).length }, (_, i) => (
          <div
            key={i}
            className={`circle ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </StyledCarousel>
  );
};

const StyledCarousel = styled(motion.section)`
  max-width: 120rem;
  margin: 3rem auto 0;
  position: relative;

  .carousel__image__wrapper {
    width: 100%;
    height: 48rem;
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    -ms-border-radius: 1rem;
    -o-border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  }

  .carousel__image__wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .circles {
    display: flex;
    gap: 0.7rem;
    position: absolute;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    cursor: pointer;
  }

  .circle {
    content: '';
    width: 0.9rem;
    height: 0.9rem;
    border: 0.1rem solid var(--color-white);
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .circle.active {
    background-color: var(--color-white);
  }
`;

const carouselAnim = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const imgAnim = {
  hidden: { opacity: 0, x: 1200 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, x: -1200, transition: { duration: 0.6 } },
};

export default Carousel;
