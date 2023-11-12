import { FC } from 'react';
import { TagButton } from '../..';
import { CategoryPath } from '../../../../types/Game';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  currentTaglinePath: CategoryPath;
  onTagChange: (categoryPathName: CategoryPath) => void;
};

const SwitchTaglineCategory: FC<Props> = ({
  currentTaglinePath,
  onTagChange,
}) => {
  return (
    <Container>
      <div className="games__tagline">
        <TagButton
          categoryPathName="popular-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={onTagChange}
        />
        <TagButton
          categoryPathName="new-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={onTagChange}
        />
        <TagButton
          categoryPathName="upcoming-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={onTagChange}
        />
      </div>
      <Link to={currentTaglinePath}>View more</Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 1.4rem;
    color: var(--color-white);
    text-decoration: underline;

    @media (max-width: 580px) {
      font-size: 1.2rem;
    }
  }

  .games__tagline {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;

    button {
      color: var(--color-white);
      font-weight: 600;
      text-transform: uppercase;
      background-color: transparent;
      padding: 0.6rem 2rem;
      border: 0.1rem solid var(--color-white);
      border-radius: 1rem;
      -webkit-border-radius: 1rem;
      -moz-border-radius: 1rem;
      -ms-border-radius: 1rem;
      -o-border-radius: 1rem;
      cursor: pointer;
      font-size: 1.4rem;

      &.active {
        background-color: var(--color-white);
        color: #222;
        border: none;
      }

      @media (max-width: 580px) {
        font-size: 1.2rem;
      }
    }
  }
`;

export default SwitchTaglineCategory;
