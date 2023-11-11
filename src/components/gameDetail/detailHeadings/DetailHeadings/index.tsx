import { FC } from 'react';
import styled from 'styled-components';
import type { Game } from '../../../../types';
import {
  Genres,
  Platforms,
  Publishers,
  RatingStars,
} from '../../detailHeadings';

type Props = { game: Game | undefined };

const DetailHeadings: FC<Props> = ({ game }) => {
  const dotDate = game?.released
    ? game?.released.replace(/-0|-/gi, '.')
    : game?.released;

  return (
    <Container>
      <div className="detail__info">
        <h1 className="detail__heading">{game?.name}</h1>
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

    &__heading {
      font-family: var(--font-secondary);
      font-size: 4rem;
      font-weight: 400;
    }

    &__second-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    &__third-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
