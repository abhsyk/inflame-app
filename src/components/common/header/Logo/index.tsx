import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogoIcon } from '../../../ui';

const Logo: FC = () => {
  return (
    <Container>
      <Link to="/">
        <LogoIcon />
        <span>Inflame</span>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  a {
    font-family: 'Rubik', sans-serif;
    color: var(--color-white);
    font-size: 3rem;
    display: flex;
    cursor: pointer;
  }

  svg {
    font-size: 4.5rem;
  }

  span {
    margin-top: 1rem;
    align-self: center;
  }
`;

export default Logo;
