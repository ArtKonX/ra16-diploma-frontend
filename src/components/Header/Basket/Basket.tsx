import { useSelector } from "@src/hooks/useTypedSelector";
import { selectBasketData } from "@src/selectors/selectors";
import { Link } from "react-router-dom";

const Basket = () => {

    const basketData = useSelector(selectBasketData);

    return (
        <Link to='/cart' className="header-controls-pic header-controls-cart">
            {basketData.quantityProducts > 0 && (<div className="header-controls-cart-full">
                {basketData.quantityProducts}
            </div>)}
            <div className="header-controls-cart-menu"></div>
        </Link>
    )
}

export default Basket