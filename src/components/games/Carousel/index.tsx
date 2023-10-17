import { motion } from 'framer-motion';
import { FC } from 'react';
import styled from 'styled-components';

const Carousel: FC = () => {
  return (
    <StyledCarousel variants={carouselAnim} initial="hidden" animate="show">
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
  }

  .circle {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    border: 0.1rem solid var(--color-white);
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .circle:nth-child(1) {
    background-color: var(--color-white);
  }
`;

const carouselAnim = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default Carousel;
