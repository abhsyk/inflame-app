import { FC } from 'react';
import { Footer, Header } from '../../components/common';
import { GamesList } from '../../components/games';

const CategoriesPage: FC = () => {
  return (
    <>
      <Header />
      <section className="categories">
        <h1 className="categories__heading">Popular Games</h1>
        <GamesList />
        <div className="dots-container">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CategoriesPage;
