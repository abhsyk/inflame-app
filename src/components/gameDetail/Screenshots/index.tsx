import { FC } from 'react';
import type { Game } from '../../../types';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type Props = { screenshots: Game['screenshots'] | undefined };

const Screenshots: FC<Props> = ({ screenshots }) => {
  return (
    <>
      {screenshots?.length ? (
        <Container>
          {screenshots.map((s) => (
            <motion.img
              key={s.id}
              src={s.image}
              variants={variants}
              initial="hidden"
              animate="show"
            />
          ))}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));

  img {
    width: 100%;
    height: 28.5rem;
    object-fit: cover;
    filter: grayscale(0.7);
    border: 0.1rem solid rgba(255, 255, 255, 0.3);
    transition: all 0.2s;

    &:hover {
      transform: scale(1.1);
      border: 0.1rem solid rgba(255, 255, 255, 0.7);
      filter: grayscale(0);
    }
  }
`;

const variants = {
  hidden: { scale: 0.9 },
  show: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};

export default Screenshots;
