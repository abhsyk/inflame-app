import { FC, PropsWithChildren } from 'react';
import { CustomLink } from '../../common';

const PageNav: FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/popular-games">Popular</CustomLink>
        <CustomLink to="/new-games">New</CustomLink>
        <CustomLink to="/upcoming-games">Upcoming</CustomLink>
      </ul>
      {children}
    </nav>
  );
};

export default PageNav;
