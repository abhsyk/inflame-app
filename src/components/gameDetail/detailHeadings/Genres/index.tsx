import { FC } from 'react';
import styled from 'styled-components';
import type { Game } from '../../../../types';

type Props = { genres: Game['genres'] | undefined };

const Genres: FC<Props> = ({ genres }) => {
  return (
    <>
      {genres ? (
        <Container>
          {genres
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((g) => (
              <p key={g.id}>{g.name}</p>
            ))}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  gap: 0.5rem;

  p {
    border: 0.1rem solid #efefef;
    padding: 0.2rem 1rem;
    font-size: 1.2rem;
    border-radius: 1rem;
  }
`;

export default Genres;
