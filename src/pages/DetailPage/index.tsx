import { FC } from 'react';
import { Footer, Header } from '../../components/common';
import { LinkIcon, StarFullIcon, StarHalfIcon } from '../../components/ui';

const DetailPage: FC = () => {
  return (
    <>
      <Header />
      <div className="details">
        <div className="details__top">
          <div className="details__info">
            <h1 className="details__heading">Resident Evil 4</h1>
            <p className="details__release">
              Release date:
              <span>2023.3.24</span>
            </p>
          </div>
          <div className="details__icons">
            <div className="stars">
              <StarFullIcon />
              <StarFullIcon />
              <StarFullIcon />
              <StarFullIcon />
              <StarHalfIcon />
            </div>
            <div className="console">
              <img
                src="src/assets/images/game-console-icon.svg"
                alt="Game console"
              />
              <img
                src="src/assets/images/game-console-icon.svg"
                alt="Game console"
              />
            </div>
          </div>
        </div>

        <div className="banner">
          <img
            src="src/assets/images/resident-evil-4.jpg"
            alt="Resident Evil 4"
          />
        </div>

        <p className="description">
          "Resident Evil 4" is a highly acclaimed and influential survival
          horror video game developed and published by Capcom. Originally
          released in 2005 for the Nintendo GameCube, it has since been ported
          to various platforms, including PlayStation 2, PlayStation 3, Xbox
          360, PC, and more. Set in a rural European village, the game follows
          the protagonist, Leon S. Kennedy, a government agent, as he embarks on
          a mission to rescue the President's daughter, Ashley Graham, who has
          been kidnapped by a mysterious cult known as Los Illuminados. The
          story takes place in a third-person perspective and is a departure
          from the franchise's earlier fixed-camera angles and slower gameplay.
        </p>

        <div className="screenshot__wrapper">
          <img src="src/assets/images/screenshot-1.jpg" alt="Screenshot 1" />
          <img src="src/assets/images/screenshot-2.jpg" alt="Screenshot 2" />
          <img src="src/assets/images/screenshot-3.jpg" alt="Screenshot 3" />
          <img src="src/assets/images/screenshot-4.jpg" alt="Screenshot 4" />
          <img src="src/assets/images/screenshot-5.jpg" alt="Screenshot 5" />
          <img src="src/assets/images/screenshot-6.jpg" alt="Screenshot 6" />
        </div>

        <div className="link">
          <LinkIcon />
          {/* <img src="src/assets/images/link-icon.svg" alt="Link icon" /> */}
          <a href="#"> https://www.residentevil.com/re4/en-asia/ </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;
