import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { LoginUser } from '../../Api';
import Popup from '../../components/PopUp';

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
  
    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setPopupMessage("Por favor, preencha todos os campos.");
            setIsPopupOpen(true);
            return;
        }
        try {
            const response = await LoginUser(formData);
            const { token } = response;
            localStorage.setItem('token', token);
            navigate("/payments")
        } catch (error) {
            if(error) {
                console.error('Erro ao fazer login:', error);
                setPopupMessage("Erro inesperado")
                setIsPopupOpen(true)
                return
            }
        }
    };

    return (
        <div className="containerLogin">
            <div>
                <h1>Payments Bank</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Email: </span>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div>
                    <span>Senha: </span>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div>
                    <button type="submit">Entrar</button>
                </div>
                
            </form>
            <Popup isOpen={isPopupOpen} message={popupMessage} onClose={closePopup} />
            <div>
                <span>Ainda não tem cadastro?</span>
                <Link to="/register">
                    <button>Cadastre-se</button>
                </Link>
            </div>
        </div>
    );
}
