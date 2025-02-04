import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Bar from './components/Bar.jsx';
import Main from './components/Main.jsx';
import Orders from './components/Orders.jsx';
import NewOrders from './components/NewOrders.jsx';
import AllOrders from './components/AllOrders.jsx';
import Navigation from './components/navigation.jsx';
import './App.css';
import Kitchen from './components/Kithchen.jsx';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/orders/NewOrders" element={<NewOrders />} />
        <Route path="/orders/AllOrders" element={<AllOrders />} />
      </Routes>
    </>
  );
}

export default App;
