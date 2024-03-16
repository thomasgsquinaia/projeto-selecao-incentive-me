import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getPayments } from "../../Api";
import './style.css'
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Payments() {
    const navigate = useNavigate();
    const [paymentsList, setPaymentsList] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    
    const columnNamesMap = {
      name: 'Nome',
      description: 'Descrição',
      value: 'Valor',
      balance_id: 'Saldo vinculado',
    };

    async function getPaymentsApi() {
      const res = await getPayments()
      return res
    }
    async function getPaymentsList() {
      const res = await getPaymentsApi()
      setPaymentsList(res.payments)
    }
    
    async function handleClick () {
      navigate("/addPayment");
    }
    
    async function handleClickBalance () {
      navigate("/addPayment");
    }
    
    useEffect(() => {
      getPaymentsList()
    },[])

    return (
        <div className="containerHome">
          <Header/>
          <div className="content">
            <SideBar pageName="Payments"/>
            <div className="content-wrapper">
              {paymentsList.length == 0 ? 
                <div className="create-init">
                <p>Você não possui pedidos abertos</p>
                  <Button onClick={handleClickBalance}>Criar</Button>
                </div>  : 
                <>
                  <Table columnNamesMap={columnNamesMap} data={paymentsList} currentPage={currentPage} onPageChange={handlePageChange}/>
                  <div className="button-add">
                    <Button onClick={handleClick}>Criar</Button>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
    )
}