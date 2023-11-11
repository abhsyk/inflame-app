import { FC, useState } from 'react';
import type { Game } from '../../../../types';
import styled from 'styled-components';
import { Modal } from '../../screenshots';

type Props = { screenshots: Game['screenshots'] | undefined };

const Screenshots: FC<Props> = ({ screenshots }) => {
  const [currentIndex, setCurrrentIndex] = useState<number | null>(null);

  return (
    <>
      <Modal
        currentIndex={currentIndex}
        onCurIndexChange={setCurrrentIndex}
        screenshots={screenshots}
      />
      {screenshots?.length ? (
        <Container>
          {screenshots.map((s, i) => (
            <img key={s.id} src={s.image} onClick={() => setCurrrentIndex(i)} />
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
    border: 0.1rem solid transparent;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      border: 0.1rem solid rgba(255, 255, 255, 0.7);
      filter: grayscale(0);
    }
  }
`;

export default Screenshots;
