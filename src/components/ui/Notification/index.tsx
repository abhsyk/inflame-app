import { FC } from 'react';
import styled from 'styled-components';
import { BookmarkIcon } from '../../ui';

type Props = {
  hasNotification: boolean;
  addedGameName: string;
};

const Notification: FC<Props> = ({ hasNotification, addedGameName }) => {
  return (
    <Container className={hasNotification ? 'active' : ''}>
      <BookmarkIcon />
      <p>
        <strong>{addedGameName}</strong> has been added to your bookmarks!
      </p>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  background-color: yellow;
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
  left: 50%;
  border-radius: 3rem;
  transform: translateX(-50%);
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  bottom: -5rem;
  visibility: hidden;
  opacity: 0;
  z-index: 10;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  display: flex;
  align-items: center;

  &.active {
    bottom: 4rem;
    visibility: visible;
    opacity: 1;
  }

  p {
    margin-left: 0.5rem;
  }
`;

export default Notification;
