import { FC, PropsWithChildren } from 'react';
import { CustomLink } from '../../common';
import styled from 'styled-components';

const PageNav: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Navbar className="navbar">
      <div className="navbar__list">
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/popular-games">Popular</CustomLink>
        <CustomLink to="/new-games">New</CustomLink>
        <CustomLink to="/upcoming-games">Upcoming</CustomLink>
      </div>
      {children}
    </Navbar>
  );
};

const Navbar = styled.nav`
  background-color: #101010;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  position: relative;

  .navbar__list {
    max-width: 120rem;
    margin: 0 auto;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    text-transform: uppercase;
    font-weight: 400;
  }

  a {
    /* height: 6rem; */
    display: flex;
    align-items: center;
  }

  .navbar__item {
    color: var(--color-white);
    padding: 2rem 2.5rem;
    position: relative;
  }

  .navbar__item::after {
    content: '';
    width: 100%;
    margin: 0 auto;
    height: 0.3rem;
    background-color: var(--color-primary);
    position: absolute;
    left: 0;
    bottom: 0;
    transform: scaleX(0);
    transition: transform 0.3s cubic-bezier(1, 0, 0, 1);
  }

  .navbar__item.active {
    color: var(--color-primary);
    font-weight: 600;
    position: relative;
  }

  .navbar__item.active::after {
    content: '';
    width: 100%;
    height: 0.3rem;
    background-color: var(--color-primary);
    position: absolute;
    left: 0;
    bottom: 0;
    transform: scaleX(1);
  }

  .navbar__item:hover::after {
    transform: scaleX(1);
  }
`;

export default PageNav;
