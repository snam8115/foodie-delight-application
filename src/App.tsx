import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './pages/RestaurantList';
import EditRestaurant from './components/EditRestaurant';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={RestaurantList} />

        <Route path='/restaurants' Component={RestaurantList} />
        <Route path='/restaurants/edit/:id' Component={EditRestaurant} />
      </Routes>
    </Router>
  );
};

export default App;
