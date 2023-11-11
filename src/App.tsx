import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import GamesContextProvider from './context';
import CategoriesPage from './pages/CategoriesPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <GamesContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/game/:id" element={<DetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:categoryId" element={<CategoriesPage />} />
            <Route path="*" element={<div>PageNotFound</div>} />
          </Routes>
        </BrowserRouter>
      </GamesContextProvider>
    </>
  );
}

export default App;
