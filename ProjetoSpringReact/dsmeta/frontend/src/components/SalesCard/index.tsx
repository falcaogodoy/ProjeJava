import NotificationButton from "../NotificationButton";
import "./styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/request";
import { Sale } from "../../models/sale";

function SalesCard() {
  const min = new Date(new Date().setDate(new Date().getDate() - 365));
  const [minDate, setMinDate] = useState(min);
  const [maxDate, setMaxDate] = useState(new Date());

  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {

    const dmin = minDate.toISOString().slice(0,10);
    const dmax = maxDate.toISOString().slice(0,10);

    axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`).then((response) => {
      setSales(response.data.content);
    });
  }, [minDate, maxDate]);

  return (
    <div className="principal-card">
      <h2 className="vendas-titulo">Vendas</h2>
      <div>
        <div className="form-control-container">
          <DatePicker
            selected={minDate}
            onChange={(date: Date) => setMinDate(date)}
            className="form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="form-control-container">
          <DatePicker
            selected={maxDate}
            onChange={(date: Date) => setMaxDate(date)}
            className="form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      <div>
        <table className="tabela-vendas">
          <thead>
            <tr>
              <th className="show-responsi992"> Id</th>
              <th className="data-show-responsi"> Data</th>
              <th>Vendedor</th>
              <th className="show-responsi992"> Visitas</th>
              <th className="show-responsi992"> Vendas</th>
              <th> Total </th>
              <th>Notificar </th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              return (
                <tr key={sale.id}>
                  <td className="show-responsi992"> {sale.id}</td>
                  <td className="data-show-responsi">{new Date(sale.date).toLocaleDateString()}</td>
                  <td>{sale.sellerName}</td>
                  <td className="show-responsi992">{sale.visited}</td>
                  <td className="show-responsi992"> {sale.deals}</td>
                  <td>{sale.amount.toFixed(2)}</td>
                  <td>
                    <div className="btn-red-container">
                      <NotificationButton saleId={sale.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesCard;
