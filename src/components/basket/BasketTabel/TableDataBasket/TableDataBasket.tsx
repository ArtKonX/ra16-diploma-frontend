import { Link } from 'react-router-dom';
import './TableDataBasket.scss';
import BtnRemoveOrder from '../BtnRemoveOrder/BtnRemoveOrder';

interface DataOrder {
    id: number,
    title: string,
    size: string,
    count: number,
    price: number,
    allPrice: number
}

const TableDataBasket = (
    { id, dataOrder }:
        { id: number, dataOrder: DataOrder }
) => {

    return (
        <>
            <td scope="row">{id}</td>
            <td>
                <Link to={`/catalog/:${dataOrder.id}`} className='text-decoration-none text-secondary'>
                    {dataOrder.title}
                </Link>
            </td>
            <td>{dataOrder.size}</td>
            <td>{dataOrder.count}</td>
            <td>{dataOrder.price} руб.</td>
            <td>{dataOrder.allPrice} руб.</td>
            <td><BtnRemoveOrder textBtn='Удалить' id={id} /></td>
        </>
    )
}

export default TableDataBasket