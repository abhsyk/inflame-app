import { FC } from 'react';
import styled from 'styled-components';
import { LinkIcon } from '../../ui';
import type { Game } from '../../../types';

type Props = {
  game: Game | undefined;
};

const STORE_NAMES: Record<number, string> = {
  1: 'Steam',
  2: 'Microsoft Store',
  3: 'PlayStation Store',
  4: 'App Store',
  5: 'GOG',
  6: 'Nintendo Store',
  7: 'Xbox 360 Store',
  8: 'Google Play',
  9: 'itch.io',
  11: 'Epic Games Store',
};

const StoreLinks: FC<Props> = ({ game }) => {
  const stores = game?.stores;

  if (!stores || stores.length === 0) {
    return null;
  }

  return (
    <Container>
      <h3>Buy From</h3>
      <StoreList>
        {stores.map((store) => {
          const storeName = STORE_NAMES[store.store_id];
          if (!storeName) return null;

          return (
            <StoreItem key={store.id} href={store.url} target="_blank" rel="noopener noreferrer">
              <StoreName>{storeName}</StoreName>
              <ExternalIcon />
            </StoreItem>
          );
        })}
      </StoreList>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 4rem;

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--color-white);
    margin-bottom: 2rem;
  }
`;

const StoreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

const StoreItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.6rem;
  background-color: rgba(35, 35, 35, 0.8);
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-0.2rem);
  }
`;

const StoreName = styled.span`
  font-size: 1.4rem;
  color: #efefef;
`;

const ExternalIcon = styled(LinkIcon)`
  width: 1.4rem;
  height: 1.4rem;
  color: var(--color-white);
  opacity: 0.7;
`;

export default StoreLinks;
