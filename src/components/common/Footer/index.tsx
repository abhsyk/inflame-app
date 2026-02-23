import { FC } from "react";
import { InstagramIcon, TwitterIcon, YouTubeIcon } from "../../ui";
import styled from "styled-components";

const Footer: FC = () => {
  return (
    <Container>
      <div className="footer__content">
        <div className="social-media">
          <InstagramIcon />
          <TwitterIcon />
          <YouTubeIcon />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.footer`
  background-color: #101010;

  .footer__content {
    max-width: 120rem;
    height: 6rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1200px) {
      margin: 0 2rem;
    }

    @media (max-width: 800px) {
      height: 12rem;
      flex-direction: column-reverse;
      justify-content: center;
    }
  }

  .copyright {
    font-size: 1.4rem;
    color: #eee;

    a {
      color: var(--color-primary);
    }

    @media (max-width: 800px) {
      font-size: 1.2rem;
    }
  }

  .social-media {
    display: flex;
    gap: 2rem;
    margin: 1rem 0;

    svg {
      font-size: 4rem;
      color: #666;
      padding: 0.5rem;
      cursor: pointer;
    }
  }
`;

export default Footer;
