import { useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import './style.css'
import { addBalance } from "../../Api";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/PopUp";

export default function AddBalance() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
  
    const handleNameChange = (value: string) => {
      setName(value);
    }

    const handleDescriptionChange = (value: string) => {
      setDescription(value);
    }

    const handleValueChange = (value: string) => {
      setValue(value);
    }

    const closePopup = () => {
      setIsPopupOpen(false);
    };
    
    async function handleClick () {
      if(!name || !description || !value) {
        setPopupMessage("Por favor, preencha todos os campos.")
        setIsPopupOpen(true)
        return
      }
      const res = await addBalance({name,description,value_init:parseInt(value)})
      navigate("/balance");
      return res
    }

    async function handleClickCancel () {
      navigate("/balance");
    }

    return (
      <div className="containerHome">
      <Header/>
      <div className="content">
        <SideBar pageName="AddBalance"/>
        <div className="content-addpayment">
          <p>Criar saldo</p>
            <Input label="Nome" value={name} onChange={handleNameChange} />
            <Input label="Descrição" value={description} onChange={handleDescriptionChange} />
            <Input label="Valor Inicial" value={value} onChange={handleValueChange} />
          <div className="button-addpayment">
            <Button onClick={handleClickCancel} color="#1976D2" backgroundColor="#fff">Cancelar</Button>
            <Button onClick={handleClick} backgroundColor="#1976D2">Criar</Button>
            <Popup isOpen={isPopupOpen} message={popupMessage} onClose={closePopup} />
          </div>
        </div>
      </div>
    </div>
    )
}