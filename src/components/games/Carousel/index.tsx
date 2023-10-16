import { FC } from 'react';

const Carousel: FC = () => {
  return (
    <section className="carousel">
      <div className="carousel__image__wrapper">
        <img src="src/assets/images/cyberpunk.jpg" alt="" />
      </div>
      <div className="circles">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </section>
  );
};

export default Carousel;
