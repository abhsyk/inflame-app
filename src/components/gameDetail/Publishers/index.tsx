import { FC } from 'react';
import { Publisher } from '../../../types';
import styled from 'styled-components';

type Props = { publishers: Publisher[] | undefined };

const Publishers: FC<Props> = ({ publishers }) => {
  return (
    <>
      {publishers?.length ? (
        <Container>
          {publishers?.map((p, i) => (
            <p key={p.id}>
              {p.name}
              {i !== publishers.length - 1 ? <span>/</span> : null}
            </p>
          ))}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0.1rem 1.8rem;
  margin: 0 1rem;
  background-color: #68fabd;
  transform: skewX(-45deg);

  p {
    font-size: 1.4rem;
    color: #222;
    transform: skewX(45deg);
    text-transform: uppercase;
    font-weight: 600;
  }

  span {
    font-size: 1.2rem;
    margin: 0 0.5rem;
  }
`;

export default Publishers;
