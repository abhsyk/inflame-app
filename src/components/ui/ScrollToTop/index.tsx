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
          initial="initial"
          animate="animate"
          exit="initial"
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
  bottom: 5rem;
  right: 5rem;
  font-size: 5.5rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`;

const variants = {
  initial: { y: '.5rem', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default ScrollToTop;
