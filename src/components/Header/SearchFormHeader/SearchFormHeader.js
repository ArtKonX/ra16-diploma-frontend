import { jsx as _jsx } from "react/jsx-runtime";
import './SearchFormHeader.scss';
import { useDebounce } from "@src/hooks/useDebounce";
import { addSearchText, fetchCatalogCategoriesItemsSearch, resetItems } from "@src/redux/slices/CatalogSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SearchFormHeader = ({ isSearch }) => {
    const [searchText, setSearchText] = useState('');
    const navigator = useNavigate();
    const debouncedValue = useDebounce(searchText, 500);
    const dispatch = useDispatch();
    useEffect(() => {
        if (debouncedValue) {
            dispatch(addSearchText({ searchText: debouncedValue }));
            dispatch(resetItems());
            dispatch(fetchCatalogCategoriesItemsSearch());
            navigator(`/catalog?q=${debouncedValue}`);
        }
    }, [debouncedValue]);
    const onSearch = (e) => {
        const { value } = e.target;
        setSearchText(value);
    };
    return (_jsx("form", { "data-id": "search-form", className: `header-controls-search-form form-inline ${!isSearch &&
            'invisible'}`, children: _jsx("input", { onChange: onSearch, className: "form-control", placeholder: "\u041F\u043E\u0438\u0441\u043A" }) }));
};
export default SearchFormHeader;
