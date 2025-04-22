import './CatalogSize.scss';

interface CatalogSizeProps {
    selected: { [key in string]: boolean },
    setSelected: (selected: (state: { [key in string]: boolean })
        => void) => void,
    text: string
}

const CatalogSize = ({ selected, setSelected, text }:
    CatalogSizeProps) => {

    const onSelect = () => {
        setSelected(prevState => {
            const newState = { ...prevState };
            Object.keys(newState).forEach(key => newState[key] = false);
            newState[text] = true;
            return newState;
        });
    }

    return (
        <button onClick={onSelect} className={`catalog-item-size border-0 ${selected[text] ?
            'selected bg-secondary' :
            'bg-transparent'}`}>
            {text}
        </button>
    )
}

export default CatalogSize