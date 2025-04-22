import { useDispatch } from 'react-redux';
import './BtnRemoveOrder.scss';
import { removeInBasket } from '@src/redux/slices/BasketSlice';

interface BtnRemoveOrderProps {
    textBtn: string,
    id: number
}

const BtnRemoveOrder = ({ textBtn, id }: BtnRemoveOrderProps) => {

    const dispatch = useDispatch();

    const removeOrder = () => {
        console.log(id)
        dispatch(removeInBasket({ id: id - 1 }))
    }

    return (
        <button onClick={removeOrder} className="btn-remove btn btn-outline-danger btn-sm">
            {textBtn}
        </button>
    )
}

export default BtnRemoveOrder