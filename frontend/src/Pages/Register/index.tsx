import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { addFirstUser } from '../../Api';

interface UsersData {
    id?: number;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    active?: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UsersData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            try {
                await addFirstUser(formData);
                navigate("/login")
            } catch (error) {
                console.log('Erro ao cadastrar usuário:', error);
                return {error : error}
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data: UsersData): FormErrors => {
        const errors: FormErrors = {};
        if (!data.name.trim()) {
            errors.name = 'Nome é obrigatório';
        }
        if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'E-mail inválido';
        }
        if (data.password.length < 6) {
            errors.password = 'A senha deve ter pelo menos 6 caracteres';
        }
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'As senhas não coincidem';
        }
        return errors;
    };

    return (
        <div className="containerLogin">
            <div>
                <h1>Crie sua conta na Payments Bank</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Nome: </span>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <span>E-mail: </span>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <span>Senha: </span>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div>
                    <span>Confirme a senha: </span>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
            <div>
                <span>Já tem uma conta?</span>
                <Link to="/">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    );
}
