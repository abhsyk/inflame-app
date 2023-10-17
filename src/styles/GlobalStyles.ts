import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-body: #222;
    --color-white: #efefef;
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
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    font-family: inherit;
  }

  /* Games */
  .games,
  .categories {
    max-width: 120rem;
    padding: 3rem 2rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    -ms-border-radius: 1rem;
    -o-border-radius: 1rem;
    margin: 3rem auto 5rem;
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  }

  .games__text {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .games__tagline {
    display: flex;
    gap: 1rem;
  }

  .games__text a {
    font-size: 1.4rem;
    color: var(--color-white);
    text-decoration: underline;
  }

  .games__tagline button {
    color: var(--color-white);
    font-weight: 600;
    text-transform: uppercase;
    background-color: transparent;
    padding: 0.6rem 2rem;
    border: 0.1rem solid var(--color-white);
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    -ms-border-radius: 1rem;
    -o-border-radius: 1rem;
    cursor: pointer;
    font-size: 1.4rem;
  }

  .games__tagline button.active {
    background-color: var(--color-white);
    color: #222;
    border: none;
  }



  /* Games ends */

  /* Footer */
  .footer {
    background-color: #101010;
  }

  .footer__content {
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .copyright {
    font-size: 1.4rem;
    color: #eee;
  }

  .copyright a {
    color: #d71bae;
  }

  .social-media {
    display: flex;
    gap: 2rem;
    margin: 1rem 0;
  }

  .social-media svg {
    font-size: 4rem;
    color: #222;
    background-color: #bbb;
    padding: 0.5rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }

  .social-media img {
    width: 4rem;
    height: 4rem;
  }
  /* Footer ends */

  /* Details */
  .details {
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .details__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
  }

  .details__info {
    color: #efefef;
  }

  .details__heading {
    font-size: 6.4rem;
    font-weight: 400;
  }

  .details__release {
    font-size: 1.4rem;
  }

  .details__release span {
    font-weight: 600;
  }

  .details__icons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .stars svg {
    font-size: 3.5rem;
    color: #d71bae;
  }

  .console {
    align-self: flex-end;
    display: flex;
    gap: 1.5rem;
  }

  .banner {
    width: 100%;
    height: 48rem;
    margin-top: 1rem;
    overflow: hidden;
  }

  .banner img {
    width: 100%;
    object-fit: cover;
  }

  .description {
    font-family: var(--font-secondary);
    column-count: 2;
    column-gap: 3rem;
    background-color: #222;
    font-size: 1.4rem;
    line-height: 1.7;
    color: #efefef;
    padding: 3rem;
  }

  .screenshot__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  }

  .screenshot__wrapper img {
    width: 100%;
    height: 28.5rem;
    object-fit: cover;
  }

  .link {
    display: flex;
    gap: 0.5rem;
    justify-content: end;
    margin: 3rem 0;
  }

  .link svg {
    font-size: 2rem;
    color: var(--color-white);
  }

  .link a {
    color: #efefef;
    font-size: 1.4rem;
  }
  /* Details ends */

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
      font-size: 3.6rem;
      color: #777;
    }

    .header__content .search-icon {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      font-size: 5rem;
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
      top: 0;
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
    }

    .search-box.active {
      visibility: visible;
      opacity: 1;
    }

    .search-box .search__input,
    .search-box .cross-icon {
      display: block;
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
