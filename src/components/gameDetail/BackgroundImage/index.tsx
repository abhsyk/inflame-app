import { FC } from 'react';
import { Game } from '../../../types';

type Props = { image: Game['background_image'] | undefined };

const BackgroundImage: FC<Props> = ({ image }) => {
  return (
    <>
      {image ? (
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: -10,
            filter: 'blur(5px)',
            opacity: '0.2',
          }}
        />
      ) : null}
    </>
  );
};

export default BackgroundImage;
