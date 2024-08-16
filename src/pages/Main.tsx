import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import NotFound from './NotFound';
import useMain from 'controllers/useMain.controller';

const Main = () => {
  useMain();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  );
};

export default Main;
