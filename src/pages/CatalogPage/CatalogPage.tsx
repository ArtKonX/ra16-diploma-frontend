import { useDispatch } from "react-redux";
import ListCatalogItems from "@components/catalog/ListCatalogItems/ListCatalogItems"
import MainBanner from "@components/MainBanner/MainBanner"
import { useEffect, useState } from "react"
import { fetchTopSale } from "@redux/slices/TopSalesSlice"
import HeadingWithContent from "@components/HeadingWithContent/HeadingWithContent"
import Loader from "@components/Loader/Loader"
import MenuCategories from "@components/MenuCategories/MenuCategories"
import { addSearchText, fetchCatalogCategoriesItems, fetchCatalogCategoriesItemsSearch, fetchCategories, fetchNextLenItemsOffset, resetItems, resetNextLenItemsOffset } from "@redux/slices/CatalogSlice"
import BtnMoreItems from "@components/BtnMoreItems/BtnMoreItems"
import { AppDispatch } from "@redux/store"
import { selectCatalog } from "@src/selectors/selectors";
import { useSelector } from "@src/hooks/useTypedSelector";
import SearchForm from "@ui/SearchForm/SearchForm";
import { useDebounce } from "@src/hooks/useDebounce";
import { useLocation } from "react-router-dom";

import bannerSrc from '@assets/images/banner.jpg';

interface LoadingState {
    topSales: boolean,
    categoriesItems: boolean,
    categories: boolean,
    categoriesItemsAdd: boolean
}

const CatalogPage = () => {

    const catalog = useSelector(selectCatalog);

    const location = useLocation();

    const searchTextPrev = new URLSearchParams(location.search).get('q') || '';

    const [searchText, setSearchText] = useState<string>(searchTextPrev)

    const [loading, setLoading] = useState<LoadingState>({ topSales: true, categoriesItems: true, categories: true, categoriesItemsAdd: true })

    const dispatch = useDispatch<AppDispatch>();

    const debouncedValue = useDebounce(searchText, 500);

    useEffect(() => {
        dispatch(resetNextLenItemsOffset());
    }, [])

    useEffect(() => {

        if (debouncedValue) {
            dispatch(addSearchText({ searchText: debouncedValue }))
            dispatch(fetchCatalogCategoriesItemsSearch());
        }
    }, [debouncedValue]);

    useEffect(() => {

        dispatch(resetItems())

        const searchText = new URLSearchParams(location.search).get('q') || '';
        const categoryId = new URLSearchParams(location.search).get('categoryId') || '';
        const offset = new URLSearchParams(location.search).get('offset') || 0;

        if (!offset) {
            if (categoryId && searchText) {
                dispatch(fetchCatalogCategoriesItems({ params: `/?categoryId=${categoryId}&q=${searchText}` }));
                dispatch(fetchNextLenItemsOffset({ params: `/?categoryId=${categoryId}&q=${searchText}&offset=${Number(offset) + 6}` }));
            } else if (searchText) {
                dispatch(addSearchText({ searchText: searchText }))
                dispatch(fetchCatalogCategoriesItemsSearch());
                dispatch(fetchNextLenItemsOffset({ params: `/?q=${searchText}&offset=${Number(offset) + 6}` }));
            } else {
                dispatch(fetchCatalogCategoriesItems({ params: `/?categoryId=${categoryId}` }));
                dispatch(fetchNextLenItemsOffset({ params: `/?categoryId=${categoryId}&offset=${Number(offset) + 6}` }));
            }
        }

    }, [new URLSearchParams(location.search).get('categoryId')]);

    useEffect(() => {
        const fetchData = async () => {
            const searchText = new URLSearchParams(location.search).get('q') || '';
            await dispatch(fetchTopSale());

            await dispatch(fetchCategories());
            if (!searchText) {
                await dispatch(fetchCatalogCategoriesItems({ params: '' }));
            }
        };
        fetchData();

    }, [dispatch]);

    useEffect(() => {
        if (catalog.categoriesItems.length > 0) {
            setLoading(prev => ({ ...prev, categoriesItems: false }));
        }
    }, [catalog.categoriesItems, new URLSearchParams(location.search).get('categoryId'), new URLSearchParams(location.search).get('offset'), new URLSearchParams(location.search).get('q')]);

    useEffect(() => {
        if (catalog.categories.length > 0) {
            setLoading(prev => ({ ...prev, categories: false }));
        }
    }, [catalog.categories]);

    const renderBtnMoreItems = () => {
        return (catalog.nextLenItemsOffset % 6 == 0 &&
            catalog.nextLenItemsOffset !== 0) &&
            (<BtnMoreItems textBtn='Загрузить ещё'
                disabled={loading.categoriesItemsAdd}
                loading={loading}
                setLoading={setLoading}
            />)
    }

    const renderCatalog = () => {
        if (catalog.categoriesItems.length === 0) {
            return (
                <>
                    <MenuCategories loading={loading} setLoading={setLoading} menuItems={catalog.categories} />
                    <p className="fs-3 pt-5">Поиск не дал результатов(</p>
                </>
            )
        } else if (loading.categories || loading.categoriesItems) {
            return <Loader />;
        }

        return (
            <>
                <MenuCategories loading={loading} setLoading={setLoading} menuItems={catalog.categories} />
                <ListCatalogItems items={catalog.categoriesItems} />
                {(loading.categoriesItemsAdd && catalog.nextLenItemsOffset % 6 == 0 && catalog.nextLenItemsOffset !== 0) && <Loader />}
                {renderBtnMoreItems()}
            </>
        );
    };

    return (
        <div className="row">
            <div className="row p-0">
                <MainBanner textBanner='К весне готовы!' bannerSrc={bannerSrc} />
                <HeadingWithContent classText='catalog p-0' titleHeading='Каталог'>
                    <SearchForm searchText={searchText} setSearchText={setSearchText} />
                    {renderCatalog()}
                </HeadingWithContent>
            </div>
        </div>
    )
}

export default CatalogPage