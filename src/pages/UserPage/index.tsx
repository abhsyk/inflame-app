import { FC } from 'react';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Categories } from '../../styles/GlobalStyles';
import useGamesContext from '../../hooks/useGamesContext';

const UserPage: FC = () => {
  const { bookmarks, isLoggedIn } = useGamesContext();

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <Layout>
      <Categories>
        {!!bookmarks && bookmarks.length ? (
          <GamesList games={bookmarks} />
        ) : (
          <Message>There are no bookmarks😢</Message>
        )}
      </Categories>
    </Layout>
  );
};

const Message = styled.p`
  font-size: 1.8rem;
  color: var(--color-white);
  text-align: center;
`;

export default UserPage;
