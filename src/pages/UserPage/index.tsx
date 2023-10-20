import { FC, useEffect } from 'react';
import { Layout } from '../../components/common';
import { useGameProvider } from '../../context';
import { GamesList } from '../../components/games';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserPage: FC = () => {
  const { bookmarks } = useGameProvider();
  const navigate = useNavigate();
  const { isLoggedIn } = useGameProvider();

  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  return (
    <Layout>
      <div className="games">
        {!!bookmarks && bookmarks.length > 0 ? (
          <GamesList games={bookmarks} />
        ) : (
          <Message>There are no bookmarks.😢</Message>
        )}
      </div>
    </Layout>
  );
};

const Message = styled.p`
  font-size: 1.8rem;
  color: var(--color-white);
`;

export default UserPage;
