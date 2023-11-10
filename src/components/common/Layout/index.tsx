import { FC, PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';
import { Footer, Header } from '../../common';
import { ScrollTopButton } from '../../ui';
import { useLocation } from 'react-router-dom';
import useGamesContext from '../../../hooks/useGamesContext';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const { isUserInfoOpen, handleUserInfoOpen } = useGamesContext();

  useEffect(() => window.scroll(0, 0), [pathname]);

  return (
    <StyledLayout
      onClick={() => (isUserInfoOpen ? handleUserInfoOpen(false) : null)}
    >
      <Header />
      {children}
      <ScrollTopButton />
      <Footer />
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    200.44deg,
    rgba(31, 52, 240, 0.25) 13.57%,
    rgba(208, 13, 13, 0.22) 98.38%
  );
  background-color: rgba(0, 0, 0, 0.9);
`;

export default Layout;
