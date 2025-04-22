import './BtnActionWithItem.scss';

interface BtnActionWithItemProps {
    action: string,
    basketData: BasketDataState,
    setBasketData: (state: BasketDataState) => void
}

interface BasketDataState {
    id: number,
    price: number,
    count: number,
    size: string,
    allPrice: number
    title: string
}

const BtnActionWithItem = ({ action, basketData, setBasketData }:
    BtnActionWithItemProps) => {

    const onAction = () => {
        if (action === '-') {
            const newValue = Math.max(basketData.count - 1, 1);
            setBasketData({ ...basketData, count: newValue, allPrice: basketData.price * newValue });
        } else {
            const newValue = Math.min(basketData.count + 1, 10);
            setBasketData({ ...basketData, count: newValue, allPrice: basketData.price * newValue });
        }

    }

    return (
        <button disabled={(basketData.count == 10 && action == '+') ||
            (basketData.count == 1 && action == '-')} onClick={onAction} className="btn btn-secondary">
            {action}
        </button>
    )
}

export default BtnActionWithItem