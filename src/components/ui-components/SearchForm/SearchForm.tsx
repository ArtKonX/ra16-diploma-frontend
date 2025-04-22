import { ChangeEvent } from 'react';
import './SearchForm.scss';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ searchText, setSearchText }) => {

    const navigator = useNavigate()

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;

        setSearchText(value)

        navigator(`/catalog?q=${searchText}`)
    }

    return (
        <form className="catalog-search-form form-inline">
            <input className="form-control" placeholder="Поиск"
                onChange={onSearch} value={searchText} />
        </form>
    )
}

export default SearchForm