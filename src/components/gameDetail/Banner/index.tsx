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
    <>
      {image ? (
        <Container>
          <img src={smallImage(image, 1280)} alt={name} />
          <img src={NotFoundImage} alt={name} className="not-found" />
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  max-height: 48rem;
  margin-top: 1rem;
  overflow: hidden;
  border: 0.1rem solid rgba(255, 255, 255, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Banner;
