import { FC } from 'react';
import { Footer, Header } from '../../components/common';
import { Carousel, GamesList } from '../../components/games';

const HomePage: FC = () => {
  return (
    <>
      <Header />
      <Carousel />
      <section className="games">
        <div className="games__text">
          <div className="games__tagline">
            <button className="active">Popular</button>
            <button>New</button>
            <button>Upcoming</button>
          </div>
          <a href="#">View more</a>
        </div>
        <GamesList />
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
