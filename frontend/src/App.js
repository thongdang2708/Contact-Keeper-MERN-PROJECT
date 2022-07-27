import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Private from './components/Private';
import Contacts from './pages/Contacts';


function App() {
  return (
    <>
    <Router>
    <div className="App">
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/contacts" element={<Private />}>
            <Route path="/contacts" element={<Contacts />}/>
        </Route>
      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
