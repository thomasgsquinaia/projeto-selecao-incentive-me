import { Navigate, Routes } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import Balance from './Pages/Balance';
import Payments from './Pages/Payments';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AddPayment from './Pages/AddPayment';
import UpdatePayment from './Pages/UpdatePayment ';
import AddBalance from './Pages/AddBalance';
import UpdateBalance from './Pages/UpdateBalance';
import './App.css';

function App() {

  return (
      <BrowserRouter>
          <Routes>
              {/* LOGIN */}
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} /> 

              {/* ROUTES BANK */}
              <Route path="/home" element={<Home />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/addPayment" element={<AddPayment />} />
              <Route path="/updatePayment/:id" element={<UpdatePayment />} />
              <Route path="/addBalance" element={<AddBalance />} />
              <Route path="/updateBalance/:id" element={<UpdateBalance />} />

              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
  </BrowserRouter>
  )
}

export default App
