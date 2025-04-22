import CatalogItem from '../CatalogItem/CatalogItem';
import './ListCatalogItems.scss';

interface CatalogElem {
    id: number,
    title: string,
    images: string[],
    price: number
}

const ListCatalogItems = ({ items }: { items: CatalogElem[] }) => {

    return (
        <div className="row">
                {items.map(item => (
                    <div key={item.id} className="col-4">
                        <CatalogItem item={item} />
                    </div>
                ))}
        </div>
    )
}

export default ListCatalogItems