import './BtnMoreItems.scss';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCatalogCategoriesItems, fetchNextLenItemsOffset } from '@redux/slices/CatalogSlice';

import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@redux/store';
import { useSelector } from '@src/hooks/useTypedSelector';
import { selectCatalog } from '@src/selectors/selectors';
import { useEffect, useState } from 'react';

interface LoadingState {
    topSales: boolean,
    categoriesItems: boolean,
    categories: boolean,
    categoriesItemsAdd: boolean
}

interface BtnMoreItemsProps {
    disabled: boolean,
    loading: LoadingState,
    setLoading: (loading: LoadingState) => void,
    textBtn: string
}

const BtnMoreItems = ({ disabled, loading, setLoading, textBtn }:
    BtnMoreItemsProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [lenPrevItems, setLenPrevItems] = useState(0)

    const catalog = useSelector(selectCatalog);

    const dispatch = useDispatch<AppDispatch>();

    const handleClick = () => {
        setLenPrevItems(catalog.categoriesItems.length);

        setLoading({ ...loading, categoriesItemsAdd: true });

        const currentOffset = new URLSearchParams(location.search).get('offset') || 0;
        const currentId = new URLSearchParams(location.search).get('categoryId') || 0;
        const q = new URLSearchParams(location.search).get('q') || '';

        const newOffset = Number(currentOffset) + 6;

        navigate({
            pathname: location.pathname,
            search: currentId ? `?categoryId=${currentId}&offset=${newOffset}${q &&
                `&q=${q}`}` :
                `?offset=${newOffset}${q && `&q=${q}`}`
        });

        dispatch(fetchCatalogCategoriesItems({
            params: currentId ?
                `?categoryId=${currentId}&offset=${newOffset}${q && `&q=${q}`}` :
                `?offset=${newOffset}${q && `&q=${q}`}`
        }));
        dispatch(fetchNextLenItemsOffset({
            params: currentId ?
                `?categoryId=${currentId}&offset=${newOffset}${q && `&q=${q}`}` :
                `?offset=${newOffset}${q && `&q=${q}`}`
        }));
    };

    useEffect(() => {
        if (lenPrevItems < catalog.categoriesItems.length) {
            setLoading({ ...loading, categoriesItemsAdd: false });
        }
    }, [catalog.categoriesItems, dispatch])

    return (
        <div className="text-center mb-4 mt-1">
            <button disabled={disabled} onClick={handleClick} className="btn btn-outline-secondary">
                {textBtn}
            </button>
        </div>
    );
};

export default BtnMoreItems;