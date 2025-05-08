import './SearchFormHeader.scss';

import { useDebounce } from "@src/hooks/useDebounce";
import { addIsSearching, addSearchText, fetchCatalogCategoriesItemsSearch, resetItems } from "@src/redux/slices/CatalogSlice";
import { AppDispatch } from "@src/redux/store";
import { selectCatalog } from '@src/selectors/selectors';
import encodeQuery from '@src/utils/encodeQuery';
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

interface SearchFormHeaderProps {
    setIsSearch: (isSearch: boolean) => void,
    isSearch: boolean
}

const SearchFormHeader = ({ setIsSearch, isSearch }: SearchFormHeaderProps) => {

    const [searchText, setSearchText] = useState<string>('');

    const catalog = useSelector(selectCatalog);

    const navigator = useNavigate();

    const location = useLocation()

    const debouncedValue = useDebounce(searchText, 500);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {

        if (debouncedValue.trim()) {
            dispatch(addSearchText({ searchText: debouncedValue }));
            dispatch(resetItems())
            dispatch(fetchCatalogCategoriesItemsSearch());
            navigator(`/catalog?q=${encodeQuery(debouncedValue)}`);

            dispatch(addIsSearching())
        }
    }, [debouncedValue]);

    useEffect(() => {

        return () => {
            setSearchText('');
            setIsSearch(false)
        }

    }, [location])

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchText(value)
    }

    return (
        <form data-id="search-form" className={`header-controls-search-form form-inline ${(!isSearch || catalog.isSearching) &&
            'invisible'}`}>
            <input onChange={onSearch} className="form-control" placeholder="Поиск" value={searchText} />
        </form>
    )
}

export default SearchFormHeader