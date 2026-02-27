import { FC, PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';
import { Footer, Header, Sidebar } from '../../common';
import { ScrollTopButton } from '../../ui';
import { useLocation } from 'react-router-dom';
import useGamesContext from '../../../hooks/useGamesContext';
import { FloatingBackground } from '../../../styles/GlobalStyles';

const SIDEBAR_EXCLUDED_PATHS = ['/login', '/signup', '/user'];

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();
  const { isUserInfoOpen, handleUserInfoOpen } = useGamesContext();

  useEffect(() => window.scroll(0, 0), [pathname]);

  const showSidebar = !SIDEBAR_EXCLUDED_PATHS.includes(pathname) && !pathname.startsWith('/game/');

  return (
    <StyledLayout
      onClick={() => (isUserInfoOpen ? handleUserInfoOpen(false) : null)}
    >
      <Header />
      <BodyRow>
        {showSidebar && <Sidebar />}
        <MainContent>{children}</MainContent>
      </BodyRow>
      <ScrollTopButton />
      <Footer />
      <FloatingBackground />
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  width: 100%;
  overflow-x: clip;
  background: linear-gradient(
    200.44deg,
    rgba(31, 52, 240, 0.25) 13.57%,
    rgba(208, 13, 13, 0.22) 98.38%
  );
  background-color: rgba(0, 0, 0, 0.9);
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const BodyRow = styled.div`
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
`;

const MainContent = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

export default Layout;
