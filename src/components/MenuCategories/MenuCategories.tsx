import './MenuCategories.scss';

import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeRender, fetchCatalogCategoriesItems, fetchNextLenItemsOffset, removeSearchText, resetItems, resetNextLenItemsOffset } from '@redux/slices/CatalogSlice';
import { useEffect, useMemo } from 'react';
import { AppDispatch } from '@redux/store';
import { useSelector } from '@src/hooks/useTypedSelector';
import { selectCatalog } from '@src/selectors/selectors';

interface MenuItem {
    id: number,
    title: string,
    to: string
}

interface LoadingState {
    topSales: boolean,
    categoriesItems: boolean,
    categories: boolean,
    categoriesItemsAdd: boolean
}

interface MenuCategoriesProps {
    loading: LoadingState,
    setLoading: (loading: LoadingState) => void,
    menuItems: MenuItem[]
}

const MenuCategories = (
    { loading, setLoading, menuItems }:
        MenuCategoriesProps) => {

    const location = useLocation();

    const catalog = useSelector(selectCatalog);

    const dispatch = useDispatch<AppDispatch>();

    const getQueryParam = (paramName: string) => {
        return new URLSearchParams(location.search).get(paramName) || '/';
    };

    const isActiveLink = useMemo(() => {
        const currentCategoryId = getQueryParam('categoryId');
        return (categoryId: string | number) => currentCategoryId === `${categoryId}`;
    }, [location.search]);

    useEffect(() => {

        const categoryId = new URLSearchParams(location.search).get('categoryId') || '';

        const offset = new URLSearchParams(location.search).get('offset') || 0;

        const q = new URLSearchParams(location.search).get('q') || '';

        if (offset && !q) {
            dispatch(fetchCatalogCategoriesItems({
                params: offset ?
                    `/?categoryId=${categoryId}&offset=${offset}` :
                    `/?offset=${offset}`
            }));
            dispatch(resetNextLenItemsOffset());
            dispatch(fetchNextLenItemsOffset({
                params: offset ?
                    `/?categoryId=${categoryId}&offset=${Number(offset) + 6}` :
                    `/?offset=${Number(offset) + 6}`
            }));
        } else if (!offset && !q) {
            dispatch(fetchCatalogCategoriesItems({
                params: categoryId ?
                    `/?categoryId=${categoryId}` :
                    ''
            }));
            dispatch(fetchNextLenItemsOffset({
                params: categoryId ?
                    `/?categoryId=${categoryId}&offset=${6}` :
                    `/?offset=${6}`
            }));
        }

    }, [location.search]);

    useEffect(() => {
        setLoading({ ...loading, categoriesItems: true })
    }, [new URLSearchParams(location.search).get('categoryId')])

    const onClickLink = () => {
        dispatch(resetItems());
        dispatch(removeSearchText());
        dispatch(resetNextLenItemsOffset());
        dispatch(changeRender());
    }

    useEffect(() => {
        if (catalog.categoriesItems.length > 0) {
            setLoading({ ...loading, categoriesItems: false })
        }

    }, [catalog.categoriesItems, dispatch])

    return (
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <NavLink onClick={onClickLink}
                    className={() => isActiveLink('/') ? "nav-link active" : "nav-link"}
                    to={`${location.pathname}?${new URLSearchParams(location.search).get('q') ?
                        `q=${new URLSearchParams(location.search).get('q')}` :
                        ''}`}
                >
                    Все
                </NavLink>
            </li>
            {menuItems.map(item => (
                <li className="nav-item" key={item.id}>
                    <NavLink onClick={onClickLink}
                        className={() => isActiveLink(item.id) ? "nav-link active" : "nav-link"}
                        to={`${location.pathname}?categoryId=${item.id}${new URLSearchParams(location.search).get('q') ?
                            `&q=${new URLSearchParams(location.search).get('q')}` :
                            ''}`}
                    >
                        {item.title}
                    </NavLink>
                </li>
            ))
            }
        </ul >
    )
}

export default MenuCategories