import { FC, PropsWithChildren } from 'react';
import { Footer, Header } from '../../common';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
