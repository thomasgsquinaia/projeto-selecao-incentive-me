import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Select, { SelectOption } from "../../components/Select";
import './style.css'
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { addPayments, getBalance } from "../../Api";
import Popup from "../../components/PopUp";
interface Balance { 
  id: number;
  name: string;
}

export default function AddPayment() {
    const navigate = useNavigate();
    const [paymentList, setPaymentList] = useState<Balance[]>([])
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [balanceId, setBalanceId] = useState('');
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

    const handleSetBalanceIdChange = (value: string) => {
      setBalanceId(value);
    }

    const closePopup = () => {
      setIsPopupOpen(false);
    };

    async function handleAddPaymentsClick () {
      if(!name || !description || !value || !balanceId) {
        setPopupMessage("Por favor, preencha todos os campos.")
        setIsPopupOpen(true)
        return
      }
      await addPayments({name,description,value:parseInt(value),balance_id:parseInt(balanceId)})
      navigate("/payments")
    }

    async function handleClickCancel () {
      navigate("/payments");
    }

    async function getBalanceApi() {
      const res = await getBalance()
      return res
    }

    async function getBalanceList() {
      const res = await getBalanceApi()
      const nameBalance = res.balance.map((balance:Balance) => {
        return {id:balance.id, name:balance.name}
      });
      setPaymentList(nameBalance)
      if(nameBalance.length > 0) {
        setBalanceId(nameBalance[0].id)
      }
    }

    useEffect(() => {
      getBalanceList()
    },[])

    const selectOptions: SelectOption[] = paymentList.map(balance => ({ value: balance.id, label: balance.name }));
    return (
      <div className="containerHome">
      <Header/>
      <div className="content">
        <SideBar pageName="AddPayment"/>
        <div className="content-addpayment">
          <p>Criar pedido de pagamento</p>
            <Input label="Nome" value={name} onChange={handleNameChange} />
            <Input label="Descrição" value={description} onChange={handleDescriptionChange} />
            <Input label="Valor" value={value} onChange={handleValueChange} />
            <p>Selecione o saldo a utilizar</p>
            <Select disabled={false} options={selectOptions} value={balanceId} onChange={handleSetBalanceIdChange} />
          <div className="button-addpayment">
            <Button onClick={handleClickCancel} color="#1976D2" backgroundColor="#fff">Cancelar</Button>
            <Button onClick={handleAddPaymentsClick} backgroundColor="#1976D2">Criar</Button>
            <Popup isOpen={isPopupOpen} message={popupMessage} onClose={closePopup} />
          </div>
        </div>
      </div>
    </div>
    )
}