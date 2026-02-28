import { FC } from "react";
import styled from "styled-components";

const Footer: FC = () => {
  return (
    <Container>
      <div className="footer__content">
        <p className="copyright">
          © 2026{" "}
          <a href="https://github.com/abhsyk" target="_blank" rel="noreferrer">
            abhsyk
          </a>{" "}
          | Game data provided by{" "}
          <a href="https://rawg.io" target="_blank" rel="noreferrer">
            RAWG
          </a>
        </p>
      </div>
    </Container>
  );
};

const Container = styled.footer`
  background-color: #101010;

  .footer__content {
    width: calc(100% - 5rem);
    // max-width: 120rem;
    height: 6rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

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
