import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { GlobalStyles } from './styles/GlobalStyles';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<DetailPage />} />
            <Route path="/:categoryId" element={<CategoriesPage />} />
            <Route path="*" element={<div>PageNotFound</div>} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
}

export default App;
