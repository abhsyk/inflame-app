import { FC } from 'react';
import { Game } from '../../../../types';
import styled from 'styled-components';

type Props = { platforms: Game['platforms'] | undefined };

const Platforms: FC<Props> = ({ platforms }) => {
  return (
    <>
      {platforms ? (
        <Container>
          {platforms
            .slice()
            .sort((a, b) => (a.platform.name > b.platform.name ? 1 : -1))
            .map((p) => (
              <p key={p.platform.id}>{p.platform.name}</p>
            ))}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-self: end;
  gap: 0.5rem;

  p {
    font-size: 1.2rem;
    color: #222;
    padding: 0.2rem 1.2rem;
    background-color: var(--color-white);
    border-radius: 1rem;
  }
`;

export default Platforms;
