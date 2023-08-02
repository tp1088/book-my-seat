import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppHeader } from './components/AppHeader';
import { Route, Routes } from 'react-router-dom';
import  Booking  from "./components/Booking"
import { OfficeAdmin } from "./components/OfficeAdmin"

function App() {
  return (
    <>
      <div className="App">
        <AppHeader />
      </div>
      <Routes>
        <Route path='booking' element={<Booking />} ></Route>
        <Route path='admin' element={<OfficeAdmin />} ></Route>
      </Routes>
    </>
  );
}

export default App;
