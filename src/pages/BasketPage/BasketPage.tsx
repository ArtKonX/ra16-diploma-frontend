import MainBanner from "@components/MainBanner/MainBanner"
import { useEffect } from "react"
import HeadingWithContent from "@components/HeadingWithContent/HeadingWithContent"
import BasketTabel from "@src/components/basket/BasketTabel/BasketTabel";

import './BasketPage.scss';

import bannerSrc from '@assets/images/banner.jpg';

import basketTabelTitles from '@data/basket/basket-tabel-titles.json';
import { useSelector } from "@src/hooks/useTypedSelector"
import { selectBasketData, selectOrderData } from "@src/selectors/selectors"
import FormOrder from "@src/components/basket/FormOrder/FormOrder"
import ResultOrderMessage from "@src/components/ResultOrderMessage/ResultOrderMessage"
import Loader from "@src/components/Loader/Loader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/redux/store";
import { removeIsSearching } from "@src/redux/slices/CatalogSlice";

const BasketPage = () => {

    const basketData = useSelector(selectBasketData);
    const orderData = useSelector(selectOrderData);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(removeIsSearching())
    }, [])

    const renderTableProducts = () => {
        return basketData.basketData.length > 0 ?
            (<BasketTabel
                dataTitles={[...basketTabelTitles.map(title => title.title)]}
                dataOrderArray={basketData.basketData}
                allPrice={basketData.allPrice} />) :
            (<span className="fs-4">Пустая корзина(</span>)
    }

    const renderOrderForm = () => {
        return basketData.basketData.length > 0 ?
            (<div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
                <FormOrder />
            </div>) :
            (<span className="fs-4">Сначала положите что-нибудь в корзину!</span>)
    }

    const renderLoaderOrder = () => {
        return orderData.loading && !orderData.error && (
            <div className="loader-container">
                <div className="loader-block">
                    <HeadingWithContent classText='cart p-0' titleHeading='Офрмляем заказ...'>
                        <Loader />
                    </HeadingWithContent>
                </div>
            </div>
        )
    }

    return (
        <>
            {orderData.success && <ResultOrderMessage status='success' titleText='Ваш заказ оформлен!'
                text='Наш менеджер свяжется с Вами в ближайшее время!'
                thankfulness="Спасибо за заказ!" />}
            {!orderData.loading && orderData.error &&
                <ResultOrderMessage status='error' titleText='К сожалению Ваш заказ не оформлен('
                    text='Пропало интернет соединение('
                    thankfulness='Подключите его и попробуйте снова оформить заказ!' />}
            {renderLoaderOrder()}
            <div className="row">
                <div className="row p-0">
                    <MainBanner textBanner='К весне готовы!' bannerSrc={bannerSrc} />
                    <HeadingWithContent classText='cart p-0' titleHeading='Корзина'>
                        {renderTableProducts()}
                    </HeadingWithContent>
                    <HeadingWithContent classText='order p-0' titleHeading='Оформить заказ'>
                        {renderOrderForm()}
                    </HeadingWithContent>
                </div>
            </div >
        </>
    )
}

export default BasketPage