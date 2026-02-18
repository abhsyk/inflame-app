import { FC, PropsWithChildren } from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink: FC<PropsWithChildren<LinkProps>> = ({ children, to }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li className={`navbar__item ${match ? 'active' : ''}`}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default CustomLink;
