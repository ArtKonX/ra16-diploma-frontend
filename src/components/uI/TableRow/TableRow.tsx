import './TableRow.scss';

const TableRow = ({ textData }: { textData: string[] }) => {

    return (
        <tr>
            {textData.map((elem, indx) => (<td key={indx}>{elem}</td>))}
        </tr>
    )
}

export default TableRow