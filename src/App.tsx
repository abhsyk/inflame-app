import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import CategoriesPage from './pages/CategoriesPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { GamesContextProvider } from './context';

function App() {
  return (
    <>
      <GlobalStyles />
      <GamesContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<DetailPage />} />
            <Route path="/:categoryId" element={<CategoriesPage />} />
            <Route path="*" element={<div>PageNotFound</div>} />
          </Routes>
        </BrowserRouter>
      </GamesContextProvider>
    </>
  );
}

export default App;
