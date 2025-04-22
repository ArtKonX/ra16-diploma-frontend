import TableRow from '@src/components/uI/TableRow/TableRow';
import './TableCatalogItem.scss';

const TableCatalogItem = ({ dataItem }: { dataItem: string[] }) => {

    return (
        <table className="table table-bordered">
            <tbody>
                <TableRow textData={['Артикул', dataItem[0]]} />
                <TableRow textData={['Производитель', dataItem[1]]} />
                <TableRow textData={['Цвет', dataItem[2]]} />
                <TableRow textData={['Материалы', dataItem[3]]} />
                <TableRow textData={['Сезон', dataItem[4]]} />
                <TableRow textData={['Повод', dataItem[5]]} />
            </tbody>
        </ table>
    )
}

export default TableCatalogItem