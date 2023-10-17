import { FC, PropsWithChildren } from 'react';
import { Footer, Header } from '../../common';
import styled from 'styled-components';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      {children}
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
