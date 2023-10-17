import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games/:id" element={<DetailPage />} />
          <Route path="/:categoryId" element={<CategoriesPage />} />
          <Route path="*" element={<div>PageNotFound</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
