import { FC } from 'react';
import { Layout } from '../../components/common';
import { GamesList } from '../../components/games';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Categories } from '../../styles/GlobalStyles';
import { LoadingDots } from '../../components/ui';
import useGamesContext from '../../hooks/useGamesContext';

const UserPage: FC = () => {
  const { bookmarks, user, isAuthLoading } = useGamesContext();

  if (isAuthLoading) return <LoadingDots center size={8} />;
  if (!user) return <Navigate to="/" replace />;

  return (
    <Layout>
      <Categories>
        {!!bookmarks && bookmarks.length ? (
          <GamesList games={bookmarks} />
        ) : (
          <Message>No bookmarks yet.</Message>
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
