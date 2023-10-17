import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="*" element={<div>PageNotFound</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
