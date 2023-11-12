import { FC, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, CrossIcon } from '../../../ui';
import { Game } from '../../../../types';
import styled from 'styled-components';

type Props = {
  currentIndex: number | null;
  onCurIndexChange: (index: number | null) => void;
  screenshots: Game['screenshots'] | undefined;
};

const Modal: FC<Props> = ({ currentIndex, onCurIndexChange, screenshots }) => {
  useEffect(() => {
    if (currentIndex !== null) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'unset';
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    onCurIndexChange(null);
  }, [onCurIndexChange]);

  const content = () => {
    return (
      <AnimatePresence>
        {currentIndex !== null ? (
          <Container
            onClick={handleClose}
            variants={modalAnim}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="close-btn" onClick={handleClose}>
              <CrossIcon />
            </div>
            <ImageWrapper onClick={(e) => e.stopPropagation()}>
              <motion.img
                src={screenshots![currentIndex].image}
                variants={variants}
                initial="hidden"
                animate="show"
                exit="exit"
              />

              <p className="index">
                {currentIndex + 1}/{screenshots?.length}
              </p>

              <button
                className="left-arr"
                onClick={() =>
                  onCurIndexChange(
                    currentIndex > 0
                      ? currentIndex - 1
                      : screenshots!.length - 1
                  )
                }
              >
                <ChevronLeftIcon />
              </button>
              <button
                className="right-arr"
                onClick={() =>
                  onCurIndexChange(
                    currentIndex < screenshots!.length - 1
                      ? currentIndex + 1
                      : 0
                  )
                }
              >
                <ChevronRightIcon />
              </button>
            </ImageWrapper>
          </Container>
        ) : null}
      </AnimatePresence>
    );
  };

  return <>{createPortal(content(), document.getElementById('modal')!)}</>;
};

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  -moz-backdrop-filter: blur(4px);
  -ms-backdrop-filter: blur(4px);
  -o-backdrop-filter: blur(4px);
  z-index: 100;

  .close-btn {
    position: absolute;
    top: 6rem;
    right: 6rem;
    cursor: pointer;
    z-index: 100;

    svg {
      border-radius: 50%;
      color: var(--color-white);
      background-color: transparent;
      font-size: 5rem;
      padding: 1rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: #444;
      }
    }
  }
`;

const ImageWrapper = styled.div`
  width: 120rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1200px) {
    width: calc(100% - 4rem);
  }

  img {
    width: 100%;
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  }

  .index {
    position: absolute;
    font-size: 1.4rem;
    color: var(--color-white);
    font-family: var(--font-secondary);
    letter-spacing: 0.5rem;
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    display: grid;
    place-items: center;
    width: 2rem;
    /* height: 4rem; */
    font-size: 2rem;
    /* border-radius: 50%; */
    background-color: transparent;
    color: var(--color-white);
    /* border: 0.1rem solid rgba(255, 255, 255, 0.5); */
    border: none;
    outline: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &.left-arr {
      left: 0;
      svg {
        margin-left: -0.2rem;
      }
    }

    &.right-arr {
      right: 0;
      svg {
        margin-right: -0.2rem;
      }
    }
  }
`;

const modalAnim = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.5 } },
};

export default Modal;
