import { FC } from 'react';
import { InstagramIcon, TwitterIcon, YouTubeIcon } from '../../ui';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="copyright">
          Copyright © 2023
          <a href="https://github.com/abhsyk"> @abhsyk </a>. All rights reserved
        </p>
        <div className="social-media">
          <InstagramIcon />
          <TwitterIcon />
          <YouTubeIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
