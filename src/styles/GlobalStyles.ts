import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-body: #222;
    --color-white: #efefef;
    --color-primary: #D345AE;
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: var(--font-primary);
    color: var(--color-body);
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    font-family: inherit;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    border-radius: 2rem;
    border: transparent;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Responsive */
  @media (max-width: 1400px) {
    html {
      font-size: 55%;
    }
  }

  @media (max-width: 1200px) {
    .header,
    .footer {
      padding: 0 4rem;
    }
  }

  @media (max-width: 1000px) {
    html {
      font-size: 50%;
    }

    .header,
    .footer {
      padding: 0 2rem;
    }

    .search__input {
      max-width: 40rem;
    }

    .username,
    .chevron-icon {
      display: none;
    }
  }

  @media (max-width: 800px) {
    .games__tagline button {
      font-weight: 400;
    }

    .details__heading {
      font-size: 3.6rem;
    }

    .details__release {
      font-size: 1.4rem;
    }

    .stars img {
      width: 2rem;
    }

    .console img {
      width: 5rem;
    }

    .details__top {
      margin: 2rem 1rem 1rem;
    }

    .banner {
      height: auto;
    }

    .description {
      column-count: unset;
    }

    .screenshot__wrapper {
      gap: 1rem;
      margin: 1rem;
    }

    .link {
      justify-content: center;
    }
  }

  @media (max-width: 580px) {
    .header,
    .footer {
      padding: 0 1rem;
    }

    .navbar__item:nth-child(1),
    .header__content .search__input,
    .header__content .cross-icon {
      display: none;
    }

    .header__content {
      justify-content: start;
      gap: 1rem;
    }

    .logo {
      flex: 1;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      font-size: 3rem;
      color: #777;
    }

    .header__content .search-icon {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      font-size: 4rem;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      -o-border-radius: 50%;
      position: initial;
      flex: 1;
    }

    .search-box {
      display: block;
      position: absolute;
      width: 100%;
      background-color: #efefef;
      /* top: -20rem; */
      left: 0;
      color: #222;
      padding: 2rem 4rem;
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      z-index: 50;
    }

    .search-box.active {
      visibility: visible;
      opacity: 1;
      /* top: 0; */
    }

    .search-box .search__input,
    .search-box .cross-icon {
      /* display: block; */
    }

    .search-box img {
      filter: invert(100%);
      -webkit-filter: invert(100%);
    }

    .games__item {
      min-width: 100%;
      height: auto;
    }

    .games__link {
      display: none;
    }

    .games__info {
      width: 100%;
      flex: 1;
    }

    .games__info__bottom {
      justify-content: end;
      padding-bottom: 1rem;
    }

    .games__image__wrapper img {
      width: 100%;
    }

    .footer {
      padding: 1rem 0 2rem;
    }

    .footer__content {
      flex-direction: column-reverse;
      position: relative;
      gap: 2rem;
    }

    .footer__content::after {
      content: '';
      width: 100%;
      height: 0.1rem;
      background-color: var(--color-body);
      position: absolute;
      left: 0;
      top: 65%;
    }
  }
`;

export const Categories = styled(motion.section)`
  max-width: 120rem;
  min-height: calc(100vh - 26rem);
  padding: 3rem 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
  -moz-border-radius: 1rem;
  -ms-border-radius: 1rem;
  -o-border-radius: 1rem;
  margin: 3rem auto 4rem;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
`;

export const FloatingBackground = styled.div`
  width: 160vw;
  height: 160vw;
  background-color: rgba(0, 0, 0, 0.15);
  border: 2rem double rgba(255, 255, 255, 0.9);
  position: fixed;
  top: -123vw;
  left: calc(50% - 75vw);
  border-radius: 38.976%;
  animation: rotate 50s infinite;
  z-index: -1;
  filter: blur(4px);

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
