import { motion } from 'framer-motion';
import { FC, useCallback, MouseEvent } from 'react';
import styled from 'styled-components';
import useGamesContext from '../../../hooks/useGamesContext';
import { Game } from '../../../types';
import { CheckIcon, PlusIcon } from '../icons';

type Props = { game: Game; isDetail?: boolean };

const BookmarkBtn: FC<Props> = ({ game, isDetail = false }) => {
  const { handleAddBookmark, handleRemoveBookmark, bookmarks, user } =
    useGamesContext();
  const isBookmarked: boolean = !!bookmarks.find((b) => b.id === game?.id);

  const handleBookmark = useCallback(
    async (e: MouseEvent): Promise<void> => {
      e.preventDefault();
      if (!user) return;
      await handleAddBookmark(game);
    },
    [game, handleAddBookmark, user]
  );

  const handleRemove = useCallback(
    async (e: MouseEvent): Promise<void> => {
      e.preventDefault();
      if (!user) return;
      await handleRemoveBookmark(game.id);
    },
    [game.id, handleRemoveBookmark, user]
  );

  return (
    <Container
      className={`bookmark-btn ${isBookmarked ? 'added' : ''} ${
        isDetail ? 'detail-page' : ''
      }`}
      onClick={isBookmarked ? handleRemove : handleBookmark}
      whileHover={{ scale: 1.1 }}
    >
      {isBookmarked ? <CheckIcon /> : <PlusIcon />}
    </Container>
  );
};

const Container = styled(motion.button)`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: var(--color-white);
  font-size: 2.5rem;
  background-color: var(--color-body);
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #444;
  }

  &.added {
    color: var(--color-body);
    background-color: var(--color-white);
    transition: background-color 0.2s;

    &:hover {
      background-color: #fff;
    }
  }

  @media (max-width: 800px) {
    padding: 0.8rem;
    bottom: 0;
  }

  &.detail-page {
    position: static;
    flex-shrink: 0;
    font-size: 2rem;
    padding: 0.8rem 1.2rem;
    border-radius: 0.5rem;
    border: 0.1rem solid rgba(255, 255, 255, 0.3);
  }
`;

export default BookmarkBtn;
