import Button from '../Button';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { deleteBalance, deletePayments } from '../../Api';
import { useEffect, useState } from 'react';
interface TableProps {
  data: Array<{ [key: string]: string | number | any }>;
  currentPage: number;
  onPageChange: (page: number) => void;
  columnNamesMap: { [key: string]: string };
}
export default function Table ({ data, currentPage, onPageChange, columnNamesMap}:TableProps) {
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [reloadPage, setReloadPage] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handleEditClick = (id: string | number) => {
    const currentPath = window.location.pathname;
    if(currentPath == "/payments") {
      const editRoute = `/updatePayment/${id}`;
      navigate(editRoute)
    } 
    if(currentPath == "/balance") {
      const editRouteBalance = `/updateBalance/${id}`;
      navigate(editRouteBalance)
    }
  }
  async function handleDeleteClick (id: any){
    const currentPath = window.location.pathname;
    if(currentPath == "/payments") {
      await deletePayments(id);
      setReloadPage(prev => !prev);
      navigate('/payments')
    } 
    if(currentPath == "/balance") {
      await deleteBalance(id);
      setReloadPage(prev => !prev);
      navigate('/balance')
    }
  }

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  return (
      <div>
        <table className="custom-table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                  index != 0 ? <th key={index}>{columnNamesMap[key]}</th> : <></>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, columnIndex) => (
                    columnIndex !== 0 ? <td key={columnIndex}>{value}</td> : <></>
                ))}
              <td>
                <Button onClick={() => handleEditClick(row.id)} >
                  Editar
                </Button>
              </td>
              <td>
                <Button onClick={() => handleDeleteClick(row.id)} backgroundColor='#fff' color='#1976D2' >
                  Deletar
                </Button>
              </td>
              </tr>
              ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(data.length / itemsPerPage)} onPageChange={onPageChange} />
    </div>
  );
}