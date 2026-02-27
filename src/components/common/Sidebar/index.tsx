import { FC, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import useGenres from '../../../hooks/useGenres';
import usePlatforms from '../../../hooks/usePlatforms';

const PLATFORM_ICONS: Record<string, string> = {
  pc: '🖥',
  playstation: '🎮',
  xbox: '🟩',
  nintendo: '🟥',
  ios: '📱',
  android: '📱',
  macos: '🍎',
  linux: '🐧',
  atari: '🕹',
  'commodore-amiga': '🕹',
  sega: '🎯',
  '3do': '📀',
  'neo-geo': '🕹',
  web: '🌐',
};

const getPlatformIcon = (slug: string): string => {
  for (const key of Object.keys(PLATFORM_ICONS)) {
    if (slug.includes(key)) return PLATFORM_ICONS[key];
  }
  return '🎮';
};

const Sidebar: FC = () => {
  const { genres } = useGenres();
  const { platforms } = usePlatforms();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const activeGenre = searchParams.get('genres') ?? '';
  const activePlatform = searchParams.get('platforms') ?? '';

  const handleGenreClick = (slug: string) => {
    if (activeGenre === slug) {
      navigate('/top-rated');
    } else {
      navigate(`/top-rated?genres=${slug}`);
    }
    setIsOpen(false);
  };

  const handlePlatformClick = (id: number) => {
    const idStr = String(id);
    if (activePlatform === idStr) {
      navigate('/top-rated');
    } else {
      navigate(`/top-rated?platforms=${id}`);
    }
    setIsOpen(false);
  };

  const isOnPopularGames = location.pathname === '/top-rated';

  const sidebarContent = (
    <SidebarInner>
      <Section>
        <SectionLabel>GENRE</SectionLabel>
        {genres.map((genre) => {
          const isActive = isOnPopularGames && activeGenre === genre.slug;
          return (
            <GenreCard
              key={genre.id}
              $bgImage={genre.image_background}
              $isActive={isActive}
              onClick={() => handleGenreClick(genre.slug)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <GenreOverlay $isActive={isActive} />
              <GenreName>{genre.name}</GenreName>
            </GenreCard>
          );
        })}
      </Section>

      <Section>
        <SectionLabel>PLATFORM</SectionLabel>
        {platforms.map((platform) => {
          const isActive = isOnPopularGames && activePlatform === String(platform.id);
          return (
            <PlatformItem
              key={platform.id}
              $isActive={isActive}
              onClick={() => handlePlatformClick(platform.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
            >
              <PlatformIcon>{getPlatformIcon(platform.slug)}</PlatformIcon>
              <PlatformName>{platform.name}</PlatformName>
            </PlatformItem>
          );
        })}
      </Section>
    </SidebarInner>
  );

  return (
    <>
      {/* デスクトップ */}
      <DesktopSidebar>{sidebarContent}</DesktopSidebar>

      {/* モバイル トグルボタン */}
      <MobileToggle onClick={() => setIsOpen((v) => !v)} aria-label="Toggle sidebar">
        {isOpen ? '✕' : '☰'}
      </MobileToggle>

      {/* モバイル ドロワー */}
      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <MobileDrawer
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              {sidebarContent}
            </MobileDrawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Styled Components ── */

const DesktopSidebar = styled.aside`
  width: 22rem;
  flex-shrink: 0;
  padding: 3rem 1rem 3rem 1.6rem;
  overflow-y: auto;
  height: 100vh;
  // max-height: calc(100vh - 6.5rem);
  background: #15182b;
  position: sticky;
  top: 0;
  z-index: 2;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SectionLabel = styled.p`
  font-family: var(--font-secondary);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 0.4rem;
`;

const GenreCard = styled(motion.div)<{ $bgImage: string; $isActive: boolean }>`
  position: relative;
  height: 5.6rem;
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ $isActive }) => ($isActive ? 'var(--color-primary)' : 'transparent')};
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 0 0 2px var(--color-primary), 0 0 12px rgba(211,69,174,0.5)' : 'none'};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${({ $bgImage }) => $bgImage});
    background-size: cover;
    background-position: center;
    filter: grayscale(1);
  }
`;

const GenreOverlay = styled.div<{ $isActive: boolean }>`
  position: absolute;
  inset: 0;
  background: ${({ $isActive }) =>
    $isActive
      ? 'linear-gradient(90deg, rgba(211,69,174,0.5) 0%, rgba(0,0,0,0.45) 100%)'
      : 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 100%)'};
`;

const GenreName = styled.span`
  position: relative;
  font-family: var(--font-secondary);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-white);
  padding: 0 1rem;
  display: flex;
  align-items: center;
  height: 100%;
`;

const PlatformItem = styled(motion.div)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.7rem 1rem;
  border-radius: 0.6rem;
  cursor: pointer;
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(211,69,174,0.18)' : 'rgba(255,255,255,0.05)'};
  border: 1px solid ${({ $isActive }) =>
    $isActive ? 'rgba(211,69,174,0.6)' : 'rgba(255,255,255,0.08)'};
  transition: background-color 0.15s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const PlatformIcon = styled.span`
  font-size: 1.6rem;
  line-height: 1;
`;

const PlatformName = styled.span`
  font-family: var(--font-secondary);
  font-size: 1.25rem;
  color: var(--color-white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  bottom: 2rem;
  left: 1.5rem;
  z-index: 200;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  border: none;
  background-color: var(--color-primary);
  color: white;
  font-size: 2rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 300;
`;

const MobileDrawer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 28rem;
  z-index: 400;
  background-color: #15182b;
  overflow-y: auto;
  padding: 2rem 1.2rem;
`;

export default Sidebar;
