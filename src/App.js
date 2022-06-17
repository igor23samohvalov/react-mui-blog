import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import MainPage from './pages/MainPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
