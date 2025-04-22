import { Link } from 'react-router-dom';
import './CatalogItem.scss';

interface CatalogItem {
    id: number,
    title: string,
    images: string[],
    price: number
}

const CatalogItem = ({ item }: {item: CatalogItem}) => {

    return (
        <div>
            <div className="card catalog-item-card">
                <img src={item.images[0]}
                    className="card-img-top img-fluid catalog-item-img" alt={item.title} />
                <div className="card-body d-flex flex-column align-items-start">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{item.price} руб.</p>
                    <Link to={`/catalog/:${item.id}`} className="btn btn-outline-secondary">Заказать</Link>
                </div>
            </div>
        </div>
    )
}

export default CatalogItem