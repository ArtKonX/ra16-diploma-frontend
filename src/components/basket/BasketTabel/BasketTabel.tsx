import './BasketTabel.scss';
import TableDataBasket from './TableDataBasket/TableDataBasket';

interface DataOrderArray {
    id: number,
    title: string,
    size: string,
    count: number,
    price: number,
    allPrice: number
}

const BasketTabel = (
    { dataTitles, dataOrderArray, allPrice }:
        { dataTitles: string[], dataOrderArray: DataOrderArray[], allPrice: number }
) => {

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    {dataTitles.map((title, indx) => (<th key={indx} scope="row">{title}</th>))}
                </tr>
            </thead>
            <tbody>
                {dataOrderArray.map((elem, indx) => (
                    <tr key={indx}>
                        <TableDataBasket id={indx + 1} dataOrder={elem} />
                    </tr>
                ))}
                <tr>
                    <td colSpan={5} className="text-right">Общая стоимость</td>
                    <td>{allPrice} руб.</td>
                </tr>
            </tbody>
        </ table>
    )
}

export default BasketTabel