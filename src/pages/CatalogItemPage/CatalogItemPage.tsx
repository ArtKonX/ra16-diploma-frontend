import './CatalogItemPage.scss';

import { useNavigate, useParams } from "react-router-dom";

import bannerSrc from '@assets/images/banner.jpg';

import MainBanner from "@components/MainBanner/MainBanner"
import { useEffect, useState } from "react"
import HeadingWithContent from "@components/HeadingWithContent/HeadingWithContent"
import { useDispatch } from "react-redux";
import { fetchCatalogItem, resetCatalogItem } from "@src/redux/slices/CatalogItemSlice";
import { AppDispatch } from "@src/redux/store";
import { selectCatalogItem } from "@src/selectors/selectors";
import { useSelector } from "@src/hooks/useTypedSelector";
import TableCatalogItem from "@src/components/catalog-item/TableCatalogItem/TableCatalogItem";
import CatalogSize from "@src/components/catalog-item/CatalogSize/CatalogSize";
import BtnActionWithItem from "@src/components/catalog-item/BtnActionWithItem/BtnActionWithItem";
import { addInBasket } from "@src/redux/slices/BasketSlice";
import Loader from "@src/components/Loader/Loader";
import { removeIsSearching } from '@src/redux/slices/CatalogSlice';

const CatalogItemPage = () => {

    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();

    const catalogItem = useSelector(selectCatalogItem);

    const [selectedSize, setSelectedSize] = useState<boolean>(false)

    const [selected, setSelected] = useState({});

    const [dataItem, setDataItem] = useState([]);

    const [orderData, setOrderData] = useState({ id: 0, price: 0, count: 1, size: '', allPrice: 0, title: '' });

    const navigate = useNavigate();

    useEffect(() => {
        const successSelected = Object.values(selected).some(elem => elem);
        const findSize = Object.entries(selected).find(size => size[1] == true);

        if (successSelected) {
            setSelectedSize(true)
        }

        if (!Array.isArray(catalogItem.catalogItem)) {
            if (findSize) {
                setOrderData({ ...orderData, size: findSize[0], id: catalogItem.catalogItem.id, title: catalogItem.catalogItem.title })
            }
        }

    }, [selected, setSelected])

    useEffect(() => {
        const fetchCatalogProduct = async () => {
            await dispatch(fetchCatalogItem({ id: id.replace(':', '') }));
        }

        fetchCatalogProduct();
    }, [dispatch,])

    useEffect(() => {
        dispatch(removeIsSearching())
    }, [])

    useEffect(() => {
        if (!Array.isArray(catalogItem.catalogItem)) {
            setDataItem([catalogItem.catalogItem.sku,
            catalogItem.catalogItem.manufacturer,
            catalogItem.catalogItem.color,
            catalogItem.catalogItem.material,
            catalogItem.catalogItem.season,
            catalogItem.catalogItem.reason]);

            setOrderData({
                ...orderData,
                price:
                    catalogItem.catalogItem.price,
                allPrice:
                    catalogItem.catalogItem.price
            })
        }

    }, [Array.isArray(catalogItem.catalogItem)]);

    const addOrder = () => {
        dispatch(addInBasket({ basketData: orderData }));

        navigate("/cart");

        dispatch(resetCatalogItem())
    }

    if (Array.isArray(catalogItem.catalogItem)) return <Loader />

    return (
        <div className="row">
            <div className="row p-0">
                <MainBanner textBanner='К весне готовы!' bannerSrc={bannerSrc} />
                <HeadingWithContent classText='catalog-item' titleHeading={catalogItem.catalogItem.title}>
                    <div className="d-flex gap-3">
                        <div className="col-5">
                            <img src={catalogItem.catalogItem.images[0]}
                                className="img-fluid img-card-item" alt="" />
                        </div>
                        <div className="w-100">
                            <TableCatalogItem dataItem={dataItem} />
                            <div className="text-center">
                                <p>Размеры в наличии:
                                    {catalogItem.catalogItem.sizes.filter(elem => elem.available)
                                        .map(size => (<CatalogSize selected={selected} setSelected={setSelected}
                                            text={size.size} />))}
                                </p>
                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                    <BtnActionWithItem action='-' basketData={orderData} setBasketData={setOrderData} />
                                    <span className="btn btn-outline-primary">{orderData.count}</span>
                                    <BtnActionWithItem action='+' basketData={orderData} setBasketData={setOrderData} />
                                </span>
                                </p>
                            </div>
                            <button onClick={addOrder} disabled={!selectedSize} className="btn btn-danger btn-block btn-lg w-100">В корзину</button>
                        </div>
                    </div>
                </HeadingWithContent>
            </div>
        </div>
    )
}

export default CatalogItemPage