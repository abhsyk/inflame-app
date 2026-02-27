import { FC } from 'react';
import styled from 'styled-components';
import type { Game } from '../../../../types';
import {
  Genres,
  Platforms,
  Publishers,
  RatingStars,
} from '../../detailHeadings';
import { BookmarkBtn } from '../../../ui';
import useGamesContext from '../../../../hooks/useGamesContext';

type Props = { game: Game | undefined };

const DetailHeadings: FC<Props> = ({ game }) => {
  const { user } = useGamesContext();
  const dotDate = game?.released
    ? game?.released.replace(/-0|-/gi, '.')
    : game?.released;

  return (
    <Container>
      <div className="detail__info">
        <div className="detail__heading-row">
          <h1 className="detail__heading">{game?.name}</h1>
          {user && game ? <BookmarkBtn game={game} isDetail /> : null}
        </div>
        <div className="detail__second-row">
          <Publishers publishers={game?.publishers} />
          <Genres genres={game?.genres} />
          <RatingStars
            rating={game?.rating}
            ratingsCount={game?.ratings_count}
          />
        </div>
        <div className="detail__third-row">
          <p className="detail__release">
            Release date:
            <span> {game?.tba ? 'To be announced' : dotDate}</span>
          </p>
          <Platforms platforms={game?.platforms} />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .detail {
    &__info {
      color: #efefef;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__heading-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.6rem;
    }

    &__heading {
      font-family: var(--font-secondary);
      font-size: 4rem;
      font-weight: 400;

      @media (max-width: 800px) {
        font-size: 3rem;
      }

      @media (max-width: 600px) {
        font-size: 2.4rem;
      }
    }

    &__second-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;

      @media (max-width: 600px) {
        justify-content: flex-start;
      }
    }

    &__third-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;

      @media (max-width: 600px) {
        justify-content: flex-start;
      }
    }

    &__release {
      font-size: 1.4rem;

      span {
        font-weight: 600;
      }
    }
  }
`;

export default DetailHeadings;
