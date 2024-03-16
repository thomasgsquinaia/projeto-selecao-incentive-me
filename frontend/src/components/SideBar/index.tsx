import { useState } from 'react';
import Popup from '../PopUp';
import './style.css'
import { Link, useNavigate } from "react-router-dom";
interface SidebarProps {
  pageName: string;
}

export default function SideBar ({pageName}: SidebarProps) {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

    const closePopup = () => {
      setIsPopupOpen(false);
    };

    const handleLogout = () => {
      setIsPopupOpen(true);
    };

    const confirmLogout = () => {
    navigate('/payments');
    };
    return (
        <div className="containerSideBar">
          <Link to="/payments" className={pageName == "Payments" ? "selectLink" : ""}>
            <p>Pagamentos</p>
          </Link>
          <Link to="/balance" className={pageName == "Balance" ? "selectLink" : ""}>
            <p>Saldos</p>
          </Link>
          <Link to="/" onClick={handleLogout} className={pageName == "" ? "selectLink" : ""}>
            <p>Sair da conta</p>
          </Link>
          <Popup onClose={closePopup} isOpen={isPopupOpen} message="Tem certeza que deseja sair da conta?" onConfirm={confirmLogout} />
        </div>
    )
}