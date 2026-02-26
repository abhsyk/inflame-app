import { FC } from 'react';
import styled from 'styled-components';
import { smallImage } from '../../../utils/smallImage';
import type { Game } from '../../../types';
import NotFoundImage from '../../../assets/images/not-found.jpg';

type Props = {
  image: Game['background_image'] | undefined;
  name: Game['name'] | undefined;
};

const Banner: FC<Props> = ({ image, name }) => {
  return (
    <Container>
      {image ? (
        <img src={smallImage(image, 1280)} alt={name} />
      ) : (
        <img src={NotFoundImage} alt={name} className="not-found" />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  overflow: hidden;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.5);
  aspect-ratio: 16 / 9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

    &.not-found {
     // margin-top: -20%;
    }
  }
`;

export default Banner;
