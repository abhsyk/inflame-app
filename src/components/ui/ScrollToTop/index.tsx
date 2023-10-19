import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { ArrowUpIcon } from '../../ui';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = useCallback((): void => {
    if (window.scrollY > 800) setIsVisible(true);
    else setIsVisible(false);
  }, []);

  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <StyledButton
          onClick={scrollToTop}
          variants={variants}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <ArrowUpIcon />
        </StyledButton>
      ) : null}
    </AnimatePresence>
  );
};

const StyledButton = styled(motion.div)`
  display: grid;
  place-items: center;
  position: fixed;
  bottom: 7rem;
  right: 7rem;
  font-size: 5.5rem;
  color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const variants = {
  hidden: { y: '.5rem', opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default ScrollToTop;
