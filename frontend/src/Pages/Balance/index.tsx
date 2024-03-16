import { useEffect, useState } from "react"
import Header from "../../components/Header"
import SideBar from "../../components/SideBar"
import { useNavigate } from "react-router-dom"
import Table from "../../components/Table"
import { getBalance } from "../../Api"
import './style.css'
import Button from "../../components/Button"

export default function Balance() {
  const navigate = useNavigate();
  const [balanceList, setBalanceList] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1);
  
  const columnNamesMap = {
      name: 'Nome',
      description: 'Descrição',
      value_init: 'Valor',
      total_payment: 'Valor utilizado',
      value_rest: 'Valor restante'
    };

  const handlePageChange = (page: number) => {
  setCurrentPage(page);
  };

  async function getBalanceApi() {
      const res = await getBalance()
      return res
  }

  async function getBalanceList() {
    const res = await getBalanceApi()
    setBalanceList(res.balance)
  }
  
  async function handleClick () {
    navigate("/addBalance");
  }

  async function handleClickBalance () {
    navigate("/addBalance");
  }
  
  useEffect(() => {
    getBalanceList()
  },[])

  return (
    <div className="containerHome">
    <Header/>
    <div className="content">
      <SideBar pageName="Balance"/>
      
      <div className="content-wrapper">
        {balanceList.length == 0 ? 
          <div className="create-init">
          <p>Você não possui saldos</p>
            <Button onClick={handleClickBalance}>Criar</Button>
          </div>  : 
          <>
            <Table columnNamesMap={columnNamesMap} data={balanceList} currentPage={currentPage} onPageChange={handlePageChange}/>
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