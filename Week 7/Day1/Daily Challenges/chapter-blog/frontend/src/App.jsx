import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ArticlePage from './pages/ArticlePage';
import EditorPage from './pages/EditorPage';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="/admin/articles/:articleId/edit" element={<EditorPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
