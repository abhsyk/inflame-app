import { motion } from 'framer-motion';
import { FC, useCallback, MouseEvent } from 'react';
import styled from 'styled-components';
import useGamesContext from '../../../hooks/useGamesContext';
import { Game } from '../../../types';
import { CheckIcon, PlusIcon } from '../icons';

type Props = { game: Game; isDetail?: boolean };

const BookmarkBtn: FC<Props> = ({ game, isDetail = false }) => {
  const { handleAddBookmark, handleRemoveBookmark, bookmarks } =
    useGamesContext();
  const isBookmarked: boolean = !!bookmarks.find((b) => b.id === game?.id);

  const handleBookmark = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault();
      handleAddBookmark(game);
    },
    [game, handleAddBookmark]
  );

  const handleRemove = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault();
      handleRemoveBookmark(game.id);
    },
    [game.id, handleRemoveBookmark]
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
    bottom: 2rem;
  }

  &.detail-page {
    position: fixed;
    top: 22%;
    bottom: unset;
    right: -0.2rem;
    z-index: 100;
    background-color: var(--color-white);
    color: var(--color-body);
    padding: 1rem 2.5rem 1rem 1.5rem;
    border-top-left-radius: 5rem;
    border-bottom-left-radius: 5rem;
  }
`;

export default BookmarkBtn;
