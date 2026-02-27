import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { Game } from '../../types';
import useGames from '../../hooks/useGames';
import { Layout } from '../../components/common';
import { Carousel, GamesList, GamesSkeletonList } from '../../components/games';
import { LoadingDots } from '../../components/ui';

const HomePage: FC = () => {
  const { games: trendingGames, isLoading: isTrendingLoading } = useGames('trending-games');
  const { games: newGames, isLoading: isNewLoading } = useGames('new-releases');
  const { games: upcomingGames, isLoading: isUpcomingLoading } = useGames('coming-soon');
  const { games: popularGames, isLoading: isPopularLoading } = useGames('top-rated');
  const [carouselGames, setCarouselGames] = useState<Game[]>([]);

  useEffect(() => {
    if (trendingGames.length > 0) {
      setCarouselGames(trendingGames);
    }
  }, [trendingGames]);

  if (carouselGames.length === 0 && isTrendingLoading) {
    return (
      <Layout>
        <LoadingDots />
      </Layout>
    );
  }

  return (
    <Layout>
      <Carousel games={carouselGames} />
      <Sections variants={containerVariants} initial="hidden" animate="show">
        <Section variants={itemVariants}>
          <SectionHeader>
            <h2>New Releases</h2>
            <Link to="/new-releases">View more</Link>
          </SectionHeader>
          {isNewLoading ? <GamesSkeletonList count={4} /> : <GamesList games={newGames.slice(0, 4)} />}
        </Section>

        <Section variants={itemVariants}>
          <SectionHeader>
            <h2>Coming Soon</h2>
            <Link to="/coming-soon">View more</Link>
          </SectionHeader>
          {isUpcomingLoading ? <GamesSkeletonList count={4} /> : <GamesList games={upcomingGames.slice(0, 4)} />}
        </Section>

        <Section variants={itemVariants}>
          <SectionHeader>
            <h2>Top Rated</h2>
            <Link to="/top-rated">View more</Link>
          </SectionHeader>
          {isPopularLoading ? <GamesSkeletonList count={4} /> : <GamesList games={popularGames.slice(0, 4)} />}
        </Section>
      </Sections>
    </Layout>
  );
};

const containerVariants = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Sections = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem;

  @media (max-width: 1250px) {
    padding: 3rem 0;
  }

  @media (max-width: 580px) {
    padding: 1.5rem 0;
    gap: 2rem;
  }
`;

const Section = styled(motion.section)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2.4rem 2rem;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);

  @media (max-width: 580px) {
    padding: 2rem 1rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-white);
    font-family: var(--font-secondary);
  }

  a {
    font-size: 1.3rem;
    color: var(--color-primary);
    font-weight: 600;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.75;
    }
  }
`;

export default HomePage;
