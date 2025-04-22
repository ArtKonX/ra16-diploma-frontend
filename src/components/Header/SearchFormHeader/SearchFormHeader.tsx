import './SearchFormHeader.scss';

import { useDebounce } from "@src/hooks/useDebounce";
import { addSearchText, fetchCatalogCategoriesItemsSearch, resetItems } from "@src/redux/slices/CatalogSlice";
import { AppDispatch } from "@src/redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchFormHeader = ({ isSearch }: { isSearch: boolean }) => {

    const [searchText, setSearchText] = useState<string>('');
    const navigator = useNavigate();

    const debouncedValue = useDebounce(searchText, 500);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {

        if (debouncedValue) {
            dispatch(addSearchText({ searchText: debouncedValue }));
            dispatch(resetItems())
            dispatch(fetchCatalogCategoriesItemsSearch());
            navigator(`/catalog?q=${debouncedValue}`)
        }
    }, [debouncedValue]);

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchText(value)
    }

    return (
        <form data-id="search-form" className={`header-controls-search-form form-inline ${!isSearch &&
            'invisible'}`}>
            <input onChange={onSearch} className="form-control" placeholder="Поиск" />
        </form>
    )
}

export default SearchFormHeader