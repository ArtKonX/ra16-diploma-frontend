import './Header.scss';

import Basket from "./Basket/Basket"
import Menu from "./Menu/Menu"
import SearchFormHeader from "./SearchFormHeader/SearchFormHeader"
import { useState } from 'react';

const Header = () => {

    const [isSearch, setIsSearch] = useState<boolean>(false)

    const getSearchForm = () => {
        setIsSearch(!isSearch)
    }

    return (
        <header className="container">
            <div className="row">
                <div className="header-wrapper row bg-light w-100
                d-flex align-items-center justify-content-between">
                    <Menu />
                    <div className="w-auto">
                        <div className="header-controls-pics">
                            <button onClick={getSearchForm} data-id="search-expander"
                                className="header-controls-pic header-controls-search" />
                            <Basket />
                            <SearchFormHeader setIsSearch={setIsSearch} isSearch={isSearch} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header