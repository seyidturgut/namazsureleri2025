import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SurahList from './components/SurahList';
import SurahDetail from './components/SurahDetail';
import { surahs } from './data/surahs';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SurahList surahs={surahs} />} />
          <Route path="/surah/:id" element={<SurahDetail surahs={surahs} />} />
        </Routes>
      </Layout>
    </Router>
  );
}