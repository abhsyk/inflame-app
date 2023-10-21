import { FC, PropsWithChildren } from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink: FC<PropsWithChildren<LinkProps>> = ({ children, to }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to}>
      <li className={`navbar__item ${match ? 'active' : ''}`}>{children}</li>
    </Link>
  );
};

export default CustomLink;
