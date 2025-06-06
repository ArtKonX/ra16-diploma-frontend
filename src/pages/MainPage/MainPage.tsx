import { useDispatch } from "react-redux";
import ListCatalogItems from "@components/catalog/ListCatalogItems/ListCatalogItems"
import MainBanner from "@components/MainBanner/MainBanner"
import { useEffect, useState } from "react"
import { fetchTopSale } from "@redux/slices/TopSalesSlice"
import HeadingWithContent from "@components/HeadingWithContent/HeadingWithContent"
import Loader from "@components/Loader/Loader"
import MenuCategories from "@components/MenuCategories/MenuCategories"
import { fetchCatalogCategoriesItems, fetchCategories, fetchNextLenItemsOffset, removeIsSearching, resetNextLenItemsOffset } from "@redux/slices/CatalogSlice"
import BtnMoreItems from "@components/BtnMoreItems/BtnMoreItems"
import { AppDispatch } from "@redux/store"
import { selectCatalog, selectTopSales } from "@src/selectors/selectors";
import { useSelector } from "@src/hooks/useTypedSelector";

import bannerSrc from '@assets/images/banner.jpg';

interface LoadingState {
    topSales: boolean,
    categoriesItems: boolean,
    categories: boolean,
    categoriesItemsAdd: boolean
}

const MainPage = () => {

    const topSales = useSelector(selectTopSales);
    const catalog = useSelector(selectCatalog);

    const [loading, setLoading] = useState<LoadingState>({ topSales: true, categoriesItems: true, categories: true, categoriesItemsAdd: true })

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(removeIsSearching())
    }, [])

    useEffect(() => {
        dispatch(resetNextLenItemsOffset());

        const fetchData = () => {
            dispatch(fetchTopSale());
            dispatch(fetchCatalogCategoriesItems({ params: '' }));
            dispatch(fetchNextLenItemsOffset({ params: '' }));
            dispatch(fetchCategories());
        }

        fetchData();

    }, [dispatch]);

    useEffect(() => {
        if (topSales.topSalesList.length > 0) {
            setLoading(prev => ({ ...prev, topSales: false }));
        }
        if (catalog.categoriesItems.length > 0) {
            setLoading(prev => ({ ...prev, categoriesItems: false }));
        }
        if (catalog.categories.length > 0) {
            setLoading(prev => ({ ...prev, categories: false }));
        }
    }, [topSales.topSalesList, catalog.categoriesItems, catalog.categories]);

    const renderTopSales = () => {
        return loading.topSales ? <Loader /> : (
            <ListCatalogItems items={topSales.topSalesList} />
        );
    };

    const renderBtnMoreItems = () => {

        return (catalog.nextLenItemsOffset % 6 === 0 && catalog.nextLenItemsOffset !== 0) && (
            <BtnMoreItems textBtn='Загрузить ещё'
                disabled={loading.categoriesItemsAdd}
                loading={loading}
                setLoading={setLoading}
            />)
    }

    const renderCatalog = () => {
        if (loading.categories || loading.categoriesItems) {
            return <Loader />;
        }
        return (
            <>
                <MenuCategories
                    loading={loading}
                    setLoading={setLoading}
                    menuItems={catalog.categories}
                />
                <ListCatalogItems items={catalog.categoriesItems} />
                {loading.categoriesItemsAdd && <Loader />}
                {renderBtnMoreItems()}
            </>
        );
    };

    return (
        <div className="row">
            <div className="row p-0">
                <MainBanner textBanner='К весне готовы!'
                    bannerSrc={bannerSrc} />
                <HeadingWithContent
                    classText='top-sales p-0'
                    titleHeading='Хиты продаж!'
                >
                    {renderTopSales()}
                </HeadingWithContent>
                <HeadingWithContent
                    classText='catalog p-0'
                    titleHeading='Каталог'
                >
                    {renderCatalog()}
                </HeadingWithContent>
            </div>
        </div>
    )
}

export default MainPage